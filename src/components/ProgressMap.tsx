import { Link } from 'react-router-dom'
import type { Unit } from '../data/content'
import { useUser } from '../lib/UserContext'

// The visual progress map: units as cards, lessons as connected nodes.
export default function ProgressMap({ units }: { units: Unit[] }) {
  const { user } = useUser()

  return (
    <div className="space-y-4">
      {units.map((unit) => (
        <div key={unit.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
          <Link to={`/unit/${unit.id}`} className="flex items-center gap-3 group">
            <span className="text-2xl">{unit.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg text-slate-800 group-hover:text-brand-600">{unit.name}</div>
              <div className="text-xs text-slate-500 truncate">{unit.description}</div>
            </div>
            <span className="text-slate-300 group-hover:text-brand-500">›</span>
          </Link>

          <div className="flex items-center mt-4 px-1">
            {unit.lessons.map((lesson, idx) => {
              const done = user.completed.includes(lesson.id)
              return (
                <div key={lesson.id} className="flex items-center flex-1 last:flex-none">
                  <Link
                    to={`/video/${lesson.id}`}
                    title={lesson.title}
                    className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-white transition hover:scale-110 ${done ? 'bg-green-500' : 'bg-brand-500'}`}
                  >
                    {done ? '✓' : idx + 1}
                  </Link>
                  {idx < unit.lessons.length - 1 && (
                    <div className={`h-1 flex-1 mx-1 rounded ${done ? 'bg-green-400' : 'bg-slate-200'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
