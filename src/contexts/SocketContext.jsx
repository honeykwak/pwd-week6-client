// src/contexts/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // 로그인 상태일 때만 소켓 연결
    if (isAuthenticated && user) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const newSocket = io(apiUrl, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      newSocket.on('connect', () => {
        console.log('✅ Socket.io 연결 성공');
        setConnected(true);
      });

      newSocket.on('connected', (data) => {
        console.log('📡 Socket.io 초기화:', data.message);
      });

      newSocket.on('notification', (notification) => {
        console.log('🔔 새 알림:', notification);
        
        // 알림 목록에 추가
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);

        // Toast 알림 표시
        toast.info(notification.title, {
          position: 'top-right',
          autoClose: 5000,
          onClick: () => {
            if (notification.link) {
              window.location.hash = notification.link;
            }
          },
        });
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket.io 연결 끊김');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket.io 연결 오류:', error);
        setConnected(false);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
        setConnected(false);
      };
    } else {
      // 로그아웃 시 소켓 정리
      if (socket) {
        socket.close();
        setSocket(null);
        setConnected(false);
        setNotifications([]);
        setUnreadCount(0);
      }
    }
  }, [isAuthenticated, user]);

  const value = {
    socket,
    connected,
    notifications,
    unreadCount,
    setUnreadCount,
    setNotifications,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

