// src/pages/ProfilePage.jsx
import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';
import api from '../services/api';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: '파일 크기는 5MB 이하여야 합니다.' });
      return;
    }

    // 이미지 파일 체크
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: '이미지 파일만 업로드 가능합니다.' });
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUser(response.data.data.user);
        setMessage({ type: 'success', text: '프로필 이미지가 업로드되었습니다.' });
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || '이미지 업로드에 실패했습니다.' 
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAvatar = async () => {
    if (!window.confirm('프로필 이미지를 삭제하시겠습니까?')) {
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.delete('/users/avatar');

      if (response.data.success) {
        setUser(response.data.data.user);
        setMessage({ type: 'success', text: '프로필 이미지가 삭제되었습니다.' });
      }
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || '이미지 삭제에 실패했습니다.' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container>
      <Title>프로필 설정</Title>

      {message.text && (
        <Message type={message.type}>{message.text}</Message>
      )}

      <ProfileSection>
        <AvatarWrapper>
          {user?.avatar ? (
            <Avatar src={user.avatar} alt="프로필 이미지" />
          ) : (
            <DefaultAvatar>{user?.name?.charAt(0).toUpperCase() || 'U'}</DefaultAvatar>
          )}
        </AvatarWrapper>

        <ButtonGroup>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <UploadButton
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? '업로드 중...' : '이미지 업로드'}
          </UploadButton>

          {user?.avatar && (
            <DeleteButton
              onClick={handleDeleteAvatar}
              disabled={uploading}
            >
              이미지 삭제
            </DeleteButton>
          )}
        </ButtonGroup>
      </ProfileSection>

      <InfoSection>
        <InfoItem>
          <Label>이름</Label>
          <Value>{user?.name}</Value>
        </InfoItem>

        <InfoItem>
          <Label>이메일</Label>
          <Value>{user?.email}</Value>
        </InfoItem>

        <InfoItem>
          <Label>가입 방법</Label>
          <Value>
            {user?.provider === 'local' ? '이메일' : 
             user?.provider === 'google' ? 'Google' :
             user?.provider === 'naver' ? 'Naver' : user?.provider}
          </Value>
        </InfoItem>

        <InfoItem>
          <Label>계정 유형</Label>
          <Value>{user?.userType === 'admin' ? '관리자' : '일반 사용자'}</Value>
        </InfoItem>
      </InfoSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;

const Message = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const AvatarWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DefaultAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  border: 4px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const UploadButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #45a049;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #da190b;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const InfoSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #666;
`;

const Value = styled.span`
  color: #1a1a1a;
`;

export default ProfilePage;

