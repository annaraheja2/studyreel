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
      <header className="sticky top-0 z-10 bg-[#ece5d8]/85 backdrop-blur-xl border-b border-[#E1D8C8]">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center gap-4">
          <Link to="/" className="shrink-0 flex items-center gap-2.5">
            <span className="relative grid place-items-center w-7 h-7 rounded-full bg-[#2B2620] overflow-hidden">
              <span className="absolute w-4 h-4 rounded-full bg-[#ece5d8] translate-x-1.5 -translate-y-0.5" />
            </span>
            <span className="font-semibold text-[15px] tracking-tight text-[#2B2620]">Eclipse Learning</span>
          </Link>
          <form onSubmit={submit} className="flex-1 max-w-xs">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full px-3.5 py-1.5 rounded-md bg-[#F4EEE3] border border-[#E1D8C8] text-[#2B2620] placeholder-[#A99E8D] focus:border-[#C7B9A2] focus:bg-[#E7DFD0] outline-none text-sm transition"
            />
          </form>
          <nav className="flex items-center gap-4 text-sm shrink-0">
            <Link to="/bookmarks" className="text-[#6E6459] hover:text-[#2B2620] transition"><Bookmark /></Link>

            {!user ? (
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md bg-[#2B2620] text-[#F4EFE6] font-semibold hover:bg-[#3D352B] transition"
              >
                Sign in
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-[#F1EBDF] transition"
                >
                  <span className="w-7 h-7 rounded-md bg-[#E1D8C8] text-[#2B2620] flex items-center justify-center text-xs font-bold uppercase">
                    {firstName[0]}
                  </span>
                  <span className="hidden sm:inline max-w-[8rem] truncate text-[#3A332B]">{firstName}</span>
                  {isAdmin && <span className="text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded bg-[#E1D8C8] text-[#4A4136]">OWNER</span>}
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-[#FBF8F2] border border-[#E1D8C8] rounded-lg shadow-2xl py-1 text-[#4A4136]"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="px-3 py-2 text-xs text-[#8A8071] truncate border-b border-[#E1D8C8]">{user.email}</div>
                    <Link to="/bookmarks" className="block px-3 py-2 hover:bg-[#F1EBDF] hover:text-[#2B2620] transition">Saved lessons</Link>
                    {isAdmin && <Link to="/admin" className="block px-3 py-2 hover:bg-[#F1EBDF] hover:text-[#2B2620] transition">Admin</Link>}
                    <button
                      onClick={() => logOut()}
                      className="w-full text-left px-3 py-2 hover:bg-[#F1EBDF] text-[#6E6459] hover:text-[#2B2620] transition"
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
      <footer className="text-center text-xs text-[#A99E8D] py-8 px-5 border-t border-[#E7DFD0]">
        Eclipse Learning
      </footer>
    </div>
  )
}
