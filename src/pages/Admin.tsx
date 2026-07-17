import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../lib/AuthContext'
import { useContent } from '../lib/ContentContext'
import { useShorts } from '../lib/ShortsContext'
import VideoUpload from '../components/VideoUpload'
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
  const { shorts, addShort, deleteShort } = useShorts()
  const navigate = useNavigate()
  const [reflections, setReflections] = useState<ReflectionDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [refError, setRefError] = useState('')
  const [busy, setBusy] = useState(false)
  const [shortTitle, setShortTitle] = useState('')
  const [shortUrl, setShortUrl] = useState('')

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

  if (!ready) return <p className="text-[#74828F]">Loading…</p>

  if (!user || !isAdmin) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center space-y-3">
        <h1 className="text-xl font-bold">Owners only</h1>
        <p className="text-[#74828F]">This area is for Eclipse Learning administrators.</p>
        <Link to="/" className="inline-block text-[#2F6FB0]">← Back to home</Link>
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
      id: `course-${Date.now()}`, name, description: '', emoji: '', units: [],
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

  async function postShort() {
    if (!shortTitle.trim() || !shortUrl.trim()) { alert('Add a title and a video.'); return }
    setBusy(true)
    try {
      await addShort({ title: shortTitle.trim(), videoURL: shortUrl.trim(), creatorName: user?.displayName || user?.email || 'Owner' })
      setShortTitle(''); setShortUrl('')
    } catch (e) { console.warn(e); alert('Could not post. Check the shorts security rule is published.') }
    setBusy(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-amber-500/15 text-amber-700">OWNER</div>
        <h1 className="text-2xl font-bold mt-2 text-[#1F2A36]">Admin</h1>
        <p className="text-[#566573]">Signed in as {user.email}. You have full access.</p>
      </div>

      {/* Content management */}
      <div className="bg-[#FBFDFF] rounded-2xl border border-[#CADDEE] p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Courses & content</h2>
          {!usingStarter && (
            <button onClick={addCourse} disabled={busy} className="text-sm px-3 py-1.5 rounded-lg bg-[#1F2A36] text-[#F4F9FE] hover:bg-[#2E3B49] disabled:opacity-50">
              + Add course
            </button>
          )}
        </div>

        {usingStarter ? (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-sm text-amber-800 font-medium">Editing isn’t turned on yet.</p>
            <p className="text-sm text-amber-700 mt-1">
              Your courses are currently the built-in starter set. Click below once to copy them into your
              database — after that, you can edit lessons, quizzes, and videos right here, and changes go live for everyone.
            </p>
            <button onClick={enableEditing} disabled={busy} className="mt-3 px-4 py-2 rounded-lg bg-amber-500 text-[#F4F9FE] font-semibold hover:bg-amber-400 disabled:opacity-50">
              {busy ? 'Importing…' : 'Enable editing (import courses)'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#EDF5FC] border border-[#CADDEE]">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#1F2A36]">{c.name}</div>
                  <div className="text-xs text-[#74828F]">{c.units.length} units · {courseLessonCount(c)} lessons</div>
                </div>
                <Link to={`/admin/course/${c.id}`} className="text-sm px-3 py-1.5 rounded-md border border-[#B9D2E8] hover:bg-black/[0.05] text-[#1F2A36] transition">Edit</Link>
                <button onClick={() => deleteCourse(c.id, c.name)} disabled={busy} className="text-sm px-2 py-1.5 rounded-md text-red-600 hover:bg-red-500/10 transition">Delete</button>
              </div>
            ))}
            {courses.length === 0 && <p className="text-sm text-[#74828F]">No courses yet. Click “Add course” to create one.</p>}
          </div>
        )}
      </div>

      {/* Videos feed (shorts) */}
      <div className="bg-[#FBFDFF] rounded-2xl border border-[#CADDEE] shadow-warmSm p-5">
        <h2 className="font-semibold mb-1">Videos feed</h2>
        <p className="text-xs text-[#74828F] mb-3">Upload short videos for the scrolling “Videos” tab. Best as portrait clips.</p>
        <div className="space-y-2 bg-[#EDF5FC] border border-[#CADDEE] rounded-lg p-3">
          <input
            value={shortTitle} onChange={(e) => setShortTitle(e.target.value)} placeholder="Caption / title"
            className="w-full px-3 py-2 rounded-lg bg-[#FBFDFF] border border-[#CADDEE] text-[#1F2A36] placeholder-[#93A2B0] focus:border-[#A6C6E0] outline-none text-sm"
          />
          <VideoUpload onUploaded={(url) => setShortUrl(url)} />
          <input
            value={shortUrl} onChange={(e) => setShortUrl(e.target.value)} placeholder="…or paste a direct video link"
            className="w-full px-3 py-2 rounded-lg bg-[#FBFDFF] border border-[#CADDEE] text-[#1F2A36] placeholder-[#93A2B0] focus:border-[#A6C6E0] outline-none text-sm"
          />
          <button onClick={postShort} disabled={busy} className="px-4 py-2 rounded-md bg-[#1F2A36] text-[#F4F9FE] font-semibold hover:bg-[#2E3B49] disabled:opacity-50 transition text-sm">
            {busy ? 'Posting…' : 'Post to feed'}
          </button>
        </div>
        {shorts.length > 0 && (
          <div className="mt-3 space-y-2">
            {shorts.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#EDF5FC] border border-[#CADDEE]">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-[#1F2A36] truncate">{s.title}</div>
                  <div className="text-xs text-[#74828F] truncate">{s.creatorName}</div>
                </div>
                <button onClick={() => { if (confirm('Delete this video?')) deleteShort(s.id) }} className="text-sm px-2 py-1 rounded-md text-red-600 hover:bg-red-500/10 transition">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student reflections */}
      <div className="bg-[#FBFDFF] rounded-2xl border border-[#CADDEE] p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Student reflections</h2>
          <span className="text-xs text-[#566573]">{reflections.length} total</span>
        </div>
        {loading ? (
          <p className="text-[#74828F] text-sm">Loading reflections…</p>
        ) : refError ? (
          <p className="text-red-600 text-sm">{refError}</p>
        ) : reflections.length === 0 ? (
          <p className="text-[#74828F] text-sm">No reflections yet. They’ll appear here as students write them after lessons.</p>
        ) : (
          <div className="space-y-3">
            {reflections.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-[#EDF5FC] border border-[#CADDEE]">
                <p className="text-[#1F2A36]">“{r.text}”</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-[#74828F]">
                  <span className="font-medium text-[#3A4653]">{r.userName || r.userEmail || 'Student'}</span>
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
