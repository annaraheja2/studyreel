import { useSearchParams, Link } from 'react-router-dom'
import { useContent } from '../lib/ContentContext'

export default function Search() {
  const [params] = useSearchParams()
  const { search } = useContent()
  const q = params.get('q') ?? ''
  const results = search(q)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#2B2620] tracking-tight">Results for “{q}”</h1>
      {results.length === 0 ? (
        <p className="text-[#6E6459]">No lessons match “{q}”. Try “fractions”, “algebra”, or “angles”.</p>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[#E1D8C8] divide-y divide-[#E7DFD0] shadow-warm">
          {results.map((v) => (
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
