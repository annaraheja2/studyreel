import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShorts, type Short } from '../lib/ShortsContext'
import { useUser } from '../lib/UserContext'
import { X, Heart, Bookmark, Volume, VolumeMute, Film } from '../components/icons'

export default function Videos() {
  const { shorts, loading } = useShorts()
  const [muted, setMuted] = useState(true)

  return (
    <div className="fixed inset-0 z-30 bg-black text-white">
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 h-14 bg-gradient-to-b from-black/60 to-transparent">
        <Link to="/" className="p-2 -ml-2 text-white/90 hover:text-white"><X /></Link>
        <span className="text-sm font-semibold tracking-wide">Videos</span>
        <button onClick={() => setMuted((m) => !m)} className="p-2 -mr-2 text-white/90 hover:text-white">
          {muted ? <VolumeMute /> : <Volume />}
        </button>
      </div>

      {loading ? (
        <div className="h-full grid place-items-center text-white/60 text-sm">Loading…</div>
      ) : shorts.length === 0 ? (
        <div className="h-full grid place-items-center text-center px-8">
          <div>
            <Film className="w-8 h-8 mx-auto text-white/50" />
            <p className="mt-3 text-white/80 font-medium">No videos yet</p>
            <p className="mt-1 text-sm text-white/50">Owners can upload short videos from the Admin area.</p>
            <Link to="/" className="inline-block mt-4 text-sm text-white/80 underline">Back to home</Link>
          </div>
        </div>
      ) : (
        <div className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
          {shorts.map((s) => (
            <Slide key={s.id} short={s} muted={muted} onToggleMute={() => setMuted((m) => !m)} />
          ))}
        </div>
      )}
    </div>
  )
}

function Slide({ short, muted, onToggleMute }: { short: Short; muted: boolean; onToggleMute: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)
  const { user, toggleLikeShort, toggleSaveShort } = useUser()
  const liked = (user.likedShorts ?? []).includes(short.id)
  const saved = (user.savedShorts ?? []).includes(short.id)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.6) {
          el.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          el.pause()
          el.currentTime = 0
        }
      },
      { threshold: [0, 0.6, 1] }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function tap() {
    const el = ref.current
    if (!el) return
    if (el.paused) { el.play(); setPlaying(true) } else { el.pause(); setPlaying(false) }
  }

  return (
    <div className="relative h-full w-full snap-start snap-always grid place-items-center bg-black">
      <video
        ref={ref}
        src={short.videoURL}
        muted={muted}
        loop
        playsInline
        onClick={tap}
        className="max-h-full max-w-full w-full h-full object-contain"
      />

      {/* Play indicator when paused */}
      {!playing && (
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 grid place-items-center">
            <span className="ml-1 border-y-[12px] border-y-transparent border-l-[20px] border-l-white/90" />
          </div>
        </div>
      )}

      {/* Right action rail */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
        <button onClick={() => toggleLikeShort(short.id)} className="flex flex-col items-center gap-1">
          <span className={`grid place-items-center w-11 h-11 rounded-full bg-white/10 backdrop-blur ${liked ? 'text-rose-500' : 'text-white'}`}>
            <Heart filled={liked} className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-white/80">Like</span>
        </button>
        <button onClick={() => toggleSaveShort(short.id)} className="flex flex-col items-center gap-1">
          <span className={`grid place-items-center w-11 h-11 rounded-full bg-white/10 backdrop-blur ${saved ? 'text-amber-400' : 'text-white'}`}>
            <Bookmark filled={saved} className="w-6 h-6" />
          </span>
          <span className="text-[11px] text-white/80">Save</span>
        </button>
        <button onClick={onToggleMute} className="flex flex-col items-center gap-1">
          <span className="grid place-items-center w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white">
            {muted ? <VolumeMute className="w-6 h-6" /> : <Volume className="w-6 h-6" />}
          </span>
          <span className="text-[11px] text-white/80">{muted ? 'Muted' : 'Sound'}</span>
        </button>
      </div>

      {/* Caption */}
      <div className="absolute left-4 right-20 bottom-8">
        <div className="font-semibold text-[15px]">{short.title}</div>
        {short.creatorName && <div className="text-xs text-white/70 mt-1">{short.creatorName}</div>}
      </div>
    </div>
  )
}
