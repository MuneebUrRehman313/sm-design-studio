import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isCurrentUserAdmin } from '../../lib/onsiteProjects'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setChecking(false)
      return undefined
    }
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        try {
          if (await isCurrentUserAdmin()) navigate('/admin/dashboard', { replace: true })
        } catch {
          await supabase.auth.signOut()
        }
      }
      setChecking(false)
    })
  }, [navigate])

  if (checking) return <LoginShell><p className="text-sm text-cream-muted">Checking session...</p></LoginShell>
  if (!isSupabaseConfigured) return <LoginShell><p className="text-sm text-cream-muted">Admin access is not configured yet.</p></LoginShell>

  const signIn = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setError('')
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setStatus('idle')
      setError('Sign-in failed. Check your credentials and try again.')
      return
    }
    try {
      if (!(await isCurrentUserAdmin())) {
        await supabase.auth.signOut()
        setStatus('idle')
        setError('Sign-in failed. Check your credentials and try again.')
        return
      }
      navigate('/admin/dashboard', { replace: true })
    } catch {
      await supabase.auth.signOut()
      setStatus('idle')
      setError('Sign-in failed. Check your credentials and try again.')
    }
  }

  return (
    <LoginShell>
      <div className="mb-10"><p className="text-[11px] tracking-[0.28em] text-gold uppercase">SM Design Studio</p><h1 className="editorial-heading mt-4 text-4xl text-cream">Admin Sign In</h1><p className="mt-4 text-sm leading-relaxed text-cream-muted">Manage on-site projects and project photography.</p></div>
      <form onSubmit={signIn} className="space-y-5">
        <label className="block text-xs text-cream-muted">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-sm text-cream outline-none focus:border-gold" required autoComplete="email" /></label>
        <label className="block text-xs text-cream-muted">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-sm text-cream outline-none focus:border-gold" required autoComplete="current-password" /></label>
        {error ? <p role="alert" className="text-xs text-gold">{error}</p> : null}
        <button type="submit" disabled={status === 'loading'} className="w-full border border-gold px-5 py-3 text-[10px] tracking-[0.2em] text-gold uppercase hover:bg-gold hover:text-ink disabled:opacity-50">{status === 'loading' ? 'Signing in...' : 'Sign In'}</button>
      </form>
      <Link to="/" className="mt-8 inline-block text-xs text-cream-muted hover:text-cream">Return to website</Link>
    </LoginShell>
  )
}

function LoginShell({ children }) {
  return <main className="flex min-h-dvh items-center justify-center bg-ink px-5 py-12"><div className="w-full max-w-md border border-line bg-ink-elevated p-6 sm:p-10">{children}</div></main>
}