import { Link, useNavigate } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { useAuth } from '../lib/AuthContext'

export default function Layout({ children }: { children: ReactNode }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { user, isAdmin, logOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Account'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-3">
          <Link to="/" className="font-extrabold text-xl shrink-0 flex items-center gap-1.5">
            <span className="grid place-items-center w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-base shadow-lg shadow-indigo-500/30">📚</span>
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">StudyReel</span>
          </Link>
          <form onSubmit={submit} className="flex-1 max-w-xs">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search topics…"
              className="w-full px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 text-slate-100 placeholder-slate-500 focus:bg-white/[0.09] focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 outline-none text-sm transition"
            />
          </form>
          <nav className="flex items-center gap-3 text-sm shrink-0">
            <Link to="/bookmarks" className="text-lg hover:scale-110 transition">🔖</Link>

            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition"
              >
                Sign in
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10"
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {firstName[0]}
                  </span>
                  <span className="hidden sm:inline max-w-[8rem] truncate">{firstName}</span>
                  {isAdmin && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">OWNER</span>}
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-slate-900 border border-white/10 rounded-xl shadow-xl py-1 text-slate-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="px-3 py-2 text-xs text-slate-500 truncate border-b border-white/10">{user.email}</div>
                    <Link to="/bookmarks" className="block px-3 py-2 hover:bg-white/5">🔖 Saved lessons</Link>
                    {isAdmin && <Link to="/admin" className="block px-3 py-2 hover:bg-white/5">⚙️ Admin area</Link>}
                    <button
                      onClick={() => logOut()}
                      className="w-full text-left px-3 py-2 hover:bg-white/5 text-red-400"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
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
