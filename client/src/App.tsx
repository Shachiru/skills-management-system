import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/personnel" element={<div><h1>Personnel List (Coming Soon)</h1></div>} />
                    <Route path="/skills" element={<div><h1>Skills Catalog (Coming Soon)</h1></div>} />
                    <Route path="/projects" element={<div><h1>Project Matching (Coming Soon)</h1></div>} />
                </Route>

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;