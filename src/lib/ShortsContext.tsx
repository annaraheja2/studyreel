import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface Short {
  id: string
  title: string
  videoURL: string
  creatorName?: string
  createdAt?: { seconds: number } | null
}

interface Ctx {
  shorts: Short[]
  loading: boolean
  addShort: (data: { title: string; videoURL: string; creatorName: string }) => Promise<void>
  deleteShort: (id: string) => Promise<void>
}

const ShortsCtx = createContext<Ctx | null>(null)

export function ShortsProvider({ children }: { children: ReactNode }) {
  const [shorts, setShorts] = useState<Short[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'shorts'), orderBy('createdAt', 'desc'))
    return onSnapshot(
      q,
      (snap) => {
        setShorts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Short, 'id'>) })))
        setLoading(false)
      },
      (err) => { console.warn('Shorts load failed.', err); setLoading(false) }
    )
  }, [])

  const addShort: Ctx['addShort'] = async (data) => {
    await addDoc(collection(db, 'shorts'), { ...data, createdAt: serverTimestamp() })
  }
  const deleteShort: Ctx['deleteShort'] = async (id) => {
    await deleteDoc(doc(db, 'shorts', id))
  }

  return <ShortsCtx.Provider value={{ shorts, loading, addShort, deleteShort }}>{children}</ShortsCtx.Provider>
}

export function useShorts(): Ctx {
  const c = useContext(ShortsCtx)
  if (!c) throw new Error('useShorts must be used within ShortsProvider')
  return c
}
