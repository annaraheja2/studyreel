import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { COURSES, courseLessonCount } from '../data/content'

export default function Admin() {
  const { user, isAdmin, ready } = useAuth()

  if (!ready) return <p className="text-slate-500">Loading…</p>

  // Guard: only master/owner accounts may see this page.
  if (!user || !isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center space-y-3">
        <div className="text-4xl">🔒</div>
        <h1 className="text-xl font-bold">Owners only</h1>
        <p className="text-slate-500">This area is for StudyReel administrators.</p>
        <Link to="/" className="inline-block text-brand-600">← Back to home</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700">OWNER</div>
        <h1 className="text-2xl font-bold mt-2">Admin — Content Manager</h1>
        <p className="text-slate-500">Signed in as {user.email}. You have full editing access.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h2 className="font-semibold mb-3">Your courses</h2>
        <div className="space-y-2">
          {COURSES.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <span className="text-2xl">{c.emoji}</span>
              <div className="flex-1">
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-slate-500">{c.units.length} units · {courseLessonCount(c)} lessons</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <h2 className="font-semibold text-amber-800">🚧 Coming next: edit & upload from here</h2>
        <p className="text-sm text-amber-700 mt-1">
          The next phase adds tools right here to create/edit courses, units, lessons, and quizzes —
          and upload or link videos — without touching any code. Only owner accounts
          (you and your partners) will be able to make changes.
        </p>
      </div>
    </div>
  )
}
