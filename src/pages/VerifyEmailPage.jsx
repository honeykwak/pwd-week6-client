// src/pages/VerifyEmailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import api from '../services/api';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('이메일을 인증하는 중...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/api/auth/verify-email/${token}`);

        if (response.data.success) {
          setStatus('success');
          setMessage('이메일 인증이 완료되었습니다! 🎉');
          
          // 3초 후 대시보드로 이동
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(response.data.message || '인증에 실패했습니다.');
        }
      } catch (error) {
        console.error('이메일 인증 오류:', error);
        setStatus('error');
        setMessage(
          error.response?.data?.message || '유효하지 않거나 만료된 인증 링크입니다.'
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('유효하지 않은 인증 링크입니다.');
    }
  }, [token, navigate]);

  return (
    <Container>
      <Card>
        {status === 'loading' && (
          <>
            <IconWrapper status="loading">
              <FaSpinner className="spin" size={64} />
            </IconWrapper>
            <Title>이메일 인증 중...</Title>
            <Message>{message}</Message>
          </>
        )}

        {status === 'success' && (
          <>
            <IconWrapper status="success">
              <FaCheckCircle size={64} />
            </IconWrapper>
            <Title>인증 완료!</Title>
            <Message>{message}</Message>
            <Message>잠시 후 대시보드로 이동합니다...</Message>
            <Button onClick={() => navigate('/dashboard')}>
              지금 이동하기
            </Button>
          </>
        )}

        {status === 'error' && (
          <>
            <IconWrapper status="error">
              <FaTimesCircle size={64} />
            </IconWrapper>
            <Title>인증 실패</Title>
            <Message>{message}</Message>
            <ButtonGroup>
              <Button onClick={() => navigate('/dashboard')}>
                대시보드로 이동
              </Button>
              <Button secondary onClick={() => navigate('/login')}>
                로그인 페이지로
              </Button>
            </ButtonGroup>
          </>
        )}
      </Card>
    </Container>
  );
};

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const IconWrapper = styled.div`
  margin-bottom: 1.5rem;
  color: ${props => {
    if (props.status === 'success') return '#4CAF50';
    if (props.status === 'error') return '#f44336';
    return '#667eea';
  }};

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.secondary ? '#f5f5f5' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: ${props => props.secondary ? '#666' : 'white'};
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 150px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export default VerifyEmailPage;

