import { useParams, Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { DifficultyDots } from '../components/StarRating'
import { ArrowLeft, Check, Play, ChevronRight } from '../components/icons'

export default function LevelPage() {
  const { unitId } = useParams()
  const { user } = useUser()
  const { getUnit } = useContent()
  const unit = unitId ? getUnit(unitId) : undefined

  if (!unit) return <p className="text-slate-400">Unit not found. <Link to="/" className="text-white underline">Go home</Link></p>

  return (
    <div className="space-y-6">
      <Link to={`/course/${unit.courseId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> {unit.courseName}
      </Link>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">{unit.name}</h1>
        <p className="text-slate-400 mt-1">{unit.description}</p>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/10 divide-y divide-white/[0.07]">
        {unit.lessons.map((lesson) => {
          const done = user.completed.includes(lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/video/${lesson.id}`}
              className="flex items-center gap-4 bg-[#06070b] hover:bg-white/[0.02] transition-colors p-4"
            >
              <div className={`grid place-items-center w-10 h-10 rounded-lg shrink-0 ${done ? 'bg-white text-[#06070b]' : 'bg-white/[0.05] border border-white/10 text-slate-300'}`}>
                {done ? <Check className="w-5 h-5" /> : <Play className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{lesson.title}</div>
                <div className="text-xs text-slate-500 truncate">{lesson.description}</div>
                <div className="mt-1.5"><DifficultyDots level={lesson.difficulty} /></div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
