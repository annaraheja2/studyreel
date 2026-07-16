// Progress persistence (localStorage) + adaptive quiz engine.

import { VIDEOS, getVideo, type Question } from '../data/content'

export interface UserData {
  completed: string[] // video ids passed
  bookmarks: string[]
  ratings: Record<string, number> // videoId -> stars
  reflections: Record<string, string[]> // videoId -> notes
  quizScores: Record<string, { correct: number; total: number }>
}

const KEY = 'studyreel:user'

const DEFAULT: UserData = {
  completed: [], bookmarks: [], ratings: {}, reflections: {}, quizScores: {},
}

export function loadUser(): UserData {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT }
  } catch {
    return { ...DEFAULT }
  }
}

export function saveUser(u: UserData) {
  localStorage.setItem(KEY, JSON.stringify(u))
}

export function overallProgress(u: UserData): number {
  return VIDEOS.length ? u.completed.length / VIDEOS.length : 0
}

// ---- Adaptive quiz: serve 3 questions, harder after correct, easier after wrong ----

export const QUIZ_LENGTH = 3
export const PASS_THRESHOLD = 2

export interface QuizState {
  pool: Question[]
  used: Set<number>
  served: number[] // indices into pool
  target: number
  answered: number
  correct: number
}

export function startQuiz(videoId: string): QuizState {
  const v = getVideo(videoId)
  const pool = v ? v.questions : []
  const target = clamp(v?.difficulty ?? 2)
  const first = pickClosest(pool, new Set(), target)
  const used = new Set<number>()
  const served: number[] = []
  if (first >= 0) { used.add(first); served.push(first) }
  return { pool, used, served, target, answered: 0, correct: 0 }
}

export function quizCurrent(s: QuizState): Question | undefined {
  const idx = s.served[s.answered]
  return idx === undefined ? undefined : s.pool[idx]
}

export function quizTotal(s: QuizState): number {
  return Math.min(QUIZ_LENGTH, Math.max(s.pool.length, 1))
}

export function quizAnswer(s: QuizState, wasCorrect: boolean): QuizState {
  const target = clamp(s.target + (wasCorrect ? 1 : -1))
  const used = new Set(s.used)
  const served = [...s.served]
  const answered = s.answered + 1
  const correct = s.correct + (wasCorrect ? 1 : 0)
  if (answered < QUIZ_LENGTH) {
    const next = pickClosest(s.pool, used, target)
    if (next >= 0) { used.add(next); served.push(next) }
  }
  return { ...s, used, served, target, answered, correct }
}

export function quizFinished(s: QuizState): boolean {
  return s.answered >= quizTotal(s)
}

export function quizPassed(s: QuizState): boolean {
  return s.correct >= PASS_THRESHOLD
}

function pickClosest(pool: Question[], used: Set<number>, target: number): number {
  let best = -1
  let bestDist = Infinity
  pool.forEach((q, i) => {
    if (used.has(i)) return
    const d = Math.abs(q.difficulty - target)
    if (d < bestDist) { bestDist = d; best = i }
  })
  return best
}

function clamp(n: number): number {
  return Math.max(1, Math.min(5, Math.round(n)))
}
