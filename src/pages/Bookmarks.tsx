import { Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

export default function Bookmarks() {
  const { user } = useUser()
  const { getVideo } = useContent()
  const saved = user.bookmarks.map((id) => getVideo(id)).filter(Boolean)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#1F2A36] tracking-tight">Saved lessons</h1>
      {saved.length === 0 ? (
        <p className="text-[#566573]">No saved lessons yet. Use the bookmark on any lesson to save it here.</p>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[#CADDEE] divide-y divide-[#D3E4F2] shadow-warm">
          {saved.map((v) => v && (
            <Link key={v.id} to={`/video/${v.id}`} className="block bg-[#FBFDFF] hover:bg-[#EDF5FC] transition-colors p-4">
              <div className="font-semibold text-[#1F2A36]">{v.title}</div>
              <div className="text-xs text-[#74828F] mt-0.5">{v.courseName} · {v.unitName}</div>
              <div className="text-sm text-[#74828F] truncate mt-1">{v.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
