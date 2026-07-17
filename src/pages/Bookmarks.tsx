import { Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

export default function Bookmarks() {
  const { user } = useUser()
  const { getVideo } = useContent()
  const saved = user.bookmarks.map((id) => getVideo(id)).filter(Boolean)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#2B2620] tracking-tight">Saved lessons</h1>
      {saved.length === 0 ? (
        <p className="text-[#6E6459]">No saved lessons yet. Use the bookmark on any lesson to save it here.</p>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[#E1D8C8] divide-y divide-[#E7DFD0]">
          {saved.map((v) => v && (
            <Link key={v.id} to={`/video/${v.id}`} className="block bg-[#FBF8F2] hover:bg-[#F6F0E5] transition-colors p-4">
              <div className="font-semibold text-[#2B2620]">{v.title}</div>
              <div className="text-xs text-[#8A8071] mt-0.5">{v.courseName} · {v.unitName}</div>
              <div className="text-sm text-[#8A8071] truncate mt-1">{v.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
