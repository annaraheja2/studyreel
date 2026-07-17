import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { useContent } from '../lib/ContentContext'
import VideoUpload from '../components/VideoUpload'
import type { Course, Question } from '../data/content'

const newQuestion = (): Question => ({ text: '', options: ['', '', '', ''], correct: 0, explanation: '', difficulty: 2 })

export default function AdminCourse() {
  const { courseId } = useParams()
  const { isAdmin, ready } = useAuth()
  const { courses, getCourse, saveCourses } = useContent()
  const [draft, setDraft] = useState<Course | null>(null)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const live = courseId ? getCourse(courseId) : undefined
  useEffect(() => { if (!draft && live) setDraft(structuredClone(live)) }, [live, draft])

  if (!ready) return <p className="text-slate-500">Loading…</p>
  if (!isAdmin) return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-3">
      <div className="text-4xl">🔒</div><h1 className="text-xl font-bold">Owners only</h1>
      <Link to="/" className="inline-block text-brand-600">← Home</Link>
    </div>
  )
  if (!draft) return <p className="text-slate-500">Loading course…</p>

  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }))
  const edit = (mut: (c: Course) => void) => {
    setDraft((prev) => { if (!prev) return prev; const next = structuredClone(prev); mut(next); return next })
    setDirty(true)
  }

  async function save() {
    if (!draft) return
    setSaving(true)
    try {
      const exists = courses.some((c) => c.id === draft.id)
      const next = exists ? courses.map((c) => (c.id === draft.id ? draft : c)) : [...courses, draft]
      await saveCourses(next)
      setDirty(false)
    } catch (e) { console.warn(e); alert('Could not save. Check your connection.') }
    setSaving(false)
  }

  const input = 'w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-100 placeholder-slate-500 focus:border-brand-400 focus:ring-1 focus:ring-brand-500/40 outline-none text-sm'

  return (
    <div className="space-y-5 pb-24">
      <Link to="/admin" className="text-sm text-brand-600">← Admin</Link>

      {/* Course details */}
      <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 space-y-3">
        <h1 className="font-bold text-lg">Edit course</h1>
        <div className="flex gap-2">
          <input className={input + ' w-20 text-center text-xl'} value={draft.emoji}
            onChange={(e) => edit((c) => { c.emoji = e.target.value })} placeholder="📘" />
          <input className={input} value={draft.name}
            onChange={(e) => edit((c) => { c.name = e.target.value })} placeholder="Course name" />
        </div>
        <textarea className={input} rows={2} value={draft.description}
          onChange={(e) => edit((c) => { c.description = e.target.value })} placeholder="Course description" />
      </div>

      {/* Units */}
      {draft.units.map((unit, ui) => (
        <div key={unit.id} className="bg-white/[0.04] rounded-2xl border border-white/10 p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => toggle(unit.id)} className="text-slate-500 w-5">{open[unit.id] ? '▾' : '▸'}</button>
            <input className={input + ' w-16 text-center'} value={unit.emoji}
              onChange={(e) => edit((c) => { c.units[ui].emoji = e.target.value })} />
            <input className={input + ' font-semibold'} value={unit.name}
              onChange={(e) => edit((c) => { c.units[ui].name = e.target.value })} placeholder="Unit name" />
            <button onClick={() => edit((c) => { c.units.splice(ui, 1) })} className="text-red-500 text-sm px-2">🗑</button>
          </div>

          {open[unit.id] && (
            <div className="mt-3 pl-6 space-y-3">
              <input className={input} value={unit.description}
                onChange={(e) => edit((c) => { c.units[ui].description = e.target.value })} placeholder="Unit description" />

              {/* Lessons */}
              {unit.lessons.map((lesson, li) => (
                <div key={lesson.id} className="border border-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggle(lesson.id)} className="text-slate-500 w-5">{open[lesson.id] ? '▾' : '▸'}</button>
                    <input className={input} value={lesson.title}
                      onChange={(e) => edit((c) => { c.units[ui].lessons[li].title = e.target.value })} placeholder="Lesson title" />
                    <button onClick={() => edit((c) => { c.units[ui].lessons.splice(li, 1) })} className="text-red-500 text-sm px-2">🗑</button>
                  </div>

                  {open[lesson.id] && (
                    <div className="mt-3 space-y-2">
                      <textarea className={input} rows={2} value={lesson.description}
                        onChange={(e) => edit((c) => { c.units[ui].lessons[li].description = e.target.value })} placeholder="Lesson description" />
                      <label className="block text-xs font-medium text-slate-400">Video — drag a file to upload, or paste a link (Google Drive / YouTube / .mp4)</label>
                      <VideoUpload onUploaded={(url) => edit((c) => { c.units[ui].lessons[li].videoURL = url })} />
                      <input className={input} value={lesson.videoURL}
                        onChange={(e) => edit((c) => { c.units[ui].lessons[li].videoURL = e.target.value })} placeholder="…or paste a link here" />
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-400">Difficulty (1–5)</label>
                          <select className={input} value={lesson.difficulty}
                            onChange={(e) => edit((c) => { c.units[ui].lessons[li].difficulty = Number(e.target.value) })}>
                            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-400">Tags (comma-separated)</label>
                          <input className={input} value={lesson.tags.join(', ')}
                            onChange={(e) => edit((c) => { c.units[ui].lessons[li].tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} />
                        </div>
                      </div>

                      {/* Questions */}
                      <div className="mt-2">
                        <div className="text-xs font-semibold text-slate-400 mb-1">Quiz questions</div>
                        {lesson.questions.map((qq, qi) => (
                          <div key={qi} className="bg-white/[0.03] rounded-lg p-3 mb-2 space-y-2">
                            <div className="flex gap-2">
                              <input className={input} value={qq.text}
                                onChange={(e) => edit((c) => { c.units[ui].lessons[li].questions[qi].text = e.target.value })} placeholder={`Question ${qi + 1}`} />
                              <button onClick={() => edit((c) => { c.units[ui].lessons[li].questions.splice(qi, 1) })} className="text-red-500 text-sm px-1">🗑</button>
                            </div>
                            {qq.options.map((opt, oi) => (
                              <div key={oi} className="flex items-center gap-2">
                                <input type="radio" name={`${lesson.id}-${qi}`} checked={qq.correct === oi}
                                  onChange={() => edit((c) => { c.units[ui].lessons[li].questions[qi].correct = oi })} title="Mark correct" />
                                <input className={input} value={opt}
                                  onChange={(e) => edit((c) => { c.units[ui].lessons[li].questions[qi].options[oi] = e.target.value })} placeholder={`Option ${oi + 1}`} />
                              </div>
                            ))}
                            <input className={input} value={qq.explanation}
                              onChange={(e) => edit((c) => { c.units[ui].lessons[li].questions[qi].explanation = e.target.value })} placeholder="Explanation (why the answer is right)" />
                            <div className="text-xs text-slate-500">Select the radio button next to the correct answer.</div>
                          </div>
                        ))}
                        <button onClick={() => edit((c) => { c.units[ui].lessons[li].questions.push(newQuestion()) })}
                          className="text-sm text-brand-600">+ Add question</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => edit((c) => {
                  c.units[ui].lessons.push({
                    id: `lesson-${crypto.randomUUID().slice(0, 8)}`, title: 'New lesson', description: '',
                    videoURL: '', difficulty: 2, tags: [], questions: [newQuestion(), newQuestion(), newQuestion()],
                  })
                })}
                className="text-sm text-brand-600"
              >+ Add lesson</button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => edit((c) => {
          c.units.push({ id: `unit-${crypto.randomUUID().slice(0, 8)}`, name: 'New unit', description: '', emoji: '📄', lessons: [] })
        })}
        className="text-sm px-3 py-2 rounded-lg border border-white/15 hover:bg-white/10 text-slate-100"
      >+ Add unit</button>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-t border-white/10 p-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-sm text-slate-400">{dirty ? '● Unsaved changes' : 'All changes saved'}</span>
          <button onClick={save} disabled={!dirty || saving}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/40 transition disabled:opacity-50">
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
