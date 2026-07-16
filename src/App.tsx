import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LevelPage from './pages/Level'
import VideoPage from './pages/Video'
import Bookmarks from './pages/Bookmarks'
import Search from './pages/Search'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unit/:unitId" element={<LevelPage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  )
}
