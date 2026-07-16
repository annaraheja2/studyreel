import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CoursePage from './pages/Course'
import LevelPage from './pages/Level'
import VideoPage from './pages/Video'
import Bookmarks from './pages/Bookmarks'
import Search from './pages/Search'
import Login from './pages/Login'
import Admin from './pages/Admin'
import AdminCourse from './pages/AdminCourse'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/course/:courseId" element={<AdminCourse />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/unit/:unitId" element={<LevelPage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  )
}
