import { Link } from 'react-router-dom'
import type { Unit } from '../data/content'
import { useUser } from '../lib/UserContext'
import { Check, ChevronRight } from './icons'

export default function ProgressMap({ units }: { units: Unit[] }) {
  const { user } = useUser()

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 divide-y divide-white/[0.07]">
      {units.map((unit, ui) => (
        <div key={unit.id} className="bg-[#06070b] hover:bg-white/[0.02] transition-colors p-5">
          <Link to={`/unit/${unit.id}`} className="flex items-center gap-3.5 group">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 text-slate-400 text-sm font-semibold shrink-0">
              {String(ui + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white group-hover:text-white transition truncate">{unit.name}</div>
              <div className="text-xs text-slate-500 truncate">{unit.description}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition" />
          </Link>

          <div className="flex items-center mt-4 pl-[3.25rem]">
            {unit.lessons.map((lesson, idx) => {
              const done = user.completed.includes(lesson.id)
              return (
                <div key={lesson.id} className="flex items-center flex-1 last:flex-none">
                  <Link
                    to={`/video/${lesson.id}`}
                    title={lesson.title}
                    className={`grid place-items-center w-7 h-7 shrink-0 rounded-md text-xs font-semibold transition hover:scale-105 ${
                      done ? 'bg-white text-[#06070b]' : 'bg-white/[0.06] text-slate-300 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {done ? <Check className="w-4 h-4" /> : idx + 1}
                  </Link>
                  {idx < unit.lessons.length - 1 && (
                    <div className={`h-px flex-1 mx-1.5 ${done ? 'bg-white/40' : 'bg-white/10'}`} />
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
