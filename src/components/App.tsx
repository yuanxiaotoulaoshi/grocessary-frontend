import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useTheme } from 'hooks/useTheme'
import Home from 'pages/Home'
import Login from 'pages/Login/LoginContainer'
import Register from 'pages/Register/RegisterContainer'
import GlossaryList from 'pages/GlossaryList'
import IntensiveListening from 'pages/Intensive/IntensiveContainer'
import Collect from 'pages/Collect/CollectContainer'
import Layout from './layout'
import '../locales'


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
                <Route path="/glossary/listening" element={<IntensiveListening />} />
                <Route path="/collect" element={<Collect />} />
                </Routes>
            </Layout>
        </Router>
    )
}
