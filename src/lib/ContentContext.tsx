import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import { LOCAL_COURSES, flattenVideos, type Course, type FlatVideo, type Unit } from '../data/content'

type UnitWithCourse = Unit & { courseId: string; courseName: string }

interface ContentCtx {
  courses: Course[]
  loading: boolean
  usingStarter: boolean // true = built-in content (not yet imported into the DB)
  videos: FlatVideo[]
  getCourse: (id: string) => Course | undefined
  getUnit: (id: string) => UnitWithCourse | undefined
  getVideo: (id: string) => FlatVideo | undefined
  search: (q: string) => FlatVideo[]
  // owner-only writes:
  saveCourses: (courses: Course[]) => Promise<void>
  seed: () => Promise<void>
}

const Ctx = createContext<ContentCtx | null>(null)
const CONTENT_DOC = doc(db, 'content', 'main')

export function ContentProvider({ children }: { children: ReactNode }) {
  const [dbCourses, setDbCourses] = useState<Course[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onSnapshot(
      CONTENT_DOC,
      (snap) => {
        const data = snap.data()
        setDbCourses(snap.exists() && Array.isArray(data?.courses) ? (data!.courses as Course[]) : null)
        setLoading(false)
      },
      (err) => {
        console.warn('Content load failed — showing starter content.', err)
        setDbCourses(null)
        setLoading(false)
      }
    )
  }, [])

  const usingStarter = dbCourses === null
  const courses = dbCourses ?? LOCAL_COURSES
  const videos = useMemo(() => flattenVideos(courses), [courses])

  const value: ContentCtx = {
    courses,
    loading,
    usingStarter,
    videos,
    getCourse: (id) => courses.find((c) => c.id === id),
    getUnit: (id) => {
      for (const c of courses) {
        const u = c.units.find((x) => x.id === id)
        if (u) return { ...u, courseId: c.id, courseName: c.name }
      }
      return undefined
    },
    getVideo: (id) => videos.find((v) => v.id === id),
    search: (q) => {
      const query = q.trim().toLowerCase()
      if (!query) return []
      return videos.filter((v) =>
        [v.title, v.description, v.unitName, v.courseName, ...v.tags].join(' ').toLowerCase().includes(query)
      )
    },
    saveCourses: async (next) => { await setDoc(CONTENT_DOC, { courses: next }) },
    seed: async () => { await setDoc(CONTENT_DOC, { courses: LOCAL_COURSES }) },
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useContent(): ContentCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useContent must be used within ContentProvider')
  return c
}
