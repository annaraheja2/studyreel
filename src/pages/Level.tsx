import { useParams, Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { DifficultyDots } from '../components/StarRating'

export default function LevelPage() {
  const { unitId } = useParams()
  const { user } = useUser()
  const { getUnit } = useContent()
  const unit = unitId ? getUnit(unitId) : undefined

  if (!unit) return <p className="text-slate-400">Unit not found. <Link to="/" className="text-brand-300">Go home</Link></p>

  return (
    <div className="space-y-4">
      <Link to={`/course/${unit.courseId}`} className="text-sm text-slate-400 hover:text-brand-300 font-medium transition">← {unit.courseName}</Link>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{unit.emoji} {unit.name}</h1>
        <p className="text-slate-400">{unit.description}</p>
      </div>

      <div className="space-y-3">
        {unit.lessons.map((lesson) => {
          const done = user.completed.includes(lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/video/${lesson.id}`}
              className="flex items-center gap-4 bg-white/[0.04] rounded-2xl border border-white/10 p-4 hover:border-white/20 hover:bg-white/[0.06] transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 text-white bg-gradient-to-br ${done ? 'from-emerald-400 to-teal-500' : 'from-violet-500 to-indigo-600'}`}>
                {done ? '✓' : '▶'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{lesson.title}</div>
                <div className="text-xs text-slate-400 truncate">{lesson.description}</div>
                <div className="mt-1"><DifficultyDots level={lesson.difficulty} /></div>
              </div>
              <span className="text-slate-500">›</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
