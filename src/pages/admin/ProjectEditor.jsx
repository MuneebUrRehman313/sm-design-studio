import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProjectForm from '../../components/admin/ProjectForm'
import ProjectImageManager from '../../components/admin/ProjectImageManager'
import { deleteProjectImage, fetchAdminProjects, uploadProjectImages } from '../../lib/onsiteProjects'
import { supabase } from '../../lib/supabase'

const emptyValues = { title: '', category: 'Interior Execution', status: 'Completed', location: '', year: '', description: '', stage: '' }

export default function ProjectEditor() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const editing = Boolean(projectId)
  const [values, setValues] = useState(emptyValues)
  const [files, setFiles] = useState([])
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editing) return undefined
    fetchAdminProjects().then((projects) => {
      const found = projects.find((item) => item.id === projectId)
      if (!found) throw new Error('missing')
      setProject(found)
      setValues({ title: found.title, category: found.category, status: found.status, location: found.location || '', year: found.year || '', description: found.description || '', stage: '' })
    }).catch(() => setError('Project could not be loaded.')).finally(() => setLoading(false))
    return undefined
  }, [editing, projectId])

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    let createdProject = null
    try {
      if (editing) {
        const { error: updateError } = await supabase.from('onsite_projects').update({ title: values.title, category: values.category, status: values.status, location: values.location || null, year: values.year || null, description: values.description, updated_at: new Date().toISOString() }).eq('id', projectId)
        if (updateError) throw updateError
        if (files.length) await uploadProjectImages(projectId, files.map((item) => item.file), values.stage)
      } else {
        const { data, error: insertError } = await supabase.from('onsite_projects').insert({ title: values.title, category: values.category, status: values.status, location: values.location || null, year: values.year || null, description: values.description }).select().single()
        if (insertError) throw insertError
        createdProject = data
        if (files.length) await uploadProjectImages(data.id, files.map((item) => item.file), values.stage)
      }
      navigate('/admin/dashboard', { replace: true })
    } catch {
      if (createdProject) await supabase.from('onsite_projects').delete().eq('id', createdProject.id)
      setError('The project could not be saved. Check the fields and try again.')
    } finally {
      setSaving(false)
    }
  }

  const removeImage = async (image) => {
    if (!window.confirm('Delete this project image?')) return
    setDeletingId(image.id)
    setError('')
    try {
      await deleteProjectImage(image)
      setProject((current) => ({ ...current, images: current.images.filter((item) => item.id !== image.id) }))
    } catch {
      setError('The image could not be deleted from storage and the database.')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <AdminShell><p className="text-sm text-cream-muted">Loading project...</p></AdminShell>
  return <AdminShell><Link to="/admin/dashboard" className="text-xs text-cream-muted hover:text-cream">← Back to dashboard</Link><div className="mt-8 max-w-3xl"><p className="text-[11px] tracking-[0.28em] text-gold uppercase">{editing ? 'Edit project' : 'New project'}</p><h1 className="editorial-heading mt-3 text-4xl">{editing ? values.title : 'Add On-Site Project'}</h1>{error ? <p role="alert" className="mt-6 text-sm text-gold">{error}</p> : null}<div className="mt-8"><ProjectForm values={values} setValues={setValues} files={files} setFiles={setFiles} onSubmit={submit} saving={saving} submitLabel={editing ? 'Save Changes' : 'Upload & Publish'} /></div>{editing ? <div className="mt-8"><ProjectImageManager images={project?.images || []} onDelete={removeImage} deletingId={deletingId} /></div> : null}</div></AdminShell>
}

function AdminShell({ children }) {
  return <main className="min-h-dvh bg-ink px-5 py-8 text-cream md:px-10 md:py-12"><div className="mx-auto max-w-[1200px]">{children}</div></main>
}