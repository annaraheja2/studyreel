import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../lib/AuthContext'
import { COURSES, courseLessonCount } from '../data/content'

interface ReflectionDoc {
  id: string
  userName?: string
  userEmail?: string
  videoTitle?: string
  courseName?: string
  unitName?: string
  text: string
  createdAt?: { toDate: () => Date }
}

export default function Admin() {
  const { user, isAdmin, ready } = useAuth()
  const [reflections, setReflections] = useState<ReflectionDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAdmin) return
    let cancelled = false
    async function load() {
      try {
        const q = query(collection(db, 'reflections'), orderBy('createdAt', 'desc'), limit(200))
        const snap = await getDocs(q)
        if (!cancelled) {
          setReflections(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ReflectionDoc, 'id'>) })))
        }
      } catch (e) {
        console.warn(e)
        if (!cancelled) setError('Could not load reflections. Make sure the security rules are published.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [isAdmin])

  if (!ready) return <p className="text-slate-500">Loading…</p>

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
        <h1 className="text-2xl font-bold mt-2">Admin</h1>
        <p className="text-slate-500">Signed in as {user.email}. You have full access.</p>
      </div>

      {/* Student reflections */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">✍️ Student “Explain it back” reflections</h2>
          <span className="text-xs text-slate-400">{reflections.length} total</span>
        </div>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading reflections…</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : reflections.length === 0 ? (
          <p className="text-slate-500 text-sm">No reflections yet. They’ll appear here as students write them after lessons.</p>
        ) : (
          <div className="space-y-3">
            {reflections.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-slate-800">“{r.text}”</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">{r.userName || r.userEmail || 'Student'}</span>
                  <span>·</span>
                  <span>{[r.courseName, r.unitName, r.videoTitle].filter(Boolean).join(' › ')}</span>
                  {r.createdAt && (<><span>·</span><span>{fmt(r.createdAt.toDate())}</span></>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Courses overview */}
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
          The next phase adds tools to create/edit courses, units, lessons, and quizzes —
          and upload or link videos — without touching any code.
        </p>
      </div>
    </div>
  )
}

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
