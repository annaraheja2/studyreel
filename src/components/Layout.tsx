import { Link, useNavigate } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { useAuth } from '../lib/AuthContext'
import { Bookmark } from './icons'

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
      <header className="sticky top-0 z-10 bg-[#06070b]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center gap-4">
          <Link to="/" className="shrink-0 flex items-center gap-2.5">
            <span className="grid place-items-center w-7 h-7 rounded-md bg-white text-[#06070b] font-black text-sm">S</span>
            <span className="font-bold text-[15px] tracking-tight text-white">StudyReel</span>
          </Link>
          <form onSubmit={submit} className="flex-1 max-w-xs">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full px-3.5 py-1.5 rounded-md bg-white/[0.05] border border-white/10 text-slate-100 placeholder-slate-500 focus:border-white/25 focus:bg-white/[0.07] outline-none text-sm transition"
            />
          </form>
          <nav className="flex items-center gap-4 text-sm shrink-0">
            <Link to="/bookmarks" className="text-slate-400 hover:text-white transition"><Bookmark /></Link>

            {!user ? (
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md bg-white text-[#06070b] font-semibold hover:bg-slate-200 transition"
              >
                Sign in
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-white/[0.06] transition"
                >
                  <span className="w-7 h-7 rounded-md bg-white/10 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {firstName[0]}
                  </span>
                  <span className="hidden sm:inline max-w-[8rem] truncate text-slate-200">{firstName}</span>
                  {isAdmin && <span className="text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded bg-white/10 text-slate-300">OWNER</span>}
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-[#0c0e15] border border-white/10 rounded-lg shadow-2xl py-1 text-slate-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="px-3 py-2 text-xs text-slate-500 truncate border-b border-white/10">{user.email}</div>
                    <Link to="/bookmarks" className="block px-3 py-2 hover:bg-white/[0.05] hover:text-white transition">Saved lessons</Link>
                    {isAdmin && <Link to="/admin" className="block px-3 py-2 hover:bg-white/[0.05] hover:text-white transition">Admin</Link>}
                    <button
                      onClick={() => logOut()}
                      className="w-full text-left px-3 py-2 hover:bg-white/[0.05] text-slate-400 hover:text-white transition"
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 py-8">{children}</main>
      <footer className="text-center text-xs text-slate-600 py-8 px-5 border-t border-white/[0.06]">
        StudyReel
      </footer>
    </div>
  )
}
