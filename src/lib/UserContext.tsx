import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { loadUser, saveUser, mergeUserData, type UserData } from './store'
import { db } from './firebase'
import { useContent } from './ContentContext'
import { useAuth } from './AuthContext'

interface Ctx {
  user: UserData
  syncing: boolean
  toggleBookmark: (id: string) => void
  rate: (id: string, stars: number) => void
  addReflection: (id: string, text: string) => void
  markCompleted: (id: string, correct: number, total: number) => void
  toggleLikeShort: (id: string) => void
  toggleSaveShort: (id: string) => void
  reset: () => void
}

const UserCtx = createContext<Ctx | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: account } = useAuth()
  const { getVideo } = useContent()
  const [user, setUser] = useState<UserData>(() => loadUser())
  const [syncing, setSyncing] = useState(false)

  // When someone logs in/out, sync their progress with the cloud.
  useEffect(() => {
    let cancelled = false

    async function sync() {
      if (!account) {
        // Logged out → local-only progress.
        setUser(loadUser())
        return
      }
      setSyncing(true)
      const ref = doc(db, 'users', account.uid)
      const local = loadUser()
      try {
        const snap = await getDoc(ref)
        const merged = snap.exists()
          ? mergeUserData(snap.data() as UserData, local) // keep cloud + anything done before login
          : local
        if (!cancelled) {
          setUser(merged)
          saveUser(merged)
        }
        await setDoc(ref, merged) // create or update the cloud copy
      } catch (e) {
        // Firestore not ready / offline → fall back to local so the app still works.
        console.warn('Cloud progress unavailable, using this device only.', e)
        if (!cancelled) setUser(local)
      } finally {
        if (!cancelled) setSyncing(false)
      }
    }

    sync()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.uid])

  // Apply a change: update state, cache locally, and (if logged in) save to the cloud.
  const update = useCallback((fn: (u: UserData) => UserData) => {
    setUser((prev) => {
      const next = fn(prev)
      saveUser(next)
      if (account) {
        setDoc(doc(db, 'users', account.uid), next).catch((e) =>
          console.warn('Cloud save failed (kept locally).', e)
        )
      }
      return next
    })
  }, [account])

  const toggleBookmark = useCallback((id: string) => update((u) => ({
    ...u,
    bookmarks: u.bookmarks.includes(id) ? u.bookmarks.filter((x) => x !== id) : [...u.bookmarks, id],
  })), [update])

  const rate = useCallback((id: string, stars: number) => update((u) => ({
    ...u, ratings: { ...u.ratings, [id]: stars },
  })), [update])

  const toggleLikeShort = useCallback((id: string) => update((u) => ({
    ...u,
    likedShorts: (u.likedShorts ?? []).includes(id)
      ? (u.likedShorts ?? []).filter((x) => x !== id) : [...(u.likedShorts ?? []), id],
  })), [update])

  const toggleSaveShort = useCallback((id: string) => update((u) => ({
    ...u,
    savedShorts: (u.savedShorts ?? []).includes(id)
      ? (u.savedShorts ?? []).filter((x) => x !== id) : [...(u.savedShorts ?? []), id],
  })), [update])

  const addReflection = useCallback((id: string, text: string) => {
    // Save to the student's own record (shown back to them on the lesson).
    update((u) => ({
      ...u, reflections: { ...u.reflections, [id]: [text, ...(u.reflections[id] ?? [])] },
    }))
    // Also send it to the shared collection so owners can read it in the Admin area.
    if (account) {
      const v = getVideo(id)
      addDoc(collection(db, 'reflections'), {
        userId: account.uid,
        userName: account.displayName ?? '',
        userEmail: account.email ?? '',
        videoId: id,
        videoTitle: v?.title ?? id,
        courseName: v?.courseName ?? '',
        unitName: v?.unitName ?? '',
        text,
        createdAt: serverTimestamp(),
      }).catch((e) => console.warn('Reflection not sent to admin (kept locally).', e))
    }
  }, [update, account, getVideo])

  const markCompleted = useCallback((id: string, correct: number, total: number) => update((u) => ({
    ...u,
    quizScores: { ...u.quizScores, [id]: { correct, total } },
    completed: u.completed.includes(id) ? u.completed : [...u.completed, id],
  })), [update])

  const reset = useCallback(() => update(() => ({
    completed: [], bookmarks: [], ratings: {}, reflections: {}, quizScores: {}, likedShorts: [], savedShorts: [],
  })), [update])

  return (
    <UserCtx.Provider value={{ user, syncing, toggleBookmark, rate, addReflection, markCompleted, toggleLikeShort, toggleSaveShort, reset }}>
      {children}
    </UserCtx.Provider>
  )
}

export function useUser(): Ctx {
  const c = useContext(UserCtx)
  if (!c) throw new Error('useUser must be inside UserProvider')
  return c
}
