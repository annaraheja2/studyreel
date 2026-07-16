import { Link } from 'react-router-dom'
import { getVideo } from '../data/content'
import { useUser } from '../lib/UserContext'

export default function Bookmarks() {
  const { user } = useUser()
  const saved = user.bookmarks.map((id) => getVideo(id)).filter(Boolean)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">🔖 Saved lessons</h1>
      {saved.length === 0 ? (
        <p className="text-slate-500">No saved lessons yet. Tap the bookmark icon on any lesson to save it here.</p>
      ) : (
        <div className="space-y-3">
          {saved.map((v) => v && (
            <Link key={v.id} to={`/video/${v.id}`} className="block bg-white rounded-2xl border border-slate-100 p-4 hover:border-brand-300">
              <div className="font-semibold">{v.title}</div>
              <div className="text-xs text-brand-600">{v.unitEmoji} {v.unitName}</div>
              <div className="text-sm text-slate-500 truncate">{v.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
