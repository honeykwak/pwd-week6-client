import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';
import styled from '@emotion/styled';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

/**
 * 로그인되지 않은 사용자만 접근할 수 있는 페이지를 보호하는 컴포넌트
 * (로그인/회원가입 페이지용)
 */
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#667eea" size={50} />
        <LoadingText>로딩 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 이미 로그인된 경우 대시보드로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // 로그인되지 않은 경우 자식 컴포넌트 렌더링
  return children;
};

export default PublicOnlyRoute;

