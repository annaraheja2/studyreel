import { Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

export default function Bookmarks() {
  const { user } = useUser()
  const { getVideo } = useContent()
  const saved = user.bookmarks.map((id) => getVideo(id)).filter(Boolean)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-white tracking-tight">Saved lessons</h1>
      {saved.length === 0 ? (
        <p className="text-slate-400">No saved lessons yet. Use the bookmark on any lesson to save it here.</p>
      ) : (
        <div className="rounded-xl overflow-hidden border border-white/10 divide-y divide-white/[0.07]">
          {saved.map((v) => v && (
            <Link key={v.id} to={`/video/${v.id}`} className="block bg-[#06070b] hover:bg-white/[0.02] transition-colors p-4">
              <div className="font-semibold text-white">{v.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{v.courseName} · {v.unitName}</div>
              <div className="text-sm text-slate-500 truncate mt-1">{v.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
