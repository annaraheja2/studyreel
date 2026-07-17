import { Link } from 'react-router-dom'
import type { Unit } from '../data/content'
import { useUser } from '../lib/UserContext'

// The visual progress map: units as cards, lessons as connected nodes.
export default function ProgressMap({ units }: { units: Unit[] }) {
  const { user } = useUser()

  return (
    <div className="space-y-4">
      {units.map((unit) => (
        <div key={unit.id} className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 hover:border-white/20 hover:bg-white/[0.06] transition-all">
          <Link to={`/unit/${unit.id}`} className="flex items-center gap-3 group">
            <span className="grid place-items-center w-11 h-11 rounded-2xl bg-white/10 text-xl">{unit.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg text-white group-hover:text-brand-300 transition">{unit.name}</div>
              <div className="text-xs text-slate-400 truncate">{unit.description}</div>
            </div>
            <span className="text-slate-500 group-hover:text-brand-300 group-hover:translate-x-0.5 transition">›</span>
          </Link>

          <div className="flex items-center mt-4 px-1">
            {unit.lessons.map((lesson, idx) => {
              const done = user.completed.includes(lesson.id)
              return (
                <div key={lesson.id} className="flex items-center flex-1 last:flex-none">
                  <Link
                    to={`/video/${lesson.id}`}
                    title={lesson.title}
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold text-white transition hover:scale-110 shadow-lg ${
                      done ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30' : 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-indigo-500/30'
                    }`}
                  >
                    {done ? '✓' : idx + 1}
                  </Link>
                  {idx < unit.lessons.length - 1 && (
                    <div className={`h-1.5 flex-1 mx-1.5 rounded-full ${done ? 'bg-emerald-400/40' : 'bg-white/10'}`} />
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
