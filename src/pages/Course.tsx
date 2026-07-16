import { useParams, Link } from 'react-router-dom'
import { getCourse, courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import ProgressMap from '../components/ProgressMap'

export default function CoursePage() {
  const { courseId } = useParams()
  const { user } = useUser()
  const course = courseId ? getCourse(courseId) : undefined

  if (!course) return <p className="text-slate-500">Course not found. <Link to="/" className="text-brand-600">Go home</Link></p>

  const total = courseLessonCount(course)
  const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id))
  const done = lessonIds.filter((id) => user.completed.includes(id)).length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-brand-600">← All courses</Link>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-2xl font-bold">{course.emoji} {course.name}</h1>
        <p className="text-slate-500 mt-1">{course.description}</p>
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="font-bold text-brand-600">{pct}% complete</span>
          <span className="text-slate-500">{done}/{total} lessons</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Units</h2>
        <ProgressMap units={course.units} />
      </div>
    </div>
  )
}
