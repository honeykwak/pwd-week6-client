import axios from 'axios';
import { environment } from '../config/environment';

// Axios 인스턴스 생성
const authApiInstance = axios.create({
  baseURL: `${environment.API_URL}/api/auth`,
  withCredentials: true, // 쿠키 포함 요청
  timeout: 10000,
});

// 요청 인터셉터 - 쿠키 자동 포함
authApiInstance.interceptors.request.use(
  (config) => {
    // withCredentials: true로 설정되어 있어 쿠키가 자동으로 포함됨
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 세션 만료 처리
authApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 에러이고, 현재 로그인 페이지가 아닐 때만 리다이렉트
    if (error.response?.status === 401) {
      const currentPath = window.location.hash.replace('#', '') || window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        console.log('세션 만료, 로그인 페이지로 이동');
        window.location.href = '/#/login';
      }
    }
    return Promise.reject(error);
  }
);

// 인증 관련 API 함수들
export const authApi = {
  // 회원가입
  register: (name, email, password) => 
    authApiInstance.post('/register', { name, email, password }),

  // 로그인
  login: (email, password) => 
    authApiInstance.post('/login', { email, password }),

  // 로그아웃
  logout: () => 
    authApiInstance.post('/logout'),

  // 현재 사용자 정보 조회
  getCurrentUser: () => 
    authApiInstance.get('/me'),

  // 관리자 전용 API
  admin: {
    // 모든 사용자 목록 조회
    getUsers: () => 
      authApiInstance.get('/admin/users'),
    
    // 사용자 권한 변경
    updateUserType: (userId, userType) => 
      authApiInstance.put(`/admin/users/${userId}`, { userType }),
    
    // 사용자 삭제
    deleteUser: (userId) => 
      authApiInstance.delete(`/admin/users/${userId}`)
  }
};

export default authApi;
