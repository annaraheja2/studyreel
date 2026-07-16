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
      <Link to="/" className="text-sm text-brand-600 font-medium">← All courses</Link>

      <section className="relative overflow-hidden rounded-3xl p-7 text-white bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 shadow-lift">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <h1 className="text-2xl font-extrabold">{course.emoji} {course.name}</h1>
          <p className="text-white/85 mt-1">{course.description}</p>
          <div className="flex items-center justify-between mt-4 text-sm">
            <span className="font-bold">{pct}% complete</span>
            <span className="text-white/80">{done}/{total} lessons</span>
          </div>
          <div className="h-2.5 bg-white/25 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
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
