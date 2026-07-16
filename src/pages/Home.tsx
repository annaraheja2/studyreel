import { Link } from 'react-router-dom'
import { COURSES, courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'

export default function Home() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-2xl font-bold">Learn math, one clip at a time 📚</h1>
        <p className="text-slate-500 mt-2">
          Pick a course, choose any lesson, watch the short video, then take a quick 3-question check-in.
        </p>
      </section>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Courses</h2>
        {COURSES.map((course) => {
          const total = courseLessonCount(course)
          const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id))
          const done = lessonIds.filter((id) => user.completed.includes(id)).length
          const pct = total ? Math.round((done / total) * 100) : 0
          return (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:border-brand-300 transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{course.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold">{course.name}</div>
                  <div className="text-sm text-slate-500">{course.description}</div>
                </div>
                <span className="text-slate-300 text-xl">›</span>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="font-bold text-brand-600">{pct}% complete</span>
                <span className="text-slate-500">{course.units.length} units · {total} lessons</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
