import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';
import { FaUser, FaEnvelope, FaCrown, FaSignOutAlt, FaCog, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
`;

const UserName = styled.h1`
  color: #333;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const UserTypeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => props.isAdmin ? '#ff6b6b' : '#667eea'};
  color: white;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const InfoCard = styled.div`
  padding: 1.5rem;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const InfoTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoValue = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  &.secondary {
    background: #f8f9ff;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
    }
  }
  
  &.danger {
    background: #ff6b6b;
    color: white;
    
    &:hover {
      background: #ff5252;
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #ff6b6b;
  background: white;
  color: #ff6b6b;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  
  &:hover {
    background: #ff6b6b;
    color: white;
  }
`;

const EmailVerificationStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => props.verified ? '#e8f5e9' : '#fff3e0'};
  color: ${props => props.verified ? '#2e7d32' : '#f57c00'};
`;

const VerificationAlert = styled.div`
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
  border-left: 4px solid #f57c00;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const AlertContent = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  flex: 1;

  svg {
    color: #f57c00;
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }
`;

const AlertTitle = styled.h3`
  color: #e65100;
  margin-bottom: 0.25rem;
  font-size: 1rem;
`;

const AlertMessage = styled.p`
  color: #ef6c00;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ResendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #f57c00;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #ef6c00;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

function DashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const [resending, setResending] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleResendVerification = async () => {
    try {
      setResending(true);
      const response = await api.post('/api/auth/resend-verification');
      if (response.data.success) {
        toast.success('인증 이메일이 재전송되었습니다. 이메일을 확인해주세요.');
      }
    } catch (error) {
      console.error('인증 이메일 재전송 실패:', error);
      toast.error(error.response?.data?.message || '인증 이메일 재전송에 실패했습니다.');
    } finally {
      setResending(false);
    }
  };

  return (
    <DashboardContainer>
      <Header>
        <Avatar>
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
        <UserName>{user?.name || '사용자'}</UserName>
        <UserEmail>{user?.email}</UserEmail>
        <UserTypeBadge isAdmin={isAdmin()}>
          <FaCrown />
          {isAdmin() ? '관리자' : '일반 사용자'}
        </UserTypeBadge>

        {user?.provider === 'local' && (
          <EmailVerificationStatus verified={user?.emailVerified}>
            {user?.emailVerified ? (
              <>
                <FaCheckCircle /> 이메일 인증 완료
              </>
            ) : (
              <>
                <FaExclamationCircle /> 이메일 인증 필요
              </>
            )}
          </EmailVerificationStatus>
        )}
      </Header>

      {user?.provider === 'local' && !user?.emailVerified && (
        <VerificationAlert>
          <AlertContent>
            <FaExclamationCircle />
            <div>
              <AlertTitle>이메일 인증이 필요합니다</AlertTitle>
              <AlertMessage>
                회원가입 시 발송된 이메일을 확인하여 인증을 완료해주세요.
              </AlertMessage>
            </div>
          </AlertContent>
          <ResendButton onClick={handleResendVerification} disabled={resending}>
            {resending ? '전송 중...' : '인증 이메일 재전송'}
          </ResendButton>
        </VerificationAlert>
      )}

      <InfoGrid>
        <InfoCard>
          <InfoTitle>
            <FaUser />
            계정 정보
          </InfoTitle>
          <InfoValue>
            가입일: {new Date(user?.createdAt).toLocaleDateString() || ''}
          </InfoValue>
        </InfoCard>

        <InfoCard>
          <InfoTitle>
            <FaEnvelope />
            연락처
          </InfoTitle>
          <InfoValue>{user?.email}</InfoValue>
        </InfoCard>
      </InfoGrid>

      <ActionButtons>
        <ActionButton to="/submit" className="primary">
          <FaCog />
          맛집 제보하기
        </ActionButton>
        
        <ActionButton to="/list" className="secondary">
          <FaUser />
          맛집 둘러보기
        </ActionButton>
        
        {isAdmin() && (
          <ActionButton to="/admin" className="secondary">
            <FaCrown />
            관리자 페이지
          </ActionButton>
        )}
        
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          로그아웃
        </LogoutButton>
      </ActionButtons>
    </DashboardContainer>
  );
}

export default DashboardPage;
