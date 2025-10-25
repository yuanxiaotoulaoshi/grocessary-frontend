import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import GlossaryList from '../pages/GlossaryList'
import MyChunk from '../pages/MyChunk'
// import IntensiveListening from '../pages/IntensiveListening'
import IntensiveListening from '../pages/Intensive/IntensiveContainer'
import Collect from '../pages/Collect/CollectContainer'
import Layout from './layout'
import { useTheme } from '../hooks/useTheme'

export default function App() {
    useTheme();
    return (
        <Router>
            <Layout>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/glossary" element={<GlossaryList />} />
                <Route path="/glossary/popular" element={<MyChunk />} />
                <Route path="/glossary/listening" element={<IntensiveListening />} />
                <Route path="/collect" element={<Collect />} />
                </Routes>
            </Layout>
        </Router>
    )
}
