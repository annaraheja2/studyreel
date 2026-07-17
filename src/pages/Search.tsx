import { useSearchParams, Link } from 'react-router-dom'
import { useContent } from '../lib/ContentContext'

export default function Search() {
  const [params] = useSearchParams()
  const { search } = useContent()
  const q = params.get('q') ?? ''
  const results = search(q)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-white">Search results for “{q}”</h1>
      {results.length === 0 ? (
        <p className="text-slate-400">No lessons match “{q}”. Try “fractions”, “algebra”, or “angles”.</p>
      ) : (
        <div className="space-y-3">
          {results.map((v) => (
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
