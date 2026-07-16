import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { loadUser, saveUser, type UserData } from './store'

interface Ctx {
  user: UserData
  toggleBookmark: (id: string) => void
  rate: (id: string, stars: number) => void
  addReflection: (id: string, text: string) => void
  markCompleted: (id: string, correct: number, total: number) => void
  reset: () => void
}

const UserCtx = createContext<Ctx | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(() => loadUser())

  const update = useCallback((fn: (u: UserData) => UserData) => {
    setUser((prev) => {
      const next = fn(prev)
      saveUser(next)
      return next
    })
  }, [])

  const toggleBookmark = useCallback((id: string) => update((u) => ({
    ...u,
    bookmarks: u.bookmarks.includes(id) ? u.bookmarks.filter((x) => x !== id) : [...u.bookmarks, id],
  })), [update])

  const rate = useCallback((id: string, stars: number) => update((u) => ({
    ...u, ratings: { ...u.ratings, [id]: stars },
  })), [update])

  const addReflection = useCallback((id: string, text: string) => update((u) => ({
    ...u, reflections: { ...u.reflections, [id]: [text, ...(u.reflections[id] ?? [])] },
  })), [update])

  const markCompleted = useCallback((id: string, correct: number, total: number) => update((u) => ({
    ...u,
    quizScores: { ...u.quizScores, [id]: { correct, total } },
    completed: u.completed.includes(id) ? u.completed : [...u.completed, id],
  })), [update])

  const reset = useCallback(() => update(() => ({
    completed: [], bookmarks: [], ratings: {}, reflections: {}, quizScores: {},
  })), [update])

  return (
    <UserCtx.Provider value={{ user, toggleBookmark, rate, addReflection, markCompleted, reset }}>
      {children}
    </UserCtx.Provider>
  )
}

export function useUser(): Ctx {
  const c = useContext(UserCtx)
  if (!c) throw new Error('useUser must be inside UserProvider')
  return c
}
