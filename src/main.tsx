import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './lib/UserContext'
import { AuthProvider } from './lib/AuthContext'
import { ContentProvider } from './lib/ContentContext'
import './index.css'

// HashRouter keeps deep links working on any static host (no server config needed).
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ContentProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ContentProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
)
