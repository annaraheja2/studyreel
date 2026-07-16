import { Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

// Colorful accents cycled across course cards for a playful-but-clean look.
const ACCENTS = [
  { grad: 'from-violet-500 to-indigo-600', soft: 'bg-violet-100 text-violet-700', bar: 'from-violet-500 to-indigo-500' },
  { grad: 'from-sky-500 to-blue-600', soft: 'bg-sky-100 text-sky-700', bar: 'from-sky-500 to-blue-500' },
  { grad: 'from-amber-400 to-orange-500', soft: 'bg-amber-100 text-amber-700', bar: 'from-amber-400 to-orange-500' },
  { grad: 'from-emerald-400 to-teal-600', soft: 'bg-emerald-100 text-emerald-700', bar: 'from-emerald-400 to-teal-500' },
  { grad: 'from-pink-500 to-rose-600', soft: 'bg-pink-100 text-pink-700', bar: 'from-pink-500 to-rose-500' },
]

export default function Home() {
  const { user } = useUser()
  const { courses: COURSES } = useContent()

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 shadow-lift">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">Learn math, one clip at a time 📚</h1>
          <p className="mt-3 text-white/85 max-w-lg">
            Pick a course, watch a short video, then take a quick 3-question check-in. Bite-sized, adaptive, and actually fun.
          </p>
        </div>
      </section>

      {/* Courses */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-1">Courses</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {COURSES.map((course, i) => {
            const a = ACCENTS[i % ACCENTS.length]
            const total = courseLessonCount(course)
            const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id))
            const done = lessonIds.filter((id) => user.completed.includes(id)).length
            const pct = total ? Math.round((done / total) * 100) : 0
            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="group bg-white rounded-3xl p-5 shadow-soft border border-slate-100 hover:shadow-lift hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className={`grid place-items-center w-14 h-14 rounded-2xl text-2xl text-white bg-gradient-to-br ${a.grad} shadow-soft`}>
                    {course.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-bold group-hover:text-brand-600 transition">{course.name}</div>
                    <div className="text-sm text-slate-500 line-clamp-2">{course.description}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs font-medium">
                  <span className={`px-2 py-1 rounded-full ${a.soft}`}>{pct}% complete</span>
                  <span className="text-slate-400">{course.units.length} units · {total} lessons</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${a.bar} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
