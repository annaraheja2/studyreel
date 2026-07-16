import { useParams, Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import ProgressMap from '../components/ProgressMap'

export default function CoursePage() {
  const { courseId } = useParams()
  const { user } = useUser()
  const { getCourse } = useContent()
  const course = courseId ? getCourse(courseId) : undefined

  if (!course) return <p className="text-slate-500">Course not found. <Link to="/" className="text-brand-600">Go home</Link></p>

  const total = courseLessonCount(course)
  const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id))
  const done = lessonIds.filter((id) => user.completed.includes(id)).length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-slate-500 hover:text-brand-600 font-medium transition">← All courses</Link>

      <section className="relative overflow-hidden rounded-[26px] p-7 sm:p-8 bg-slate-950 text-white">
        <div className="absolute -top-20 -left-10 w-64 h-64 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -bottom-20 right-0 w-72 h-72 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white to-indigo-200/80 bg-clip-text text-transparent">{course.emoji} {course.name}</h1>
          <p className="text-slate-300/90 mt-1.5">{course.description}</p>
          <div className="flex items-center justify-between mt-5 text-sm">
            <span className="font-semibold">{pct}% complete</span>
            <span className="text-slate-400">{done}/{total} lessons</span>
          </div>
          <div className="h-2 bg-white/15 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Units</h2>
        <ProgressMap units={course.units} />
      </div>
    </div>
  )
}
