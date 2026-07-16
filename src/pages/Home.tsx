import { Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

// Subtle color accents cycled across course cards — refined, not loud.
const ACCENTS = [
  { grad: 'from-violet-500 to-indigo-600', dot: 'bg-violet-500', soft: 'text-violet-600' },
  { grad: 'from-sky-500 to-blue-600', dot: 'bg-sky-500', soft: 'text-sky-600' },
  { grad: 'from-amber-400 to-orange-500', dot: 'bg-amber-500', soft: 'text-amber-600' },
  { grad: 'from-emerald-400 to-teal-600', dot: 'bg-emerald-500', soft: 'text-emerald-600' },
  { grad: 'from-rose-500 to-pink-600', dot: 'bg-rose-500', soft: 'text-rose-600' },
]

export default function Home() {
  const { user } = useUser()
  const { courses: COURSES } = useContent()

  return (
    <div className="space-y-8">
      {/* Sleek dark hero */}
      <section className="relative overflow-hidden rounded-[26px] p-8 sm:p-11 bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-transparent to-fuchsia-600/10" />
        <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-200 bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-4">
            ✦ Bite-sized math
          </span>
          <h1 className="text-3xl sm:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight max-w-xl">
            Learn math, one clip at a time
          </h1>
          <p className="mt-3 text-slate-300/90 max-w-md">
            Watch a short video, take a quick 3-question check-in, and watch your progress grow.
          </p>
        </div>
      </section>

      {/* Courses */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] px-1">Courses</h2>
        <div className="grid gap-3.5 sm:grid-cols-2">
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
                className="group bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-slate-300 hover:shadow-soft transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`grid place-items-center w-12 h-12 rounded-xl text-xl text-white bg-gradient-to-br ${a.grad}`}>
                    {course.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 group-hover:text-brand-600 transition">{course.name}</div>
                    <div className="text-sm text-slate-400 line-clamp-1">{course.description}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs">
                  <span className={`font-semibold ${a.soft}`}>{pct}% complete</span>
                  <span className="text-slate-400">{course.units.length} units · {total} lessons</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${a.dot} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
