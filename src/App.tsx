import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AssessmentProvider } from './context/AssessmentContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import AssessmentResult from './pages/AssessmentResult'
import UseCaseGenerator from './pages/UseCaseGenerator'
import ROISimulator from './pages/ROISimulator'
import Playbooks from './pages/Playbooks'
import Dashboard from './pages/Dashboard'

function App() {
    return (
        <AssessmentProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/assessment" element={<Assessment />} />
                        <Route path="/assessment/result" element={<AssessmentResult />} />
                        <Route path="/use-cases" element={<UseCaseGenerator />} />
                        <Route path="/roi" element={<ROISimulator />} />
                        <Route path="/playbooks" element={<Playbooks />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </Router>
        </AssessmentProvider>
    )
}

export default App
