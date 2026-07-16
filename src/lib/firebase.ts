import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase project config (safe to include in a web app — not secret).
export const firebaseConfig = {
  apiKey: 'AIzaSyCUiYEpDwkN2l004ADMOGy83GvWROJWhic',
  authDomain: 'studyreel-ebb8d.firebaseapp.com',
  projectId: 'studyreel-ebb8d',
  storageBucket: 'studyreel-ebb8d.firebasestorage.app',
  messagingSenderId: '319004527461',
  appId: '1:319004527461:web:291137f4b65e08d4b5af8c',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
