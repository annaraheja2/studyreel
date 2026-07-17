import { useParams, Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import ProgressMap from '../components/ProgressMap'
import { ArrowLeft } from '../components/icons'

export default function CoursePage() {
  const { courseId } = useParams()
  const { user } = useUser()
  const { getCourse } = useContent()
  const course = courseId ? getCourse(courseId) : undefined

  if (!course) return <p className="text-slate-400">Course not found. <Link to="/" className="text-white underline">Go home</Link></p>

  const total = courseLessonCount(course)
  const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id))
  const done = lessonIds.filter((id) => user.completed.includes(id)).length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="space-y-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> All courses
      </Link>

      <section className="rounded-xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">{course.name}</h1>
        <p className="text-slate-400 mt-2 max-w-lg">{course.description}</p>
        <div className="flex items-center justify-between mt-6 text-sm">
          <span className="font-semibold text-white">{pct}% complete</span>
          <span className="text-slate-500">{done} / {total} lessons</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <div>
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.16em] mb-4 px-0.5">Units</h2>
        <ProgressMap units={course.units} />
      </div>
    </div>
  )
}
