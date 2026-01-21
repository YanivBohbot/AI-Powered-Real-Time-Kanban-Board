import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/protectedRoute'; // Ensure path is correct
import Login from './pages/LoginPAge';
import Dashboard from './pages/DashBoard'; // 👈 Import the real Dashboard
import Board from './pages/Board';         // 👈 Import the Board page

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* 🔒 Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* 👇 Now using the real components */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/board/:boardId" element={<Board />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}