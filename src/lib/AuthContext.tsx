import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { isAdminEmail } from './admins'

interface AuthCtx {
  user: User | null
  ready: boolean // true once Firebase has reported the initial auth state
  isAdmin: boolean
  signUp: (name: string, email: string, password: string) => Promise<void>
  logIn: (email: string, password: string) => Promise<void>
  logInWithGoogle: () => Promise<void>
  logOut: () => Promise<void>
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setReady(true)
    })
  }, [])

  const signUp = async (name: string, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) await updateProfile(cred.user, { displayName: name })
    setUser({ ...cred.user } as User) // reflect the new display name immediately
  }

  const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const logInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  const logOut = async () => {
    await signOut(auth)
  }

  return (
    <Ctx.Provider
      value={{
        user,
        ready,
        isAdmin: isAdminEmail(user?.email),
        signUp,
        logIn,
        logInWithGoogle,
        logOut,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useAuth(): AuthCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth must be used within AuthProvider')
  return c
}

// Turns Firebase error codes into friendly messages.
export function friendlyAuthError(e: unknown): string {
  const code = (e as { code?: string })?.code ?? ''
  switch (code) {
    case 'auth/invalid-email': return 'That email address looks invalid.'
    case 'auth/email-already-in-use': return 'An account with that email already exists — try logging in.'
    case 'auth/weak-password': return 'Password should be at least 6 characters.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found': return 'Wrong email or password.'
    case 'auth/popup-closed-by-user': return 'Sign-in was cancelled.'
    case 'auth/unauthorized-domain': return 'This website isn’t authorized for Google sign-in yet.'
    default: return 'Something went wrong. Please try again.'
  }
}
