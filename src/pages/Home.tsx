import { Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { ArrowRight } from '../components/icons'

// Restrained, refined accents — a single muted color per course.
const ACCENTS = [
  { badge: 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20', bar: 'bg-indigo-400', text: 'text-indigo-300' },
  { badge: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20', bar: 'bg-sky-400', text: 'text-sky-300' },
  { badge: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20', bar: 'bg-violet-400', text: 'text-violet-300' },
  { badge: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20', bar: 'bg-emerald-400', text: 'text-emerald-300' },
  { badge: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20', bar: 'bg-amber-400', text: 'text-amber-300' },
]

export default function Home() {
  const { user } = useUser()
  const { courses: COURSES } = useContent()

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-7 py-12 sm:px-10 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
        <div className="relative max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Bite-sized math</div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
            Learn math,<br />one clip at a time.
          </h1>
          <p className="mt-5 text-slate-400 text-[15px] max-w-md leading-relaxed">
            Short video lessons paired with quick, adaptive check-ins. Focused, measurable, and built to make progress stick.
          </p>
        </div>
      </section>

      {/* Courses */}
      <div className="space-y-5">
        <div className="flex items-baseline justify-between px-0.5">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.16em]">Courses</h2>
          <span className="text-xs text-slate-600">{COURSES.length} available</span>
        </div>
        <div className="grid gap-px sm:grid-cols-2 rounded-xl overflow-hidden border border-white/10 bg-white/[0.06]">
          {COURSES.map((course, i) => {
            const a = ACCENTS[i % ACCENTS.length]
            const total = courseLessonCount(course)
            const lessonIds = course.units.flatMap((u) => u.lessons.map((l) => l.id))
            const done = lessonIds.filter((id) => user.completed.includes(id)).length
            const pct = total ? Math.round((done / total) * 100) : 0
            const initial = course.name.trim().charAt(0).toUpperCase()
            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="group bg-[#06070b] hover:bg-white/[0.02] transition-colors p-6"
              >
                <div className="flex items-start gap-4">
                  <span className={`grid place-items-center w-11 h-11 rounded-lg font-bold text-lg shrink-0 ${a.badge}`}>
                    {initial}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white truncate">{course.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="text-sm text-slate-500 line-clamp-1 mt-0.5">{course.description}</div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className={`font-medium ${a.text}`}>{pct}%</span>
                  <span className="text-slate-600">{course.units.length} units · {total} lessons</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${a.bar} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
