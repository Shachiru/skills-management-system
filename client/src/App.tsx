import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

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
                        <Route path="/personnel" element={<div><h1>Personnel List (Coming Soon)</h1></div>}/>
                        <Route path="/skills" element={<div><h1>Skills Catalog (Coming Soon)</h1></div>}/>
                        <Route path="/projects" element={<div><h1>Project Matching (Coming Soon)</h1></div>}/>
                    </Route>

                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;