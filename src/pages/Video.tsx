import { useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useUser } from '../lib/UserContext'
import { useContent } from '../lib/ContentContext'
import Quiz from '../components/Quiz'
import VideoPlayer from '../components/VideoPlayer'
import StarRating, { DifficultyDots } from '../components/StarRating'

export default function VideoPage() {
  const { videoId } = useParams()
  const { user, toggleBookmark, rate, addReflection } = useUser()
  const { getVideo, videos: VIDEOS } = useContent()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [reflection, setReflection] = useState('')
  const [savedNote, setSavedNote] = useState(false)

  const video = videoId ? getVideo(videoId) : undefined
  if (!video) return <p className="text-slate-500">Lesson not found. <Link to="/" className="text-brand-600">Go home</Link></p>

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
    <div className="space-y-5">
      <Link to={`/unit/${video.unitId}`} className="text-sm text-brand-600">← {video.unitName}</Link>

      <VideoPlayer url={video.videoURL} videoRef={videoRef} />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">{video.title}</h1>
          <p className="text-slate-500 text-sm">{video.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <DifficultyDots level={video.difficulty} />
            {video.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">#{t}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => toggleBookmark(video.id)}
          className="text-2xl shrink-0"
          title={bookmarked ? 'Remove bookmark' : 'Save for later'}
        >
          {bookmarked ? '🔖' : '📑'}
        </button>
      </div>

      {!showQuiz ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center space-y-3">
          <div className="font-semibold">Finished watching?</div>
          <p className="text-sm text-slate-500">Take a quick 3-question check-in to test yourself.</p>
          <button onClick={() => setShowQuiz(true)} className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700">
            Start check-in quiz
          </button>
        </div>
      ) : (
        <Quiz videoId={video.id} onRewatch={rewatch} />
      )}

      {completed && (
        <div className="space-y-5 border-t border-slate-200 pt-5">
          <div>
            <h2 className="font-semibold mb-2">Rate this lesson</h2>
            <StarRating rating={user.ratings[video.id] ?? 0} onRate={(s) => rate(video.id, s)} />
          </div>

          <div>
            <h2 className="font-semibold">Explain it back ✍️</h2>
            <p className="text-sm text-slate-500 mb-2">In your own words, what did this lesson teach? Teaching it back is the best way to remember.</p>
            <textarea
              value={reflection}
              onChange={(e) => { setReflection(e.target.value); setSavedNote(false) }}
              rows={3}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="This lesson taught me…"
            />
            <button onClick={saveReflection} className="mt-2 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm">
              Save reflection
            </button>
            {savedNote && <span className="ml-2 text-sm text-green-600">Saved!</span>}
            <div className="mt-3 space-y-2">
              {(user.reflections[video.id] ?? []).map((r, i) => (
                <p key={i} className="text-sm text-slate-600 bg-slate-100 rounded-lg p-3">“{r}”</p>
              ))}
            </div>
          </div>

          {next ? (
            <Link to={`/video/${next.id}`} className="flex items-center justify-between bg-brand-50 rounded-xl p-4 hover:bg-brand-100">
              <div>
                <div className="text-xs text-slate-500">Up next</div>
                <div className="font-semibold">{next.title}</div>
              </div>
              <span className="text-2xl text-brand-600">→</span>
            </Link>
          ) : (
            <p className="text-green-600 font-medium">🏁 You've reached the end — great work!</p>
          )}
        </div>
      )}
    </div>
  )
}
