import { useParams, Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { DifficultyDots } from '../components/StarRating'

export default function LevelPage() {
  const { unitId } = useParams()
  const { user } = useUser()
  const { getUnit } = useContent()
  const unit = unitId ? getUnit(unitId) : undefined

  if (!unit) return <p className="text-slate-500">Unit not found. <Link to="/" className="text-brand-600">Go home</Link></p>

  return (
    <div className="space-y-4">
      <Link to={`/course/${unit.courseId}`} className="text-sm text-brand-600">← {unit.courseName}</Link>
      <div>
        <h1 className="text-2xl font-bold">{unit.emoji} {unit.name}</h1>
        <p className="text-slate-500">{unit.description}</p>
      </div>

      <div className="space-y-3">
        {unit.lessons.map((lesson) => {
          const done = user.completed.includes(lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/video/${lesson.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 p-4 hover:border-brand-300 transition"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${done ? 'bg-green-100 text-green-600' : 'bg-brand-50 text-brand-600'}`}>
                {done ? '✓' : '▶'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{lesson.title}</div>
                <div className="text-xs text-slate-500 truncate">{lesson.description}</div>
                <div className="mt-1"><DifficultyDots level={lesson.difficulty} /></div>
              </div>
              <span className="text-slate-300">›</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
