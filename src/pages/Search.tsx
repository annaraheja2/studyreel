import { useSearchParams, Link } from 'react-router-dom'
import { useContent } from '../lib/ContentContext'

export default function Search() {
  const [params] = useSearchParams()
  const { search } = useContent()
  const q = params.get('q') ?? ''
  const results = search(q)

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-[#1F2A36] tracking-tight">Results for “{q}”</h1>
      {results.length === 0 ? (
        <p className="text-[#566573]">No lessons match “{q}”. Try “fractions”, “algebra”, or “angles”.</p>
      ) : (
        <div className="rounded-xl overflow-hidden border border-[#CADDEE] divide-y divide-[#D3E4F2] shadow-warm">
          {results.map((v) => (
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
