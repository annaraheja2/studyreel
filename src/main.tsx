import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './lib/UserContext'
import { AuthProvider } from './lib/AuthContext'
import { ContentProvider } from './lib/ContentContext'
import { ShortsProvider } from './lib/ShortsContext'
import './index.css'

// HashRouter keeps deep links working on any static host (no server config needed).
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ContentProvider>
          <ShortsProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ShortsProvider>
        </ContentProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
