// Shared content types used by every course file.

export interface Question {
  text: string
  options: string[]
  correct: number // index of the correct option (0-based)
  explanation: string
  difficulty: number // 1..5
}

export interface Lesson {
  id: string
  title: string
  description: string
  videoURL: string // "https://…" link or "videos/myfile.mp4" in public/videos
  difficulty: number
  tags: string[]
  questions: Question[]
}

export interface Unit {
  id: string
  name: string
  description: string
  emoji: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  name: string
  description: string
  emoji: string
  units: Unit[]
}

// Placeholder sample clips so the app works out of the box.
// Replace each lesson's videoURL with your own link or a file in public/videos.
export const SAMPLE = {
  a: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  b: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  c: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  d: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  e: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  f: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
}
