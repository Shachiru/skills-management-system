import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Personnel from "./pages/Personnel";
import ProjectMatching from "./pages/ProjectMatching";
import Skills from "./pages/Skills";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login/>
                        </PublicRoute>
                    }/>
                    <Route path="/signup" element={
                        <PublicRoute>
                            <Signup/>
                        </PublicRoute>
                    }/>

                    <Route element={
                        <ProtectedRoute>
                            <Layout/>
                        </ProtectedRoute>
                    }>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/personnel" element={<Personnel/>}/>
                        <Route path="/skills" element={<Skills />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/project-matching" element={<ProjectMatching/>}/>
                        <Route path="/analytics" element={<Analytics/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;