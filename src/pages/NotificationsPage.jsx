// src/pages/NotificationsPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaBell, FaCheck, FaTrash, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { useSocket } from '../contexts/SocketContext';
import { toast } from 'react-toastify';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { setUnreadCount, setNotifications } = useSocket();
  const [notifications, setLocalNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread

  // 알림 목록 가져오기
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/notifications', {
        params: { unreadOnly: filter === 'unread' },
      });

      if (response.data.success) {
        setLocalNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (error) {
      console.error('알림 불러오기 실패:', error);
      toast.error('알림을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  // 알림 읽음 처리
  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(`/api/notifications/${notificationId}/read`);
      fetchNotifications();
      toast.success('알림을 읽음 처리했습니다.');
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
      toast.error('알림 읽음 처리에 실패했습니다.');
    }
  };

  // 모든 알림 읽음 처리
  const handleMarkAllAsRead = async () => {
    try {
      await api.put('/api/notifications/read-all');
      fetchNotifications();
      setUnreadCount(0);
      toast.success('모든 알림을 읽음 처리했습니다.');
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
      toast.error('알림 읽음 처리에 실패했습니다.');
    }
  };

  // 알림 삭제
  const handleDelete = async (notificationId) => {
    if (!window.confirm('이 알림을 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/api/notifications/${notificationId}`);
      fetchNotifications();
      toast.success('알림이 삭제되었습니다.');
    } catch (error) {
      console.error('알림 삭제 실패:', error);
      toast.error('알림 삭제에 실패했습니다.');
    }
  };

  // 알림 클릭 시 링크로 이동
  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  // 알림 타입별 아이콘
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'submission_approved':
        return '🎉';
      case 'submission_rejected':
        return '❌';
      case 'new_submission':
        return '📝';
      case 'popular_restaurant':
        return '🔥';
      default:
        return '🔔';
    }
  };

  // 시간 포맷팅
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR');
  };

  return (
    <Container>
      <Header>
        <Title>
          <FaBell /> 알림
        </Title>
        <Actions>
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            전체
          </FilterButton>
          <FilterButton active={filter === 'unread'} onClick={() => setFilter('unread')}>
            읽지 않음
          </FilterButton>
          <MarkAllButton onClick={handleMarkAllAsRead}>
            <FaCheck /> 모두 읽음
          </MarkAllButton>
        </Actions>
      </Header>

      {loading ? (
        <LoadingMessage>알림을 불러오는 중...</LoadingMessage>
      ) : notifications.length === 0 ? (
        <EmptyMessage>
          <FaBell size={48} />
          <p>{filter === 'unread' ? '읽지 않은 알림이 없습니다.' : '알림이 없습니다.'}</p>
        </EmptyMessage>
      ) : (
        <NotificationList>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              unread={!notification.isRead}
              onClick={() => handleNotificationClick(notification)}
            >
              <NotificationIcon>{getNotificationIcon(notification.type)}</NotificationIcon>
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <NotificationTime>{formatTime(notification.createdAt)}</NotificationTime>
              </NotificationContent>
              <NotificationActions onClick={(e) => e.stopPropagation()}>
                {!notification.isRead && (
                  <ActionButton
                    onClick={() => handleMarkAsRead(notification._id)}
                    title="읽음 처리"
                  >
                    <FaCheck />
                  </ActionButton>
                )}
                <ActionButton
                  onClick={() => handleDelete(notification._id)}
                  title="삭제"
                  danger
                >
                  <FaTrash />
                </ActionButton>
              </NotificationActions>
            </NotificationItem>
          ))}
        </NotificationList>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1a1a1a;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e0e0e0'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const MarkAllButton = styled.button`
  padding: 0.5rem 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #45a049;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #999;

  svg {
    margin-bottom: 1rem;
    color: #ddd;
  }

  p {
    font-size: 1.1rem;
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1.25rem;
  background: ${props => props.unread ? '#f0f4ff' : 'white'};
  border: 1px solid ${props => props.unread ? '#667eea' : '#e0e0e0'};
  border-left: 4px solid ${props => props.unread ? '#667eea' : '#e0e0e0'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NotificationIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1a1a1a;
`;

const NotificationMessage = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const NotificationTime = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  background: ${props => props.danger ? '#f44336' : '#4CAF50'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

export default NotificationsPage;

