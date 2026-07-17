import { useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import Quiz from '../components/Quiz'
import VideoPlayer from '../components/VideoPlayer'
import StarRating, { DifficultyDots } from '../components/StarRating'
import { ArrowLeft, ArrowRight, Bookmark } from '../components/icons'

export default function VideoPage() {
  const { videoId } = useParams()
  const { user, toggleBookmark, rate, addReflection } = useUser()
  const { getVideo, videos: VIDEOS } = useContent()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [reflection, setReflection] = useState('')
  const [savedNote, setSavedNote] = useState(false)

  const video = videoId ? getVideo(videoId) : undefined
  if (!video) return <p className="text-slate-400">Lesson not found. <Link to="/" className="text-white underline">Go home</Link></p>

  const completed = user.completed.includes(video.id)
  const bookmarked = user.bookmarks.includes(video.id)
  const vIdx = VIDEOS.findIndex((v) => v.id === video.id)
  const next = vIdx >= 0 && vIdx < VIDEOS.length - 1 ? VIDEOS[vIdx + 1] : undefined

  function rewatch() {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  function saveReflection() {
    const t = reflection.trim()
    if (!t) return
    addReflection(video!.id, t)
    setReflection('')
    setSavedNote(true)
  }

  return (
    <div className="space-y-6">
      <Link to={`/unit/${video.unitId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition">
        <ArrowLeft className="w-4 h-4" /> {video.unitName}
      </Link>

      <VideoPlayer url={video.videoURL} videoRef={videoRef} />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{video.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{video.description}</p>
          <div className="flex items-center gap-2 mt-2.5">
            <DifficultyDots level={video.difficulty} />
            {video.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-slate-400">{t}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => toggleBookmark(video.id)}
          className={`shrink-0 transition ${bookmarked ? 'text-white' : 'text-slate-500 hover:text-white'}`}
          title={bookmarked ? 'Remove bookmark' : 'Save for later'}
        >
          <Bookmark filled={bookmarked} className="w-5 h-5" />
        </button>
      </div>

      {!showQuiz ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center space-y-3">
          <div className="font-semibold text-white">Finished watching?</div>
          <p className="text-sm text-slate-400">Take a quick 3-question check-in to test yourself.</p>
          <button onClick={() => setShowQuiz(true)} className="px-6 py-2.5 rounded-md bg-white text-[#06070b] font-semibold hover:bg-slate-200 transition">
            Start check-in
          </button>
        </div>
      ) : (
        <Quiz videoId={video.id} onRewatch={rewatch} />
      )}

      {completed && (
        <div className="space-y-6 border-t border-white/10 pt-6">
          <div>
            <h2 className="font-semibold text-white mb-2">Rate this lesson</h2>
            <StarRating rating={user.ratings[video.id] ?? 0} onRate={(s) => rate(video.id, s)} />
          </div>

          <div>
            <h2 className="font-semibold text-white">Explain it back</h2>
            <p className="text-sm text-slate-400 mb-2.5">In your own words, what did this lesson teach? Teaching it back is the best way to remember.</p>
            <textarea
              value={reflection}
              onChange={(e) => { setReflection(e.target.value); setSavedNote(false) }}
              rows={3}
              className="w-full rounded-lg bg-white/[0.04] border border-white/10 text-slate-100 placeholder-slate-500 p-3 text-sm focus:border-white/25 outline-none"
              placeholder="This lesson taught me…"
            />
            <button onClick={saveReflection} className="mt-2 px-4 py-2 rounded-md border border-white/15 hover:bg-white/[0.05] text-sm text-slate-200 transition">
              Save reflection
            </button>
            {savedNote && <span className="ml-2 text-sm text-emerald-400">Saved</span>}
            <div className="mt-3 space-y-2">
              {(user.reflections[video.id] ?? []).map((r, i) => (
                <p key={i} className="text-sm text-slate-300 bg-white/[0.03] border border-white/10 rounded-lg p-3">“{r}”</p>
              ))}
            </div>
          </div>

          {next ? (
            <Link to={`/video/${next.id}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-white/20 transition-all">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Up next</div>
                <div className="font-semibold text-white mt-0.5">{next.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </Link>
          ) : (
            <p className="text-emerald-400 font-medium text-sm">You've reached the end — great work.</p>
          )}
        </div>
      )}
    </div>
  )
}
