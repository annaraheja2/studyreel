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

  if (!unit) return <p className="text-[#566573]">Unit not found. <Link to="/" className="text-[#1F2A36] underline">Go home</Link></p>

  return (
    <div className="space-y-6">
      <Link to={`/course/${unit.courseId}`} className="inline-flex items-center gap-1.5 text-sm text-[#74828F] hover:text-[#1F2A36] transition">
        <ArrowLeft className="w-4 h-4" /> {unit.courseName}
      </Link>
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-[#1F2A36]">{unit.name}</h1>
        <p className="text-[#566573] mt-1">{unit.description}</p>
      </div>

      <div className="rounded-xl overflow-hidden border border-[#CADDEE] divide-y divide-[#D3E4F2] shadow-warm">
        {unit.lessons.map((lesson) => {
          const done = user.completed.includes(lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/video/${lesson.id}`}
              className="flex items-center gap-4 bg-[#FBFDFF] hover:bg-[#EDF5FC] transition-colors p-4"
            >
              <div className={`grid place-items-center w-10 h-10 rounded-lg shrink-0 ${done ? 'bg-[#E8940C] text-[#1F2A36]' : 'bg-[#E9F2FB] border border-[#CADDEE] text-[#3A4653]'}`}>
                {done ? <Check className="w-5 h-5" /> : <Play className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[#1F2A36] truncate">{lesson.title}</div>
                <div className="text-xs text-[#74828F] truncate">{lesson.description}</div>
                <div className="mt-1.5"><DifficultyDots level={lesson.difficulty} /></div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#93A2B0]" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
