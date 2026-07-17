import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../lib/AuthContext'
import { useContent } from '../lib/ContentContext'
import { courseLessonCount, type Course } from '../data/content'

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
  const { courses, usingStarter, seed, saveCourses } = useContent()
  const navigate = useNavigate()
  const [reflections, setReflections] = useState<ReflectionDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [refError, setRefError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!isAdmin) return
    let cancelled = false
    async function load() {
      try {
        const q = query(collection(db, 'reflections'), orderBy('createdAt', 'desc'), limit(200))
        const snap = await getDocs(q)
        if (!cancelled) setReflections(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ReflectionDoc, 'id'>) })))
      } catch (e) {
        console.warn(e)
        if (!cancelled) setRefError('Could not load reflections. Make sure the security rules are published.')
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

  async function enableEditing() {
    setBusy(true)
    try { await seed() } catch (e) { console.warn(e); alert('Could not import. Check the content security rule is published.') }
    setBusy(false)
  }

  async function addCourse() {
    const name = prompt('New course name?')
    if (!name) return
    const newCourse: Course = {
      id: `course-${Date.now()}`, name, description: '', emoji: '📘', units: [],
    }
    setBusy(true)
    try { await saveCourses([...courses, newCourse]); navigate(`/admin/course/${newCourse.id}`) }
    catch (e) { console.warn(e); alert('Could not save.') }
    setBusy(false)
  }

  async function deleteCourse(id: string, name: string) {
    if (!confirm(`Delete the entire "${name}" course? This cannot be undone.`)) return
    setBusy(true)
    try { await saveCourses(courses.filter((c) => c.id !== id)) } catch (e) { console.warn(e); alert('Could not save.') }
    setBusy(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-amber-400/20 text-amber-300">OWNER</div>
        <h1 className="text-2xl font-bold mt-2 text-white">Admin</h1>
        <p className="text-slate-400">Signed in as {user.email}. You have full access.</p>
      </div>

      {/* Content management */}
      <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">📚 Courses & content</h2>
          {!usingStarter && (
            <button onClick={addCourse} disabled={busy} className="text-sm px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50">
              + Add course
            </button>
          )}
        </div>

        {usingStarter ? (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-sm text-amber-200 font-medium">Editing isn’t turned on yet.</p>
            <p className="text-sm text-amber-200/80 mt-1">
              Your courses are currently the built-in starter set. Click below once to copy them into your
              database — after that, you can edit lessons, quizzes, and videos right here, and changes go live for everyone.
            </p>
            <button onClick={enableEditing} disabled={busy} className="mt-3 px-4 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 disabled:opacity-50">
              {busy ? 'Importing…' : 'Enable editing (import courses)'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-2xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.units.length} units · {courseLessonCount(c)} lessons</div>
                </div>
                <Link to={`/admin/course/${c.id}`} className="text-sm px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-slate-100">Edit</Link>
                <button onClick={() => deleteCourse(c.id, c.name)} disabled={busy} className="text-sm px-2 py-1.5 rounded-lg text-red-600 hover:bg-red-50">Delete</button>
              </div>
            ))}
            {courses.length === 0 && <p className="text-sm text-slate-500">No courses yet. Click “Add course” to create one.</p>}
          </div>
        )}
      </div>

      {/* Student reflections */}
      <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">✍️ Student “Explain it back” reflections</h2>
          <span className="text-xs text-slate-400">{reflections.length} total</span>
        </div>
        {loading ? (
          <p className="text-slate-500 text-sm">Loading reflections…</p>
        ) : refError ? (
          <p className="text-red-600 text-sm">{refError}</p>
        ) : reflections.length === 0 ? (
          <p className="text-slate-500 text-sm">No reflections yet. They’ll appear here as students write them after lessons.</p>
        ) : (
          <div className="space-y-3">
            {reflections.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-slate-100">“{r.text}”</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-300">{r.userName || r.userEmail || 'Student'}</span>
                  <span>·</span>
                  <span>{[r.courseName, r.unitName, r.videoTitle].filter(Boolean).join(' › ')}</span>
                  {r.createdAt && (<><span>·</span><span>{fmt(r.createdAt.toDate())}</span></>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function fmt(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}
