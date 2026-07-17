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
  if (!video) return <p className="text-[#6E6459]">Lesson not found. <Link to="/" className="text-[#2B2620] underline">Go home</Link></p>

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
      <Link to={`/unit/${video.unitId}`} className="inline-flex items-center gap-1.5 text-sm text-[#8A8071] hover:text-[#2B2620] transition">
        <ArrowLeft className="w-4 h-4" /> {video.unitName}
      </Link>

      <VideoPlayer url={video.videoURL} videoRef={videoRef} />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#2B2620] tracking-tight">{video.title}</h1>
          <p className="text-[#6E6459] text-sm mt-1">{video.description}</p>
          <div className="flex items-center gap-2 mt-2.5">
            <DifficultyDots level={video.difficulty} />
            {video.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-0.5 rounded bg-[#E1D8C8] border border-[#E1D8C8] text-[#6E6459]">{t}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => toggleBookmark(video.id)}
          className={`shrink-0 transition ${bookmarked ? 'text-[#2B2620]' : 'text-[#8A8071] hover:text-[#2B2620]'}`}
          title={bookmarked ? 'Remove bookmark' : 'Save for later'}
        >
          <Bookmark filled={bookmarked} className="w-5 h-5" />
        </button>
      </div>

      {!showQuiz ? (
        <div className="rounded-xl border border-[#E1D8C8] bg-[#FBF8F2] p-6 text-center space-y-3">
          <div className="font-semibold text-[#2B2620]">Finished watching?</div>
          <p className="text-sm text-[#6E6459]">Take a quick 3-question check-in to test yourself.</p>
          <button onClick={() => setShowQuiz(true)} className="px-6 py-2.5 rounded-md bg-[#2B2620] text-[#F4EFE6] font-semibold hover:bg-[#3D352B] transition">
            Start check-in
          </button>
        </div>
      ) : (
        <Quiz videoId={video.id} onRewatch={rewatch} />
      )}

      {completed && (
        <div className="space-y-6 border-t border-[#E1D8C8] pt-6">
          <div>
            <h2 className="font-semibold text-[#2B2620] mb-2">Rate this lesson</h2>
            <StarRating rating={user.ratings[video.id] ?? 0} onRate={(s) => rate(video.id, s)} />
          </div>

          <div>
            <h2 className="font-semibold text-[#2B2620]">Explain it back</h2>
            <p className="text-sm text-[#6E6459] mb-2.5">In your own words, what did this lesson teach? Teaching it back is the best way to remember.</p>
            <textarea
              value={reflection}
              onChange={(e) => { setReflection(e.target.value); setSavedNote(false) }}
              rows={3}
              className="w-full rounded-lg bg-[#FBF8F2] border border-[#E1D8C8] text-[#2B2620] placeholder-[#A99E8D] p-3 text-sm focus:border-[#C7B9A2] outline-none"
              placeholder="This lesson taught me…"
            />
            <button onClick={saveReflection} className="mt-2 px-4 py-2 rounded-md border border-[#D8CCB9] hover:bg-[#F1EBDF] text-sm text-[#3A332B] transition">
              Save reflection
            </button>
            {savedNote && <span className="ml-2 text-sm text-emerald-700">Saved</span>}
            <div className="mt-3 space-y-2">
              {(user.reflections[video.id] ?? []).map((r, i) => (
                <p key={i} className="text-sm text-[#4A4136] bg-[#F7F1E7] border border-[#E1D8C8] rounded-lg p-3">“{r}”</p>
              ))}
            </div>
          </div>

          {next ? (
            <Link to={`/video/${next.id}`} className="flex items-center justify-between rounded-lg border border-[#E1D8C8] bg-[#FBF8F2] p-4 hover:bg-[#F1EBDF] hover:border-[#D8CCB9] transition-all">
              <div>
                <div className="text-xs text-[#8A8071] uppercase tracking-wide">Up next</div>
                <div className="font-semibold text-[#2B2620] mt-0.5">{next.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#6E6459]" />
            </Link>
          ) : (
            <p className="text-emerald-700 font-medium text-sm">You've reached the end — great work.</p>
          )}
        </div>
      )}
    </div>
  )
}
