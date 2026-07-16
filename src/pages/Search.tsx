import { useSearchParams, Link } from 'react-router-dom'
import { useContent } from '../lib/ContentContext'

export default function Search() {
  const [params] = useSearchParams()
  const { search } = useContent()
  const q = params.get('q') ?? ''
  const results = search(q)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Search results for “{q}”</h1>
      {results.length === 0 ? (
        <p className="text-slate-500">No lessons match “{q}”. Try “fractions”, “algebra”, or “angles”.</p>
      ) : (
        <div className="space-y-3">
          {results.map((v) => (
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
