import { Link } from 'react-router-dom'
import { courseLessonCount } from '../data/content'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import { ArrowRight } from '../components/icons'

// Warm, earthy muted accents — one per course, tuned for the beige theme.
const ACCENTS = [
  { badge: 'bg-[#9A6A45]/12 text-[#9A6A45] ring-1 ring-[#9A6A45]/25', bar: 'bg-[#9A6A45]', text: 'text-[#9A6A45]' }, // clay
  { badge: 'bg-[#5F6B54]/12 text-[#5F6B54] ring-1 ring-[#5F6B54]/25', bar: 'bg-[#5F6B54]', text: 'text-[#5F6B54]' }, // sage
  { badge: 'bg-[#4C5B70]/12 text-[#4C5B70] ring-1 ring-[#4C5B70]/25', bar: 'bg-[#4C5B70]', text: 'text-[#4C5B70]' }, // dusty blue
  { badge: 'bg-[#8C5B6B]/12 text-[#8C5B6B] ring-1 ring-[#8C5B6B]/25', bar: 'bg-[#8C5B6B]', text: 'text-[#8C5B6B]' }, // muted rose
  { badge: 'bg-[#9A7B3F]/12 text-[#9A7B3F] ring-1 ring-[#9A7B3F]/25', bar: 'bg-[#9A7B3F]', text: 'text-[#9A7B3F]' }, // ochre
]

export default function Home() {
  const { user } = useUser()
  const { courses: COURSES } = useContent()

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl border border-[#E1D8C8] bg-[#FBF8F2] shadow-warm px-7 py-12 sm:px-10 sm:py-16">
        {/* Eclipse motif */}
        <div className="pointer-events-none absolute -top-10 -right-10 sm:top-8 sm:right-10">
          <div className="relative w-40 h-40 sm:w-44 sm:h-44">
            <div className="absolute inset-0 rounded-full bg-[#9A6A45]/20" />
            <div className="absolute inset-0 rounded-full bg-[#FBF8F2] translate-x-9 -translate-y-5" />
          </div>
        </div>
        <div className="relative max-w-2xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#9A6A45] uppercase">Eclipse Learning</div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#2B2620] leading-[1.05]">
            Learn math,<br />one clip at a time.
          </h1>
          <p className="mt-5 text-[#6E6459] text-[15px] max-w-md leading-relaxed">
            Short video lessons paired with quick, adaptive check-ins. Focused, measurable, and built to make progress stick.
          </p>
        </div>
      </section>

      {/* Courses */}
      <div className="space-y-5">
        <div className="flex items-baseline justify-between px-0.5">
          <h2 className="text-xs font-semibold text-[#8A8071] uppercase tracking-[0.16em]">Courses</h2>
          <span className="text-xs text-[#A99E8D]">{COURSES.length} available</span>
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
                className="group flex items-center gap-4 bg-[#FBF8F2] rounded-xl border border-[#E1D8C8] shadow-warmSm p-5 hover:border-[#C7B9A2] hover:shadow-warm transition-all"
              >
                <span className={`grid place-items-center w-12 h-12 rounded-lg font-bold text-lg shrink-0 ${a.badge}`}>
                  {initial}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#2B2620] truncate">{course.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#A99E8D] group-hover:text-[#2B2620] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-sm text-[#8A8071] line-clamp-1 mt-0.5">{course.description}</div>
                  <div className="h-1 bg-[#E1D8C8] rounded-full mt-2.5 overflow-hidden max-w-md">
                    <div className={`h-full rounded-full ${a.bar} transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <div className={`text-sm font-semibold ${a.text}`}>{pct}%</div>
                  <div className="text-xs text-[#A99E8D] mt-0.5">{course.units.length} units · {total} lessons</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
