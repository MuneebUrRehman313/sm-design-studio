import { PROJECTS_BUCKET, supabase } from './supabase'

export const projectCategories = [
  'Interior Execution',
  'Exterior Execution',
  'Residential',
  'Commercial',
]

export const projectStatuses = ['Completed', 'Work In Progress', 'Ongoing']
export const projectStages = ['Concept', 'On-Site Work', 'Completed']

const toImage = (row, projectTitle) => ({
  id: row.id,
  src: row.image_url,
  alt: `${projectTitle} project image`,
  storagePath: row.storage_path,
  stage: row.stage,
  displayOrder: row.display_order,
})

const toProject = (row, imageRows = []) => {
  const images = imageRows
    .sort((left, right) => left.display_order - right.display_order)
    .map((image) => toImage(image, row.title))
  const stages = projectStages
    .map((label) => ({
      label,
      image: images.find((image) => image.stage === label),
    }))
    .filter((stage) => stage.image)

  return {
    ...row,
    title: row.title,
    category: row.category,
    projectType: row.category,
    year: row.year,
    image: images[0],
    images,
    stages,
    isPlaceholder: false,
  }
}

async function fetchProjects({ publishedOnly = false } = {}) {
  if (!supabase) return []

  let query = supabase.from('onsite_projects').select('*').order('created_at', { ascending: false })
  if (publishedOnly) query = query.eq('published', true)
  const { data: projects, error } = await query
  if (error) throw error
  if (!projects?.length) return []

  const { data: images, error: imageError } = await supabase
    .from('onsite_project_images')
    .select('*')
    .in('project_id', projects.map((project) => project.id))
    .order('display_order', { ascending: true })
  if (imageError) throw imageError

  return projects
    .map((project) => toProject(project, images?.filter((image) => image.project_id === project.id) || []))
    .filter((project) => project.images.length > 0)
}

export function fetchPublishedProjects() {
  return fetchProjects({ publishedOnly: true })
}

export function fetchAdminProjects() {
  return fetchProjects()
}

export function getStoragePublicUrl(path) {
  if (!supabase || !path) return ''
  const { data } = supabase.storage.from(PROJECTS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function isCurrentUserAdmin() {
  if (!supabase) return false
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return false
  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .eq('is_active', true)
    .maybeSingle()
  if (error) throw error
  return Boolean(data)
}

export async function uploadProjectImages(projectId, files, stage) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const uploaded = []
  const uploadedPaths = []
  try {
    for (const [index, file] of files.entries()) {
      const extension = file.name.split('.').pop().toLowerCase()
      const path = `${projectId}/${crypto.randomUUID()}-${index}.${extension}`
      const { error: uploadError } = await supabase.storage.from(PROJECTS_BUCKET).upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false,
      })
      if (uploadError) throw uploadError
      uploadedPaths.push(path)
      const imageUrl = getStoragePublicUrl(path)
      const { data, error: insertError } = await supabase
        .from('onsite_project_images')
        .insert({ project_id: projectId, image_url: imageUrl, storage_path: path, display_order: index, stage: stage || null })
        .select()
        .single()
      if (insertError) throw insertError
      uploaded.push(data)
    }
    return uploaded
  } catch (error) {
    if (uploadedPaths.length) await supabase.storage.from(PROJECTS_BUCKET).remove(uploadedPaths)
    if (uploaded.length) await supabase.from('onsite_project_images').delete().in('id', uploaded.map((image) => image.id))
    throw error
  }
}

export async function deleteProjectImage(image) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const { error: storageError } = await supabase.storage.from(PROJECTS_BUCKET).remove([image.storagePath])
  if (storageError) throw storageError
  const { error } = await supabase.from('onsite_project_images').delete().eq('id', image.id)
  if (error) throw error
}

export async function deleteProject(project) {
  if (!supabase) throw new Error('Supabase is not configured.')
  const paths = project.images.map((image) => image.storagePath)
  if (paths.length) {
    const { error: storageError } = await supabase.storage.from(PROJECTS_BUCKET).remove(paths)
    if (storageError) throw storageError
  }
  const { error } = await supabase.from('onsite_projects').delete().eq('id', project.id)
  if (error) throw error
}