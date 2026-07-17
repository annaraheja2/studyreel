import { Link } from 'react-router-dom'
import type { Unit } from '../data/content'
import { useUser } from '../lib/UserContext'
import { Check, ChevronRight } from './icons'

export default function ProgressMap({ units }: { units: Unit[] }) {
  const { user } = useUser()

  return (
    <div className="rounded-xl overflow-hidden border border-[#CADDEE] divide-y divide-[#D3E4F2] shadow-warm">
      {units.map((unit, ui) => (
        <div key={unit.id} className="bg-[#FBFDFF] hover:bg-[#EDF5FC] transition-colors p-5">
          <Link to={`/unit/${unit.id}`} className="flex items-center gap-3.5 group">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#E9F2FB] border border-[#CADDEE] text-[#566573] text-sm font-semibold shrink-0">
              {String(ui + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[#1F2A36] group-hover:text-[#1F2A36] transition truncate">{unit.name}</div>
              <div className="text-xs text-[#74828F] truncate">{unit.description}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#93A2B0] group-hover:text-[#1F2A36] transition" />
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
                      done ? 'bg-[#1F2A36] text-[#F4F9FE]' : 'bg-[#CADDEE] text-[#3A4653] border border-[#CADDEE] hover:border-[#A6C6E0]'
                    }`}
                  >
                    {done ? <Check className="w-4 h-4" /> : idx + 1}
                  </Link>
                  {idx < unit.lessons.length - 1 && (
                    <div className={`h-px flex-1 mx-1.5 ${done ? 'bg-[#1F2A36]/40' : 'bg-[#CADDEE]'}`} />
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
