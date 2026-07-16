import { Link, useNavigate } from 'react-router-dom'
import { useState, type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link to="/" className="font-extrabold text-xl text-brand-600 shrink-0">📚 StudyReel</Link>
          <form onSubmit={submit} className="flex-1 max-w-sm">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search topics…"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none text-sm"
            />
          </form>
          <nav className="flex items-center gap-3 text-sm shrink-0">
            <Link to="/" className="hover:text-brand-600 hidden sm:inline">Home</Link>
            <Link to="/bookmarks" className="hover:text-brand-600">🔖 Saved</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">{children}</main>
      <footer className="text-center text-xs text-slate-400 py-6 px-4">
        StudyReel · Sample videos are placeholders — swap in your own math clips.
      </footer>
    </div>
  )
}
