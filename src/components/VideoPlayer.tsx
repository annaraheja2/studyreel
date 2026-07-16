import type { RefObject } from 'react'

// Figures out how to play a lesson video from its URL:
//  • YouTube link  → embedded YouTube player
//  • Google Drive link → embedded Drive player
//  • direct file (.mp4 etc.) → native HTML5 video
export function parseVideo(url: string): { kind: 'youtube' | 'drive' | 'file'; src: string } {
  const u = (url || '').trim()

  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/)
  if (yt) return { kind: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}` }

  if (u.includes('drive.google.com')) {
    const dr = u.match(/\/file\/d\/([\w-]+)/) || u.match(/[?&]id=([\w-]+)/)
    if (dr) return { kind: 'drive', src: `https://drive.google.com/file/d/${dr[1]}/preview` }
  }

  return { kind: 'file', src: u }
}

export default function VideoPlayer({
  url,
  videoRef,
}: {
  url: string
  videoRef: RefObject<HTMLVideoElement>
}) {
  const { kind, src } = parseVideo(url)

  if (kind === 'file') {
    return (
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        className="w-full rounded-2xl bg-black aspect-video"
      />
    )
  }

  // YouTube / Google Drive → embedded iframe player
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <iframe
        src={src}
        className="w-full h-full"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        title="Lesson video"
      />
    </div>
  )
}
