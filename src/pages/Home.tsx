import { Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'

// Rich accent set — each course glows in its own color on hover.
const ACCENTS = [
  { grad: 'from-violet-500 to-indigo-600', text: 'text-violet-600', bar: 'from-violet-500 to-indigo-500', glow: 'hover:shadow-[0_18px_50px_-18px_rgba(124,58,237,0.55)]' },
  { grad: 'from-sky-500 to-blue-600', text: 'text-sky-600', bar: 'from-sky-500 to-blue-500', glow: 'hover:shadow-[0_18px_50px_-18px_rgba(2,132,199,0.55)]' },
  { grad: 'from-amber-400 to-orange-500', text: 'text-amber-600', bar: 'from-amber-400 to-orange-500', glow: 'hover:shadow-[0_18px_50px_-18px_rgba(234,88,12,0.55)]' },
  { grad: 'from-emerald-400 to-teal-600', text: 'text-emerald-600', bar: 'from-emerald-400 to-teal-500', glow: 'hover:shadow-[0_18px_50px_-18px_rgba(13,148,136,0.55)]' },
  { grad: 'from-rose-500 to-pink-600', text: 'text-rose-600', bar: 'from-rose-500 to-pink-500', glow: 'hover:shadow-[0_18px_50px_-18px_rgba(225,29,72,0.55)]' },
]

const GRID = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)',
  backgroundSize: '46px 46px',
  maskImage: 'radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(120% 80% at 50% 0%, #000 30%, transparent 75%)',
}

export default function Home() {
  const { user } = useUser()
  const { courses: COURSES } = useContent()

  return (
    <div className="space-y-8">
      {/* Rich, cool hero */}
      <section className="relative overflow-hidden rounded-[28px] p-8 sm:p-12 bg-slate-950 text-white">
        <div className="absolute -top-24 -left-12 w-80 h-80 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute -top-10 right-0 w-72 h-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 w-96 h-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute inset-0" style={GRID} />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-100 bg-white/10 border border-white/15 backdrop-blur rounded-full px-3 py-1 mb-5">
            ✦ Bite-sized math, done right
          </span>
          <h1 className="text-4xl sm:text-[3rem] font-extrabold leading-[1.05] tracking-tight max-w-xl bg-gradient-to-br from-white via-white to-indigo-200/80 bg-clip-text text-transparent">
            Learn math, one clip at a time
          </h1>
          <p className="mt-4 text-slate-300/90 max-w-md text-[15px]">
            Watch a short video, take a quick 3-question check-in, and watch your progress climb.
          </p>
        </div>
      </section>

      {/* Courses */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.16em] px-1">Courses</h2>
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
                className={`group bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-300 ${a.glow}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`grid place-items-center w-12 h-12 rounded-xl text-xl text-white bg-gradient-to-br ${a.grad} shadow-lg shadow-slate-900/10 group-hover:scale-105 transition-transform`}>
                    {course.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 group-hover:text-brand-600 transition">{course.name}</div>
                    <div className="text-sm text-slate-400 line-clamp-1">{course.description}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs">
                  <span className={`font-semibold ${a.text}`}>{pct}% complete</span>
                  <span className="text-slate-400">{course.units.length} units · {total} lessons</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
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
