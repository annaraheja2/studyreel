import { Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { ArrowRight } from '../components/icons'

// Cool, varied accents tuned for the baby-blue theme.
const ACCENTS = [
  { badge: 'bg-[#2F6FB0]/12 text-[#2F6FB0] ring-1 ring-[#2F6FB0]/25', bar: 'bg-[#2F6FB0]', text: 'text-[#2F6FB0]' }, // blue
  { badge: 'bg-[#2E8C86]/12 text-[#2E8C86] ring-1 ring-[#2E8C86]/25', bar: 'bg-[#2E8C86]', text: 'text-[#2E8C86]' }, // teal
  { badge: 'bg-[#5C63B6]/12 text-[#5C63B6] ring-1 ring-[#5C63B6]/25', bar: 'bg-[#5C63B6]', text: 'text-[#5C63B6]' }, // indigo
  { badge: 'bg-[#8A5CB0]/12 text-[#8A5CB0] ring-1 ring-[#8A5CB0]/25', bar: 'bg-[#8A5CB0]', text: 'text-[#8A5CB0]' }, // violet
  { badge: 'bg-[#C77B57]/12 text-[#C77B57] ring-1 ring-[#C77B57]/25', bar: 'bg-[#C77B57]', text: 'text-[#C77B57]' }, // terracotta pop
]

export default function Home() {
  const { user } = useUser()
  const { courses: COURSES } = useContent()

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border border-[#CADDEE] bg-[#FBFDFF] shadow-warm px-7 py-12 sm:px-10 sm:py-16">
        {/* Eclipse motif — amber glow */}
        <div className="pointer-events-none absolute -top-10 -right-10 sm:top-8 sm:right-10">
          <div className="relative w-40 h-40 sm:w-44 sm:h-44">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D98A2B]/55 to-[#A85410]/35" />
            <div className="absolute inset-0 rounded-full bg-[#FBFDFF] translate-x-9 -translate-y-5" />
          </div>
        </div>
        <div className="relative max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#A85E10] uppercase">Eclipse Learning</div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1F2A36] leading-[1.05]">
            Learn math,<br />one clip at a time.
          </h1>
          <p className="mt-5 text-[#566573] text-[15px] max-w-md leading-relaxed">
            Short video lessons paired with quick, adaptive check-ins. Focused, measurable, and built to make progress stick.
          </p>
        </div>
      </section>

      {/* Courses */}
      <div className="space-y-5">
        <div className="flex items-baseline justify-between px-0.5">
          <h2 className="text-xs font-semibold text-[#74828F] uppercase tracking-[0.16em]">Courses</h2>
          <span className="text-xs text-[#93A2B0]">{COURSES.length} available</span>
        </div>
        <div className="space-y-3">
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
                className="group flex items-center gap-4 bg-[#FBFDFF] rounded-xl border border-[#CADDEE] shadow-warmSm p-5 hover:border-[#A6C6E0] hover:shadow-warm transition-all"
              >
                <span className={`grid place-items-center w-12 h-12 rounded-lg font-bold text-lg shrink-0 ${a.badge}`}>
                  {initial}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1F2A36] truncate">{course.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#93A2B0] group-hover:text-[#1F2A36] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-sm text-[#74828F] line-clamp-1 mt-0.5">{course.description}</div>
                  <div className="h-1 bg-[#CADDEE] rounded-full mt-2.5 overflow-hidden max-w-md">
                    <div className={`h-full rounded-full ${a.bar} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <div className={`text-sm font-semibold ${a.text}`}>{pct}%</div>
                  <div className="text-xs text-[#93A2B0] mt-0.5">{course.units.length} units · {total} lessons</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
