import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isCurrentUserAdmin } from '../../lib/onsiteProjects'
import { supabase } from '../../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [state, setState] = useState('checking')

  useEffect(() => {
    if (!supabase) {
      setState('unauthenticated')
      return undefined
    }
    let active = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        if (active) setState('unauthenticated')
        return
      }
      try {
        const admin = await isCurrentUserAdmin()
        if (active) setState(admin ? 'authorized' : 'unauthorized')
      } catch {
        if (active) setState('unauthorized')
      }
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && active) setState('unauthenticated')
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  if (state === 'checking') return <AdminMessage>Checking access...</AdminMessage>
  if (state === 'unauthenticated' || state === 'unauthorized') return <Navigate to="/admin/login" replace />
  return children
}

function AdminMessage({ children }) {
  return <div className="flex min-h-dvh items-center justify-center bg-ink px-5 text-sm text-cream-muted">{children}</div>
}
