import ProgressMap from '../components/ProgressMap'
import { useUser } from '../lib/UserContext'
import { overallProgress } from '../lib/store'
import { VIDEOS } from '../data/content'

export default function Home() {
  const { user } = useUser()
  const pct = Math.round(overallProgress(user) * 100)

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-2xl font-bold">Learn math, one clip at a time 📚</h1>
        <p className="text-slate-500 mt-2">
          Pick any lesson, watch the short video, then take a quick 3-question check-in to test yourself.
        </p>
        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="font-bold text-brand-600">{pct}% complete</span>
          <span className="text-slate-500">{user.completed.length}/{VIDEOS.length} lessons</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <ProgressMap />
    </div>
  )
}
