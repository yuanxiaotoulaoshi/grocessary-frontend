import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import GlossaryList from '../pages/Glossary/GlossaryList'
import GlossaryDetail from '../pages/Glossary/GlossaryDetail'
import GlossaryListening from '../pages/Glossary/GlossaryListening'
import Collect from '../pages/Collect'
import Layout from './layout'
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/glossary" element={<GlossaryList />} />
          <Route path="/glossary/popular" element={<GlossaryDetail />} />
          <Route path="/glossary/listening" element={<GlossaryListening />} />
          <Route path="/collect" element={<Collect />} />
        </Routes>
      </Layout>
    </Router>
  )
}
