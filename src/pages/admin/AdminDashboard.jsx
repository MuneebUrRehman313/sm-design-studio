import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, LogOut, Pencil, Trash2 } from 'lucide-react'
import { deleteProject, fetchAdminProjects } from '../../lib/onsiteProjects'
import { supabase } from '../../lib/supabase'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const load = () => {
    setLoading(true)
    fetchAdminProjects().then(setProjects).catch(() => setError('Projects could not be loaded.')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  const remove = async (project) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    setDeletingId(project.id)
    setError('')
    try {
      await deleteProject(project)
      setProjects((current) => current.filter((item) => item.id !== project.id))
    } catch {
      setError('The project could not be deleted. No database record was removed.')
    } finally {
      setDeletingId(null)
    }
  }

  return <main className="min-h-dvh bg-ink px-5 py-8 text-cream md:px-10 md:py-12"><div className="mx-auto max-w-[1200px]">
    <header className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between"><div><Link to="/" className="text-[11px] tracking-[0.28em] text-gold uppercase">SM Design Studio</Link><h1 className="editorial-heading mt-3 text-4xl">Admin Dashboard</h1></div><div className="flex items-center gap-4"><Link to="/admin/dashboard/new" className="inline-flex items-center gap-2 border border-gold px-4 py-3 text-[10px] tracking-[0.16em] text-gold uppercase hover:bg-gold hover:text-ink"><Plus className="h-4 w-4" /> Add Project</Link><button type="button" onClick={logout} className="inline-flex items-center gap-2 text-xs text-cream-muted hover:text-cream"><LogOut className="h-4 w-4" /> Log out</button></div></header>
    {error ? <p role="alert" className="mt-6 text-sm text-gold">{error}</p> : null}
    <section className="mt-10"><h2 className="text-[11px] tracking-[0.25em] text-gold uppercase">Projects</h2>{loading ? <p className="mt-8 text-sm text-cream-muted">Loading projects...</p> : projects.length ? <div className="mt-5 divide-y divide-line border-y border-line">{projects.map((project) => <article key={project.id} className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-4"><div className="h-20 w-24 shrink-0 overflow-hidden bg-ink-elevated">{project.image ? <img src={project.image.src} alt="" className="h-full w-full object-cover" /> : null}</div><div className="min-w-0"><h3 className="truncate text-lg text-cream">{project.title}</h3><p className="mt-1 text-xs text-cream-muted">{project.status} · {project.images.length} {project.images.length === 1 ? 'image' : 'images'}</p></div></div><div className="flex items-center gap-4 text-xs"><Link to={`/admin/dashboard/${project.id}/edit`} className="inline-flex items-center gap-2 text-cream-muted hover:text-cream"><Pencil className="h-4 w-4" /> Edit</Link><button type="button" onClick={() => remove(project)} disabled={deletingId === project.id} className="inline-flex items-center gap-2 text-cream-muted hover:text-gold disabled:opacity-50"><Trash2 className="h-4 w-4" /> {deletingId === project.id ? 'Deleting...' : 'Delete'}</button></div></article>)}</div> : <div className="mt-5 border-y border-line py-14 text-sm text-cream-muted"><p>No on-site projects yet.</p><Link to="/admin/dashboard/new" className="mt-5 inline-flex items-center gap-2 text-gold hover:text-cream"><Plus className="h-4 w-4" /> Add Your First Project</Link></div>}</section>
  </div></main>
}