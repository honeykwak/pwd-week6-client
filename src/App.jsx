import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { testConnection } from './utils/connectionTest';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import AdminPage from './pages/AdminPage';
import SubmissionsPage from './pages/SubmissionsPage';
import SubmitPage from './pages/SubmitPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// React Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
});

function App() {
  // 앱 시작 시 연결 테스트
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <HashRouter>
            <GlobalStyles />
            <div className="app">
              <Header />
              <main className="main-content">
              <Routes>
                {/* 공개 라우트 */}
                <Route path="/" element={<HomePage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/restaurant/:id" element={<DetailPage />} />
                <Route path="/popular" element={<PopularPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
                
                {/* 보호된 라우트 (로그인 필요) */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/notifications" 
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/submit" 
                  element={
                    <ProtectedRoute>
                      <SubmitPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/submissions" 
                  element={
                    <AdminRoute>
                      <SubmissionsPage />
                    </AdminRoute>
                  } 
                />
                
                {/* 404 페이지 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="footer">
              <p>© 2025 Ajou Campus Foodmap | Made with React</p>
            </footer>
          </div>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          </HashRouter>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;