import { useRef, useState } from 'react'
import { uploadVideoToCloudinary, cloudinaryReady } from '../lib/cloudinary'

// Drag-and-drop (or click-to-pick) video uploader. Calls onUploaded with the URL.
export default function VideoUpload({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [pct, setPct] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file?: File) {
    if (!file) return
    if (!file.type.startsWith('video/')) { setError('Please choose a video file.'); return }
    setError(''); setDone(false); setPct(0)
    try {
      const url = await uploadVideoToCloudinary(file, setPct)
      onUploaded(url)
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.')
    } finally {
      setPct(null)
    }
  }

  if (!cloudinaryReady) {
    return <p className="text-xs text-[#6E6459]">Drag-and-drop upload isn’t connected yet.</p>
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) }}
        className="border-2 border-dashed border-[#D8CCB9] rounded-xl p-4 text-center text-sm text-[#6E6459] cursor-pointer hover:border-brand-400 hover:bg-[#F1EBDF] transition"
      >
        <input ref={inputRef} type="file" accept="video/*" className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])} />
        {pct !== null ? (
          <span>Uploading… {pct}%</span>
        ) : done ? (
          <span className="text-green-600">✓ Uploaded! Link filled in above — remember to Save.</span>
        ) : (
          <span>⬆️ Drag a video file here, or click to choose one</span>
        )}
      </div>
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  )
}
