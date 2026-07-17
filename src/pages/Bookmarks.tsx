import { Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

export default function Bookmarks() {
  const { user } = useUser()
  const { getVideo } = useContent()
  const saved = user.bookmarks.map((id) => getVideo(id)).filter(Boolean)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">🔖 Saved lessons</h1>
      {saved.length === 0 ? (
        <p className="text-slate-400">No saved lessons yet. Tap the bookmark icon on any lesson to save it here.</p>
      ) : (
        <div className="space-y-3">
          {saved.map((v) => v && (
            <Link key={v.id} to={`/video/${v.id}`} className="block bg-white/[0.04] rounded-2xl border border-white/10 p-4 hover:border-white/20 hover:bg-white/[0.06] transition-all">
              <div className="font-semibold text-white">{v.title}</div>
              <div className="text-xs text-brand-300">{v.unitEmoji} {v.unitName}</div>
              <div className="text-sm text-slate-400 truncate">{v.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
