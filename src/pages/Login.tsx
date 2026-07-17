import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth, friendlyAuthError } from '../lib/AuthContext'

export default function Login() {
  const { signUp, logIn, logInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'signup') await signUp(name, email, password)
      else await logIn(email, password)
      navigate('/')
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setBusy(false)
    }
  }

  async function google() {
    setError('')
    setBusy(true)
    try {
      await logInWithGoogle()
      navigate('/')
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-6">
      <div className="bg-[#FBFDFF] rounded-2xl border border-[#CADDEE] p-6">
        <h1 className="text-2xl font-bold text-center text-[#1F2A36]">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-center text-[#566573] text-sm mt-1">
          {mode === 'signup' ? 'Save your progress across devices.' : 'Log in to continue learning.'}
        </p>

        <button
          onClick={google}
          disabled={busy}
          className="w-full mt-5 py-2.5 rounded-md border border-[#B9D2E8] font-medium text-[#1F2A36] hover:bg-[#E2EFFA] flex items-center justify-center gap-2 disabled:opacity-60 transition"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-[#CADDEE] flex-1" />
          <span className="text-xs text-[#74828F]">or</span>
          <div className="h-px bg-[#CADDEE] flex-1" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === 'signup' && (
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Your name" required
              className="w-full px-3 py-2.5 rounded-xl bg-[#FBFDFF] border border-[#CADDEE] text-[#1F2A36] placeholder-[#93A2B0] focus:border-brand-400 focus:ring-1 focus:ring-brand-500/40 outline-none"
            />
          )}
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" required autoComplete="email"
            className="w-full px-3 py-2.5 rounded-xl bg-[#FBFDFF] border border-[#CADDEE] text-[#1F2A36] placeholder-[#93A2B0] focus:border-brand-400 focus:ring-1 focus:ring-brand-500/40 outline-none"
          />
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (6+ characters)" required minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            className="w-full px-3 py-2.5 rounded-xl bg-[#FBFDFF] border border-[#CADDEE] text-[#1F2A36] placeholder-[#93A2B0] focus:border-brand-400 focus:ring-1 focus:ring-brand-500/40 outline-none"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit" disabled={busy}
            className="w-full py-2.5 rounded-md bg-[#1F2A36] text-[#F4F9FE] font-semibold hover:bg-[#2E3B49] transition disabled:opacity-60"
          >
            {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="text-center text-sm text-[#566573] mt-4">
          {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
          <button
            onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError('') }}
            className="text-[#2F6FB0] font-medium"
          >
            {mode === 'signup' ? 'Log in' : 'Create one'}
          </button>
        </p>
      </div>

      <p className="text-center text-xs text-[#566573] mt-4">
        <Link to="/" className="hover:text-[#2F6FB0]">← Keep browsing without an account</Link>
      </p>
    </div>
  )
}
