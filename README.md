# 📚 PWD Week 6 - Ajou Campus Foodmap Client (완전판)

본 문서는 **인증 시스템이 포함된 완전한 React 웹 애플리케이션**을 단계별로 개발하는 가이드입니다.

## 🧭 개발 전 과정 한눈에 보기
- 0) 목표 정의: 아주대 주변 맛집 탐색/제보 서비스 + 완전한 사용자 인증 시스템
- 1) 개발 환경 준비: Node/npm, Git, MongoDB Atlas, OAuth 설정
- 2) 레포 구성: `pwd-week6-client`(Vite React), `pwd-week6-server`(Express) 분리
- 3) 환경 변수 구성: 클라이언트(`VITE_API_URL`, `VITE_CLIENT_URL`), 서버(`MONGODB_URI`, `CLIENT_URL`, `SESSION_SECRET`, OAuth 키 등)
- 4) 로컬 기동: 서버(5000) → 클라이언트(5173) 순서로 실행, `/health` 및 페이지 확인
- 5) 핵심 기능 구현: 
   - 기본 기능: 라우팅, 맛집 목록/상세/인기/제보
   - 인증 시스템: 회원가입/로그인, 세션 기반 인증, OAuth (Google, Naver)
   - 보호된 라우트: 로그인 필요 페이지, 관리자 전용 페이지
   - 상태관리: React Query, Context API, 전역 상태 관리
- 6) 통합 테스트: 회원가입/로그인/세션, 보호 라우트, 데이터 CRUD, CORS/쿠키 확인
- 7) 배포: Vercel(클라) + Render(서버), 환경변수에 상호 도메인 반영
- 8) 운영: 로그/모니터링, OAuth 콘솔 설정, 보안(HTTPS, SameSite, Secret) 점검

## 📋 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [사전 준비사항](#-사전-준비사항)
3. [프로젝트 시작하기](#-프로젝트-시작하기)
4. [주요 라이브러리 설치](#-주요-라이브러리-설치)
5. [프로젝트 구조](#-프로젝트-구조)
6. [핵심 컴포넌트 구현](#-핵심-컴포넌트-구현)
7. [인증 시스템 구현](#-인증-시스템-구현)
8. [보호된 라우트 구현](#-보호된-라우트-구현)
9. [새로운 페이지 구현](#-새로운-페이지-구현)
10. [상태 관리 구현](#-상태-관리-구현)
11. [배포 설정](#-배포-설정)
12. [테스트 및 검증](#-테스트-및-검증)
13. [트러블슈팅](#-트러블슈팅)

---

## 🎯 프론트엔드 프로젝트 소개

### 만들게 될 React 애플리케이션
**아주 캠퍼스 푸드맵 클라이언트** - 사용자 친화적인 웹 인터페이스를 제공하는 React SPA

### 🎨 **프론트엔드 핵심 기능**

#### 🔐 **클라이언트 인증 관리**
- **로그인/회원가입 폼**: React Hook Form을 활용한 폼 관리
- **소셜 로그인 버튼**: Google, Naver OAuth 연동 UI
- **인증 상태 관리**: Context API로 전역 인증 상태 관리
- **자동 로그인**: 페이지 새로고침 시 세션 복원
- **권한별 UI**: 관리자/일반 사용자 구분된 인터페이스

#### 🍜 **맛집 정보 UI**
- **반응형 맛집 카드**: 모바일/데스크톱 최적화된 카드 레이아웃
- **필터링 인터페이스**: 카테고리, 위치별 필터 UI
- **상세 페이지**: 이미지 갤러리, 지도, 리뷰 섹션
- **인기 맛집 랭킹**: TOP 5 순위 표시 컴포넌트
- **좋아요 애니메이션**: 인터랙티브한 좋아요 버튼

#### 🛡️ **라우트 보호 시스템**
- **ProtectedRoute 컴포넌트**: 로그인 필요 페이지 자동 보호
- **AdminRoute 컴포넌트**: 관리자 전용 페이지 보호
- **자동 리다이렉트**: 권한 없는 접근 시 로그인 페이지로 이동
- **로딩 스피너**: 인증 상태 확인 중 로딩 UI

#### 📱 **사용자 경험 최적화**
- **반응형 디자인**: 모바일 퍼스트 디자인
- **로딩 상태**: React Query를 활용한 스마트 로딩
- **에러 바운더리**: 친화적인 에러 메시지 표시
- **토스트 알림**: 성공/실패 피드백 시스템

### 🛠️ **프론트엔드 기술 스택**

#### **핵심 프레임워크**
- **React 19.1**: 최신 React 기능 (Concurrent Features, Suspense)
- **Vite**: 초고속 개발 서버 및 빌드 도구
- **React Router v7**: 최신 라우팅 시스템

#### **스타일링 & UI**
- **Emotion**: CSS-in-JS 스타일링 솔루션
- **GlobalStyles**: 전역 스타일 관리
- **반응형 디자인**: 모바일/태블릿/데스크톱 대응

#### **상태 관리**
- **Context API**: 인증 상태 전역 관리
- **React Query**: 서버 상태 캐싱 및 동기화
- **useState/useEffect**: 컴포넌트 로컬 상태

#### **폼 관리**
- **React Hook Form**: 성능 최적화된 폼 관리
- **유효성 검사**: 실시간 폼 검증
- **에러 메시지**: 사용자 친화적인 피드백

#### **API 통신**
- **Axios**: HTTP 클라이언트 설정
- **인터셉터**: 자동 토큰 첨부 및 에러 처리
- **CORS 설정**: 서버와의 안전한 통신
- **환경별 API URL**: 자동 환경 감지 및 URL 설정
- **쿠키 기반 인증**: withCredentials 설정으로 세션 공유

#### **고급 기능**
- **React Query**: 서버 상태 캐싱 및 동기화 (5분 staleTime)
- **Toast 알림**: react-toastify 기반 사용자 피드백
- **로딩 스피너**: react-spinners 기반 로딩 UI
- **연결 테스트**: 서버 연결 상태 자동 확인
- **자동 환경 감지**: development/production 환경 자동 설정

---

## ✅ 프론트엔드 개발 환경 준비

### 1. 필수 도구 설치

#### Node.js 설치 확인
```bash
# Node.js 버전 확인 (22.0.0 이상 필요)
node --version

# npm 버전 확인 (11.0.0 이상 필요)
npm --version
```

> ⚠️ Node.js가 없다면 [nodejs.org](https://nodejs.org)에서 LTS 버전을 다운로드하세요.

#### Git 설치 확인
```bash
# Git 버전 확인
git --version
```

> ⚠️ Git이 없다면 [git-scm.com](https://git-scm.com)에서 다운로드하세요.

### 2. 개발 계정 준비
- ✅ [GitHub 계정](https://github.com) (코드 저장 및 버전 관리)
- ✅ [Vercel 계정](https://vercel.com) (프론트엔드 배포 - GitHub 연동)
- ✅ [Google Cloud Console](https://console.cloud.google.com) (Google OAuth 설정)
- ✅ [Naver Developers](https://developers.naver.com) (Naver OAuth 설정)

> 📝 **참고**: 백엔드 서버는 별도로 `pwd-week6-server` 프로젝트에서 관리됩니다.

---

## 🚀 프로젝트 시작하기

### 프론트엔드 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음과 같이 설정하세요:

```env
# 백엔드 API 서버 URL (개발 환경)
VITE_API_URL=http://localhost:5000

# 프론트엔드 클라이언트 URL (OAuth 리다이렉트용)
VITE_CLIENT_URL=http://localhost:5173
```

> 📝 **중요**: 
> - 백엔드 서버(`pwd-week6-server`)가 먼저 실행되어야 합니다.
> - 환경변수가 없어도 자동으로 기본값이 설정됩니다.
> - `src/config/environment.js`에서 환경별 설정을 자동으로 관리합니다.

### Step 1: React + Vite 프로젝트 개발환경 구축

```bash
# React 프로젝트 폴더 생성
mkdir pwd-week6-client

# 프로젝트 폴더로 이동
cd pwd-week6-client

# 개발 서버 실행 (테스트)
npm create vite@latest . -- --template react

> npx
> create-vite . react

│
◆  Select a framework:
│  ○ Vanilla
│  ○ Vue
│  ● React
│  ○ Preact
│  ○ Lit
│  ○ Svelte
│  ○ Solid
│  ○ Qwik
│  ○ Angular
│  ○ Marko
│  ○ Others

 Select a variant:
│  ○ TypeScript
│  ○ TypeScript + SWC
│  ○ JavaScript
│  ● JavaScript + SWC
│  ○ React Router v7 ↗
│  ○ TanStack Router ↗
│  ○ RedwoodSDK ↗
│  ○ RSC ↗


 Scaffolding project in C:\Users\hsoh\WorkspaceAjou\pwd-week6-client...
    npm install
    npm run dev


npm install

added 112 packages, and audited 113 packages in 4s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


npm run dev

> pwd-week6-client@0.0.0 dev
> vite


  VITE v7.1.5  ready in 317 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

> 💡 브라우저에서 http://localhost:5173 이 열리면 성공!

### Step 2: 프로젝트 GitHub 저장소 연동
// 깃허브 접속 후 pwd-week6-client 저장소 생성 후

```bash
# 현재 폴더를 Git 저장소(Repository)로 초기화(Initialize)
git init

# 모든 변경 파일을 스테이징(Staging Area)에 추가
git add .

# 스테이징된 파일을 커밋(Commit)으로 기록 (-m: 메시지(Message) 옵션)
git commit -m "Init pwd-week6-client : React + Vite app"

# 기본 브랜치(Branch) 이름을 main으로 변경 (-m: move)
git branch -m main

# 원격(Remote) 저장소 'origin' 등록 (GitHub URL로 연결)
git remote add origin https://github.com/<username>/pwd-week6-client.git

# 로컬 main을 원격 origin/main으로 최초 푸시(Push) (-u: 업스트림(Upstream) 설정)
#  → 이후에는 git push 만으로도 동일 브랜치에 푸시 가능
git push -u origin main
```

// 이후 코드 수정 시
```bash
git add .

git commit -m "....."

git push -u origin main
```

---

## 📦 주요 라이브러리 설치

### 실제 프로젝트 의존성

이 프로젝트는 다음 라이브러리들을 사용합니다:

| 라이브러리 | 용도 | 버전 | 실제 사용 예시 |
|-----------|------|------|----------------|
| react | React 라이브러리 | ^19.1.1 | 최신 React 기능 활용 |
| react-dom | DOM 관리 | ^19.1.1 | React 19 렌더링 |
| react-router-dom | 페이지 라우팅 | ^7.9.1 | HashRouter, 보호된 라우트 |
| axios | HTTP 통신 | ^1.12.1 | API 호출, 인터셉터 |
| react-hook-form | 폼 관리 | ^7.62.0 | 로그인/회원가입 폼 |
| @emotion/react | CSS-in-JS | ^11.14.0 | 스타일드 컴포넌트 |
| @emotion/styled | 스타일드 컴포넌트 | ^11.14.1 | 컴포넌트 스타일링 |
| @tanstack/react-query | 서버 상태 관리 | ^5.87.4 | 서버 데이터 캐싱 |
| react-icons | 아이콘 | ^5.5.0 | UI 아이콘 |
| react-toastify | 알림 메시지 | ^11.0.5 | 사용자 피드백 |
| react-spinners | 로딩 애니메이션 | ^0.17.0 | 로딩 상태 표시 |

> 📝 **참고**: 모든 의존성은 이미 `package.json`에 정의되어 있으며, `npm install`로 자동 설치됩니다.
---

```json
/* package.json */
{
  "name": "pwd-week6-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "build:prod": "vite build --mode production",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "deploy:vercel": "vercel --prod",
    "start": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "gh-pages": "^6.3.0",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

### 한 번에 모두 설치하기

```bash
npm install
```

### 🏃‍♂️ 로컬 실행 방법

#### 1단계: 서버 실행 (pwd-week6-server)
```bash
cd pwd-week6-server
npm install
npm start
# 서버가 http://localhost:5000에서 실행됩니다
```

#### 2단계: 클라이언트 실행 (pwd-week6-client)  
```bash
cd pwd-week6-client
npm install
npm run dev
# 클라이언트가 http://localhost:5173에서 실행됩니다
```

#### 3단계: 브라우저에서 확인
- 클라이언트: http://localhost:5173
- 서버 API: http://localhost:5000/health

---

## 📁 프로젝트 구조

### 폴더 구조 생성

```bash
# src 폴더 안에 필요한 폴더들 생성
mkdir src/components src/pages src/services src/styles src/config src/contexts src/utils src/assets
```

### 최종 구조

```
pwd-week6-client/
├── src/
│   ├── components/         # 재사용 컴포넌트
│   │   ├── AdminRoute.jsx          # 🔐 관리자 라우트 보호
│   │   ├── Header.jsx              # 네비게이션 헤더
│   │   ├── NotFound.jsx            # 404 페이지
│   │   ├── PopularRestaurants.jsx  # 인기 맛집 컴포넌트
│   │   ├── ProtectedRoute.jsx      # 🔐 보호된 라우트
│   │   ├── RestaurantCard.jsx      # 맛집 카드
│   │   ├── RestaurantList.jsx      # 맛집 목록
│   │   └── SubmitRestaurant.jsx   # 맛집 제보 폼
│   ├── config/            # 설정 파일
│   │   └── environment.js          # 환경별 설정 관리
│   ├── contexts/          # Context API
│   │   └── AuthContext.jsx        # 🔐 인증 상태 관리
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── AdminPage.jsx          # 🔐 관리자 페이지
│   │   ├── DashboardPage.jsx     # 🔐 사용자 대시보드
│   │   ├── DetailPage.jsx        # 맛집 상세 페이지
│   │   ├── HomePage.jsx          # 홈페이지
│   │   ├── ListPage.jsx          # 맛집 목록 페이지
│   │   ├── LoginPage.jsx         # 🔐 로그인 페이지
│   │   ├── PopularPage.jsx     # 인기 맛집 페이지
│   │   ├── RegisterPage.jsx      # 🔐 회원가입 페이지
│   │   ├── SubmissionsPage.jsx   # 🔐 제보 관리 페이지
│   │   └── SubmitPage.jsx       # 🔐 맛집 제보 페이지
│   ├── services/          # API 서비스
│   │   ├── api.jsx               # 일반 API 통신
│   │   └── authApi.js            # 🔐 인증 API
│   ├── styles/            # 스타일 파일
│   │   └── GlobalStyles.jsx      # 전역 스타일
│   ├── utils/             # 유틸리티 함수
│   │   └── connectionTest.js     # 서버 연결 테스트
│   ├── assets/            # 정적 자원
│   │   └── react.svg
│   ├── App.css            # 앱 스타일
│   ├── App.jsx            # 메인 앱 컴포넌트
│   ├── index.css          # 기본 스타일
│   └── main.jsx           # 진입점
├── public/                # 정적 파일
│   └── vite.svg
├── node_modules/          # 의존성 패키지
├── .env                   # 환경 변수 (로컬)
├── .gitignore             # Git 무시 파일
├── eslint.config.js       # ESLint 설정
├── index.html             # HTML 템플릿
├── package.json           # 프로젝트 설정
├── package-lock.json      # 의존성 잠금 파일
├── README.md              # 프로젝트 문서
├── vercel.json            # Vercel 배포 설정
└── vite.config.js         # Vite 설정
```

---

## 🔐 인증 시스템 구현

### 1. AuthContext 구현 (전역 인증 상태 관리)

`src/contexts/AuthContext.jsx` 파일을 생성합니다:

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 자동 로그인 상태 확인
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await authApi.getCurrentUser();
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인
  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  };

  // 회원가입
  const register = async (name, email, password) => {
    try {
      const response = await authApi.register(name, email, password);
      if (response.data.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('로그아웃 오류:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // 관리자 권한 확인
  const isAdmin = () => {
    return user && user.userType === 'admin';
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    isAdmin,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. 세션 기반 인증 시스템

현재 프로젝트는 **세션 기반 인증**을 사용합니다. 이는 다음과 같은 장점이 있습니다:

#### **세션 기반 인증의 장점**
- **보안성**: HttpOnly 쿠키로 XSS 공격 방지
- **서버 제어**: 서버에서 세션을 즉시 무효화 가능
- **단순성**: 복잡한 토큰 관리 불필요
- **자동 갱신**: 세션 만료 시 자동 로그아웃

#### **세션 기반 인증 흐름**
1. 사용자가 로그인 요청
2. 서버에서 세션 생성 및 MongoDB에 저장
3. HttpOnly 쿠키로 세션 ID 전송
4. 후속 요청 시 쿠키 자동 포함
5. 서버에서 세션 검증 후 인증 처리

### 3. 인증 API 서비스 구현

`src/services/authApi.js` 파일을 생성합니다:

```js
import axios from 'axios';
import { environment } from '../config/environment';

// Axios 인스턴스 생성
const authApi = axios.create({
  baseURL: `${environment.API_URL}/api/auth`,
  withCredentials: true, // 쿠키 포함 요청
  timeout: 10000,
});

// 요청 인터셉터 - 쿠키 자동 포함
authApi.interceptors.request.use(
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
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 세션 만료 시 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 인증 관련 API 함수들
export const authApi = {
  // 회원가입
  register: (name, email, password) => 
    authApi.post('/register', { name, email, password }),

  // 로그인
  login: (email, password) => 
    authApi.post('/login', { email, password }),

  // 로그아웃
  logout: () => 
    authApi.post('/logout'),

  // 현재 사용자 정보 조회
  getCurrentUser: () => 
    authApi.get('/me'),

  // Google OAuth 로그인 URL 생성
  getGoogleAuthUrl: () => 
    authApi.get('/google/url'),

  // Naver OAuth 로그인 URL 생성
  getNaverAuthUrl: () => 
    authApi.get('/naver/url'),

  // OAuth 콜백 처리
  handleOAuthCallback: (provider, code) => 
    authApi.post(`/${provider}/callback`, { code }),

  // 관리자 전용 API
  admin: {
    // 모든 사용자 목록 조회
    getUsers: () => 
      authApi.get('/admin/users'),
    
    // 사용자 권한 변경
    updateUserType: (userId, userType) => 
      authApi.put(`/admin/users/${userId}`, { userType }),
    
    // 사용자 삭제
    deleteUser: (userId) => 
      authApi.delete(`/admin/users/${userId}`)
  }
};

export default authApi;
```

### 3. 환경 설정 파일 구현

`src/config/environment.js` 파일을 생성합니다:

```js
// 환경별 설정 관리
const environment = {
  // API URL 설정
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // 클라이언트 URL 설정
  CLIENT_URL: import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
  
  // 환경 모드
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  // 개발 환경 여부
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  
  // 프로덕션 환경 여부
  isProduction: import.meta.env.NODE_ENV === 'production'
};

export { environment };
```

### 4. 연결 테스트 유틸리티 구현

`src/utils/connectionTest.js` 파일을 생성합니다:

```js
import axios from 'axios';
import { environment } from '../config/environment';

// 서버 연결 상태 테스트
export const testConnection = async () => {
  try {
    console.log('🔍 서버 연결 테스트 시작...');
    
    // 1. 헬스체크
    const healthResponse = await axios.get(`${environment.API_URL}/health`);
    console.log('✅ 서버 헬스체크 성공:', healthResponse.data);
    
    // 2. API 엔드포인트 테스트
    const apiResponse = await axios.get(`${environment.API_URL}/api/restaurants`);
    console.log('✅ API 엔드포인트 테스트 성공:', apiResponse.data);
    
    return {
      success: true,
      message: '서버 연결이 정상입니다.',
      data: {
        health: healthResponse.data,
        api: apiResponse.data
      }
    };
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error);
    return {
      success: false,
      message: '서버 연결에 실패했습니다.',
      error: error.message
    };
  }
};

// 특정 엔드포인트 테스트
export const testEndpoint = async (endpoint) => {
  try {
    const response = await axios.get(`${environment.API_URL}${endpoint}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

---

## 🛡️ 보호된 라우트 구현

### 1. ProtectedRoute 컴포넌트 구현

`src/components/ProtectedRoute.jsx` 파일을 생성합니다:

```jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#667eea" size={50} />
        <LoadingText>인증 상태를 확인하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
```

### 2. AdminRoute 컴포넌트 구현

`src/components/AdminRoute.jsx` 파일을 생성합니다:

```jsx
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

const AccessDeniedContainer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const AccessDeniedTitle = styled.h1`
  color: #ff4757;
  margin-bottom: 1rem;
`;

const AccessDeniedMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#667eea" size={50} />
        <LoadingText>권한을 확인하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 관리자 권한이 없는 경우 접근 거부
  if (!isAdmin()) {
    return (
      <AccessDeniedContainer>
        <AccessDeniedTitle>🚫 접근 권한이 없습니다</AccessDeniedTitle>
        <AccessDeniedMessage>
          이 페이지는 관리자만 접근할 수 있습니다.
        </AccessDeniedMessage>
      </AccessDeniedContainer>
    );
  }

  // 관리자 권한이 있는 경우 자식 컴포넌트 렌더링
  return children;
};

export default AdminRoute;
```

---

## 📄 새로운 페이지 구현

### 1. LoginPage 구현

`src/pages/LoginPage.jsx` 파일을 생성합니다:

```jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/authApi';
import styled from '@emotion/styled';
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SocialLoginContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    background: white;
    padding: 0 1rem;
    color: #666;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success('로그인 성공!');
        navigate(from, { replace: true });
      } else {
        toast.error(result.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await authApi.getGoogleAuthUrl();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Google 로그인 설정에 문제가 있습니다.');
    }
  };

  const handleNaverLogin = async () => {
    try {
      const response = await authApi.getNaverAuthUrl();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Naver 로그인 설정에 문제가 있습니다.');
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다'
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호는 필수입니다',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다'
              }
            })}
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader size={20} color="white" /> : '로그인'}
        </SubmitButton>
      </Form>

      <Divider>
        <span>또는</span>
      </Divider>

      <SocialLoginContainer>
        <SocialButton type="button" onClick={handleGoogleLogin}>
          <FaGoogle color="#4285F4" />
          Google로 로그인
        </SocialButton>
        
        <SocialButton type="button" onClick={handleNaverLogin}>
          <span style={{ color: '#03C75A', fontWeight: 'bold' }}>N</span>
          Naver로 로그인
        </SocialButton>
      </SocialLoginContainer>

      <SignupLink>
        계정이 없으신가요? <Link to="/register">회원가입</Link>
      </SignupLink>
    </LoginContainer>
  );
}

export default LoginPage;
```

### 2. RegisterPage 구현

`src/pages/RegisterPage.jsx` 파일을 생성합니다:

```jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/authApi';
import styled from '@emotion/styled';
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SocialLoginContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    background: white;
    padding: 0 1rem;
    color: #666;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await registerUser(data.name, data.email, data.password);
      if (result.success) {
        toast.success('회원가입 성공!');
        navigate('/dashboard');
      } else {
        toast.error(result.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await authApi.getGoogleAuthUrl();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Google 로그인 설정에 문제가 있습니다.');
    }
  };

  return (
    <RegisterContainer>
      <Title>회원가입</Title>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="text"
            placeholder="이름"
            {...register('name', {
              required: '이름은 필수입니다',
              minLength: {
                value: 2,
                message: '이름은 최소 2자 이상이어야 합니다'
              }
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <FaEnvelope />
          </InputIcon>
          <Input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다'
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호는 필수입니다',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다'
              }
            })}
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            {...register('confirmPassword', {
              required: '비밀번호 확인은 필수입니다',
              validate: value => value === password || '비밀번호가 일치하지 않습니다'
            })}
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader size={20} color="white" /> : '회원가입'}
        </SubmitButton>
      </Form>

      <Divider>
        <span>또는</span>
      </Divider>

      <SocialLoginContainer>
        <SocialButton type="button" onClick={handleGoogleLogin}>
          <FaGoogle color="#4285F4" />
          Google로 회원가입
        </SocialButton>
      </SocialLoginContainer>

      <LoginLink>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </LoginLink>
    </RegisterContainer>
  );
}

export default RegisterPage;
```

### 3. DashboardPage 구현

`src/pages/DashboardPage.jsx` 파일을 생성합니다:

```jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';
import { FaUser, FaEnvelope, FaCrown, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

function DashboardPage() {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
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
      </Header>

      <InfoGrid>
        <InfoCard>
          <InfoTitle>
            <FaUser />
            계정 정보
          </InfoTitle>
          <InfoValue>
            가입일: {new Date(user?.createdAt).toLocaleDateString() || '')}
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
```

---

## 🔧 핵심 컴포넌트 구현

### 실제 구현된 프로젝트 구조

```
src/
├── App.jsx                    # 메인 애플리케이션 (라우팅, QueryClient)
├── main.jsx                   # 앱 진입점
├── components/
│   ├── Header.jsx            # 네비게이션 헤더
│   ├── ProtectedRoute.jsx    # 로그인 보호 라우트
│   ├── AdminRoute.jsx        # 관리자 보호 라우트
│   ├── RestaurantCard.jsx    # 맛집 카드 컴포넌트
│   ├── RestaurantList.jsx    # 맛집 목록 컴포넌트
│   ├── PopularRestaurants.jsx # 인기 맛집 컴포넌트
│   ├── SubmitRestaurant.jsx  # 맛집 제보 컴포넌트
│   └── NotFound.jsx          # 404 페이지
├── pages/
│   ├── HomePage.jsx          # 홈페이지
│   ├── ListPage.jsx          # 맛집 목록 페이지
│   ├── DetailPage.jsx        # 맛집 상세 페이지
│   ├── PopularPage.jsx       # 인기 맛집 페이지
│   ├── LoginPage.jsx         # 로그인 페이지
│   ├── RegisterPage.jsx      # 회원가입 페이지
│   ├── DashboardPage.jsx     # 사용자 대시보드
│   ├── SubmitPage.jsx       # 맛집 제보 페이지
│   ├── AdminPage.jsx        # 관리자 페이지
│   └── SubmissionsPage.jsx  # 제보 관리 페이지
├── contexts/
│   └── AuthContext.jsx       # 인증 상태 관리
├── services/
│   ├── api.jsx               # API 통신 서비스
│   └── authApi.js            # 인증 API 서비스
├── config/
│   └── environment.js        # 환경 설정
├── styles/
│   └── GlobalStyles.jsx      # 전역 스타일
└── utils/
    └── connectionTest.js     # 연결 테스트 유틸리티
```

### 1. App.jsx - 메인 애플리케이션 (실제 구현)

```javascript
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { testConnection } from './utils/connectionTest';

// Context
import { AuthProvider } from './contexts/AuthContext';

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
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
```

### 2. index.html - HTML 메타데이터 설정

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="캠퍼스 주변 맛집을 찾아보세요!" />
    <title>Ajou Campus Foodmap - 우리 학교 맛집 지도</title>
  </head>
  <body>
    <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>    
    <!-- Netlify Forms를 위한 숨겨진 폼 -->
    <form name="restaurant-submit" netlify hidden>
      <input type="text" name="restaurantName" />
      <select name="category"></select>
      <input type="text" name="location" />
      <input type="text" name="priceRange" />
      <textarea name="recommendedMenu"></textarea>
      <textarea name="review"></textarea>
      <input type="text" name="submitterName" />
      <input type="email" name="submitterEmail" />
    </form>

    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>      
  </body>
</html>

```

### 2. 메인 앱 구조 (인증 시스템 포함)

```jsx
/* src/main.jsx */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```jsx
/* src/App.jsx */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import SubmitPage from './pages/SubmitPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import SubmissionsPage from './pages/SubmissionsPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// Utils
import { testConnection } from './utils/connectionTest';

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
  // 개발 환경에서 서버 연결 테스트
  React.useEffect(() => {
    if (import.meta.env.NODE_ENV === 'development') {
      testConnection();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
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
                
                {/* 보호된 라우트 (로그인 필요) */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/submit" element={
                  <ProtectedRoute>
                    <SubmitPage />
                  </ProtectedRoute>
                } />
                
                {/* 관리자 전용 라우트 */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
                <Route path="/submissions" element={
                  <AdminRoute>
                    <SubmissionsPage />
                  </AdminRoute>
                } />
                
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
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
```

### 3. 스타일(CSS)
- 전체 애플리케이션 (src/index.css)
```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

- App 컴포넌트와 하위 컴포넌트(src/App.css)
```css
/* 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: #f5f5f5;
  color: #333;
}

/* 레이아웃 */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
}

/* 기본 버튼 스타일 */
button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background: #f0f0f0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 기본 폼 스타일 */
input, select, textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

/* 푸터 */
.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* 로딩 */
.loading {
  text-align: center;
  padding: 2rem;
}

/* 에러 */
.error {
  color: red;
  padding: 1rem;
  text-align: center;
}
```

- @emotion 패키지를 이용한 전역 스타일 적용(src/styles/GlobalStyles.jsx)
```jsx
/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      /* Emotion으로 관리할 글로벌 스타일 */
      a {
        color: inherit;
        text-decoration: none;
      }
      
      ul {
        list-style: none;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    `}
  />
);

export default GlobalStyles;
```


### 4. 연습용 가상 서버 (src/services/api.jsx)
```jsx
import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 실습용 가짜 API
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 에러:', error);
    return Promise.reject(error);
  }
);

// API 함수들
export const restaurantAPI = {
  // 맛집 목록 가져오기 (가짜 데이터)
  getRestaurants: async () => {
    // 실제로는 백엔드 API를 호출하지만, 실습용으로 가짜 데이터 반환
    return {
      data: [
        {
          id: 1,
          name: "송림식당",
          category: "한식",
          location: "경기 수원시 영통구 월드컵로193번길 21 원천동",
          priceRange: "7,000-13,000원",
          rating: 4.99,
          description: "맛있는 한식 맛집입니다.",
          recommendedMenu: ["순두부", "김치찌개","소불고기", "제육볶음"],
          likes: 0,
          image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966"
        },
        {
          id: 2,
          name: "별미떡볶이",
          category: "분식",
          location: "경기 수원시 영통구 아주로 42 아카데미빌딩",
          priceRange: "7,000-10,000원",
          rating: 4.98,
          description: "바삭한 튀김과 함께하는 행복한 한입",
          recommendedMenu: ["떡볶이", "튀김", "순대", "어묵"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTJfMjcg%2FMDAxNzU0OTQ5ODk1Mjg0.GR6i3mNpJJXyqQrozGEJ65InCDBGlEmxc0aCeVHncJgg.sduDPX67J8hhoGxq4vLohpS4dXk1w-706dQLPfVs1iwg.JPEG%2Foutput%25A3%25DF1564208956.jpg"
        },
        {
          id: 3,
          name: "Sogo",
          category: "일식",
          location: "경기 수원시 영통구 월드컵로193번길 7",
          priceRange: "10,000-16,000원",
          rating: 4.89,
          description: "일식 맛집, 구 허수아비,",
          recommendedMenu: ["냉모밀", "김치돈까스나베", "코돈부르"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg"
        }
      ]
    };
  },

  // 맛집 상세 정보 가져오기
  getRestaurantById: async (id) => {
    const restaurants = await restaurantAPI.getRestaurants();
    const restaurant = restaurants.data.find(r => r.id === parseInt(id));
    return { data: restaurant };
  },

  // 인기 맛집 가져오기
  getPopularRestaurants: async () => {
    const restaurants = await restaurantAPI.getRestaurants();
    const sorted = [...restaurants.data].sort((a, b) => b.rating - a.rating);
    return { data: sorted.slice(0, 5) };
  }
};

export default api;
```
---

### 5. 컴포넌트 (src/components/)

```jsx
/* src/components/Header.jsx */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus, FaUser, FaSignOutAlt, FaCrown } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
`;

const UserName = styled.span`
  font-size: 0.9rem;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.8);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 107, 107, 1);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s;
  text-decoration: none;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const AdminBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #ff6b6b;
  border-radius: 10px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃되었습니다.');
      navigate('/');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        <Logo>Ajou Campus Foodmap</Logo>
        
        <UserSection>
          {isAuthenticated ? (
            <>
              <UserInfo>
                <UserAvatar>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </UserAvatar>
                <UserName>{user?.name}</UserName>
                {isAdmin() && (
                  <AdminBadge>
                    <FaCrown />
                    Admin
                  </AdminBadge>
                )}
              </UserInfo>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt />
                로그아웃
              </LogoutButton>
            </>
          ) : (
            <AuthButtons>
              <AuthButton to="/login">로그인</AuthButton>
              <AuthButton to="/register">회원가입</AuthButton>
            </AuthButtons>
          )}
        </UserSection>
      </HeaderTop>

      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular Top 5
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/submit" className={isActive('/submit')}>
            <FaPlus /> Submit
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink to="/dashboard" className={isActive('/dashboard')}>
            <FaUser /> Dashboard
          </NavLink>
        )}
        {isAdmin() && (
          <NavLink to="/admin" className={isActive('/admin')}>
            <FaCrown /> Admin
          </NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
```

```jsx
/* src/components/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 8px;
  transition: background 0.3s;
  
  &:hover {
    background: #5a67d8;
  }
`;

function NotFound() {
  return (
    <Container>
      <Icon />
      <Title>404 - 페이지를 찾을 수 없습니다</Title>
      <Message>요청하신 페이지가 존재하지 않습니다.</Message>
      <HomeLink to="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
}

export default NotFound;
```

```jsx
/* src/components/PopularRestaurants.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaTrophy, FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const RankingList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;

const RankingItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.3s;
  
  &:hover {
    background: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankBadge = styled.div`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  
  svg {
    font-size: 1.5rem;
  }
`;

const RestaurantInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
`;

function PopularRestaurants({ restaurants }) {
  const getRankIcon = (rank) => {
    if (rank === 0) return <FaTrophy color="gold" />;
    if (rank === 1) return <FaTrophy color="silver" />;
    if (rank === 2) return <FaTrophy color="#CD7F32" />;
    return rank + 1;
  };

  return (
    <Container>
      <Title>🔥 이번 주 인기 TOP 5</Title>
      
      <RankingList>
        {restaurants.map((restaurant, index) => (
          <RankingItem key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
            <RankBadge>{getRankIcon(index)}</RankBadge>
            <RestaurantInfo>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.category} • {restaurant.location}</p>
            </RestaurantInfo>
            <Rating>
              <FaStar color="gold" />
              {restaurant.rating}
            </Rating>
          </RankingItem>
        ))}
      </RankingList>
    </Container>
  );
}

export default PopularRestaurants;
```

```jsx
/* src/components/RestaurantCard.jsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaStar, FaHeart, FaMapMarkerAlt, FaWonSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Styled Components는 그대로 유지
const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
`;

const CategoryBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

// $liked로 변경 (transient prop)
const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$liked ? '#ff4757' : '#ddd'};
  background: ${props => props.$liked ? '#ff4757' : 'white'};
  color: ${props => props.$liked ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #ff4757;
    background: #ff4757;
    color: white;
  }
`;

const DetailLink = styled(Link)`
  color: #667eea;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

function RestaurantCard({ restaurant }) {
  // State 초기화
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(restaurant.likes || 0);

  // 컴포넌트 마운트 시 LocalStorage에서 데이터 복원
  useEffect(() => {
    // 1. 좋아요 여부 복원
    try {
      const likedRestaurants = JSON.parse(
        localStorage.getItem('likedRestaurants') || '[]'
      );
      if (likedRestaurants.includes(restaurant.id)) {
        setLiked(true);
      }

      // 2. 좋아요 수 복원
      const savedLikes = JSON.parse(
        localStorage.getItem('restaurantLikes') || '{}'
      );
      if (savedLikes[restaurant.id] !== undefined) {
        setLikes(savedLikes[restaurant.id]);
      }
    } catch (error) {
      console.error('LocalStorage 읽기 오류:', error);
    }
  }, [restaurant.id, restaurant.likes]);

  const handleLike = (e) => {
    // 이벤트 전파 방지 (중요!)
    e.preventDefault();
    e.stopPropagation();

    try {
      // 새로운 상태 계산
      const newLikedState = !liked;
      const newLikesCount = newLikedState 
        ? likes + 1 
        : Math.max(0, likes - 1); // 음수 방지

      // State 업데이트
      setLiked(newLikedState);
      setLikes(newLikesCount);

      // LocalStorage 업데이트 - 좋아요 여부
      const likedRestaurants = JSON.parse(
        localStorage.getItem('likedRestaurants') || '[]'
      );
      
      if (newLikedState) {
        // 좋아요 추가
        if (!likedRestaurants.includes(restaurant.id)) {
          likedRestaurants.push(restaurant.id);
        }
        toast.success(`${restaurant.name}을(를) 좋아요했습니다! ❤️`);
      } else {
        // 좋아요 취소
        const index = likedRestaurants.indexOf(restaurant.id);
        if (index > -1) {
          likedRestaurants.splice(index, 1);
        }
        toast.info('좋아요를 취소했습니다.');
      }
      
      localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));

      // LocalStorage 업데이트 - 좋아요 수
      const restaurantLikes = JSON.parse(
        localStorage.getItem('restaurantLikes') || '{}'
      );
      restaurantLikes[restaurant.id] = newLikesCount;
      localStorage.setItem('restaurantLikes', JSON.stringify(restaurantLikes));

      // 디버깅용 로그
      console.log('좋아요 업데이트:', {
        restaurantId: restaurant.id,
        liked: newLikedState,
        likes: newLikesCount
      });

    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card>
      <CardImage 
        src={restaurant.image || 'https://via.placeholder.com/300'} 
        alt={restaurant.name} 
      />
      <CardContent>
        <CardHeader>
          <CardTitle>{restaurant.name}</CardTitle>
          <CategoryBadge>{restaurant.category}</CategoryBadge>
        </CardHeader>
        
        <InfoRow>
          <FaMapMarkerAlt /> {restaurant.location}
        </InfoRow>
        <InfoRow>
          <FaWonSign /> {restaurant.priceRange}
        </InfoRow>
        <InfoRow>
          <FaStar color="gold" /> {restaurant.rating}/5.0
        </InfoRow>
        
        <p style={{ margin: '1rem 0', color: '#666' }}>
          {restaurant.description}
        </p>
        
        <ActionRow>
          <LikeButton 
            $liked={liked}  // $ prefix 추가
            onClick={handleLike}
            type="button"  // 명시적 type 지정
          >
            <FaHeart /> {likes}
          </LikeButton>
          <DetailLink to={`/restaurant/${restaurant.id}`}>
            자세히 보기 →
          </DetailLink>
        </ActionRow>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;
```

```jsx
/* src/components/RestaurantList.jsx */
import React from 'react';
import styled from '@emotion/styled';
import RestaurantCard from './RestaurantCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

function RestaurantList({ restaurants }) {
  if (restaurants.length === 0) {
    return <NoResults>해당 카테고리에 맛집이 없습니다.</NoResults>;
  }

  return (
    <ListContainer>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </ListContainer>
  );
}

export default RestaurantList;
```

```jsx
/* src/components/SubmitRestaurant.jsx */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';

const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem;
  
  svg {
    font-size: 4rem;
    color: #4caf50;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #4caf50;
    margin-bottom: 1rem;
  }
`;

function SubmitRestaurant() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Netlify Forms로 제출
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "restaurant-submit",
          ...data
        }).toString()
      });
      
      if (response.ok) {
        setSubmitted(true);
        toast.success('맛집이 성공적으로 제보되었습니다! 🎉');
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      toast.error('제출 중 오류가 발생했습니다.');
    }
  };

  if (submitted) {
    return (
      <FormContainer>
        <SuccessMessage>
          <FaCheckCircle />
          <h3>제보 감사합니다!</h3>
          <p>여러분의 제보로 캠퍼스 푸드맵이 더욱 풍성해집니다.</p>
          <button onClick={() => setSubmitted(false)}>
            다른 맛집 제보하기
          </button>
        </SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormTitle>🍽️ 새로운 맛집 제보하기</FormTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="form-name" value="restaurant-submit" />
        
        <FormGroup>
          <Label htmlFor="restaurantName">맛집 이름 *</Label>
          <Input
            id="restaurantName"
            {...register("restaurantName", {
              required: "맛집 이름은 필수입니다"
            })}
            placeholder="예: OO식당"
          />
          {errors.restaurantName && (
            <ErrorMessage>{errors.restaurantName.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">카테고리 *</Label>
          <Select
            id="category"
            {...register("category", {
              required: "카테고리를 선택해주세요"
            })}
          >
            <option value="">선택하세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="분식">분식</option>
            <option value="카페">카페</option>
            <option value="기타">기타</option>
          </Select>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="location">위치 *</Label>
          <Input
            id="location"
            {...register("location", {
              required: "위치는 필수입니다"
            })}
            placeholder="예: 아주대학교 정문 도보 5분"
          />
          {errors.location && (
            <ErrorMessage>{errors.location.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="priceRange">가격대</Label>
          <Input
            id="priceRange"
            {...register("priceRange")}
            placeholder="예: 8,000-12,000원"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="recommendedMenu">추천 메뉴</Label>
          <Textarea
            id="recommendedMenu"
            {...register("recommendedMenu")}
            placeholder="예: 치즈닭갈비, 막국수, 볶음밥"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="review">한줄평</Label>
          <Textarea
            id="review"
            {...register("review")}
            placeholder="이 맛집만의 특별한 점을 알려주세요"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="submitterName">제보자 이름</Label>
          <Input
            id="submitterName"
            {...register("submitterName")}
            placeholder="선택사항"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="submitterEmail">이메일</Label>
          <Input
            id="submitterEmail"
            type="email"
            {...register("submitterEmail", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다"
              }
            })}
            placeholder="선택사항 (답변받을 이메일)"
          />
          {errors.submitterEmail && (
            <ErrorMessage>{errors.submitterEmail.message}</ErrorMessage>
          )}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '제출 중...' : '맛집 제보하기'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
}

export default SubmitRestaurant;
```

### 6. 페이지 (src/pages/)
```jsx
/* src/pages/DetailPage.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { restaurantAPI } from '../services/api';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const DetailContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  margin: 2rem 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
`;

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantAPI.getRestaurantById(id),
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
      </div>
    );
  }

  if (error || !data?.data) {
    return <div className="error">맛집을 찾을 수 없습니다.</div>;
  }

  const restaurant = data.data;

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> 뒤로 가기
      </BackButton>
      
      <h1>{restaurant.name}</h1>
      
      <RestaurantImage src={restaurant.image} alt={restaurant.name} />
      
      <InfoSection>
        <h3>기본 정보</h3>
        <p><FaMapMarkerAlt /> {restaurant.location}</p>
        <p><FaDollarSign /> {restaurant.priceRange}</p>
        <p><FaStar color="gold" /> {restaurant.rating}/5.0</p>
      </InfoSection>
      
      <InfoSection>
        <h3>소개</h3>
        <p>{restaurant.description}</p>
      </InfoSection>
      
      <InfoSection>
        <h3>추천 메뉴</h3>
        <MenuList>
          {restaurant.recommendedMenu.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </MenuList>
      </InfoSection>
    </DetailContainer>
  );
}

export default DetailPage;
```

```jsx
/* src/pages/HomePage.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaMapMarkedAlt, FaUtensils, FaStar } from 'react-icons/fa';

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>우리 학교 맛집을 찾아보세요!</Title>
      <Subtitle>캠퍼스 주변 숨은 맛집들을 한눈에</Subtitle>
      
      <CardGrid>
        <Card to="/list">
          <FaMapMarkedAlt />
          <h3>맛집 둘러보기</h3>
          <p>카테고리별로 맛집을 찾아보세요</p>
        </Card>
        
        <Card to="/popular">
          <FaStar />
          <h3>인기 맛집 TOP</h3>
          <p>이번 주 가장 인기있는 맛집</p>
        </Card>
        
        <Card to="/submit">
          <FaUtensils />
          <h3>맛집 제보하기</h3>
          <p>새로운 맛집을 알려주세요</p>
        </Card>
      </CardGrid>
    </HomeContainer>
  );
}

export default HomePage;
```

```jsx
/* src/pages/ListPage.jsx */
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import RestaurantList from '../components/RestaurantList';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const FilterContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #667eea;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

function ListPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '한식', '중식', '일식', '양식', '아시안', '분식', '카페'];

  // React Query로 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>맛집 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  const filteredData = selectedCategory === '전체' 
    ? data?.data 
    : data?.data.filter(r => r.category === selectedCategory);

  return (
    <PageContainer>
      <h2>맛집 목록</h2>
      
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <RestaurantList restaurants={filteredData || []} />
    </PageContainer>
  );
}

export default ListPage;
```

```jsx
/* src/pages/PopularPage.jsx */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PopularRestaurants from '../components/PopularRestaurants';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

function PopularPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-restaurants'],
    queryFn: restaurantAPI.getPopularRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>인기 맛집을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  return <PopularRestaurants restaurants={data?.data || []} />;
}

export default PopularPage;
```

```jsx
/* src/pages/SubmitPage.jsx */
import React from 'react';
import SubmitRestaurant from '../components/SubmitRestaurant';

function SubmitPage() {
  return <SubmitRestaurant />;
}

export default SubmitPage;
```
---

## 🔄 상태 관리 구현

### 1. Context API를 활용한 전역 상태 관리

#### AuthContext 사용법
```jsx
// 컴포넌트에서 인증 상태 사용하기
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, isAdmin } = useAuth();
  
  if (isAuthenticated) {
    return (
      <div>
        <p>안녕하세요, {user.name}님!</p>
        {isAdmin() && <p>관리자 권한이 있습니다.</p>}
        <button onClick={logout}>로그아웃</button>
      </div>
    );
  }
  
  return <LoginForm />;
}
```

#### React Query를 활용한 서버 상태 관리
```jsx
// 맛집 데이터 가져오기
import { useQuery } from '@tanstack/react-query';
import { restaurantAPI } from '../services/api';

function RestaurantList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantAPI.getRestaurants,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      {data?.data?.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
```

### 2. 로컬 상태 관리

#### useState와 useEffect 활용
```jsx
import { useState, useEffect } from 'react';

function RestaurantCard({ restaurant }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(restaurant.likes || 0);

  // 컴포넌트 마운트 시 로컬스토리지에서 상태 복원
  useEffect(() => {
    const likedRestaurants = JSON.parse(
      localStorage.getItem('likedRestaurants') || '[]'
    );
    setLiked(likedRestaurants.includes(restaurant.id));
  }, [restaurant.id]);

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikes(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1));
    
    // 로컬스토리지에 상태 저장
    const likedRestaurants = JSON.parse(
      localStorage.getItem('likedRestaurants') || '[]'
    );
    
    if (newLikedState) {
      likedRestaurants.push(restaurant.id);
    } else {
      const index = likedRestaurants.indexOf(restaurant.id);
      if (index > -1) likedRestaurants.splice(index, 1);
    }
    
    localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));
  };

  return (
    <div>
      <h3>{restaurant.name}</h3>
      <button onClick={handleLike}>
        {liked ? '❤️' : '🤍'} {likes}
      </button>
    </div>
  );
}
```

### 3. 폼 상태 관리 (React Hook Form)

```jsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log('폼 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: '이메일은 필수입니다',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '올바른 이메일 형식이 아닙니다'
          }
        })}
        placeholder="이메일"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password', {
          required: '비밀번호는 필수입니다',
          minLength: {
            value: 6,
            message: '비밀번호는 최소 6자 이상이어야 합니다'
          }
        })}
        type="password"
        placeholder="비밀번호"
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">로그인</button>
    </form>
  );
}
```

---

## 📝 Netlify Forms 설정
### 1. 폼 요소 추가 (index.html)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="캠퍼스 주변 맛집을 찾아보세요!" />
    <title>Ajou Campus Foodmap - 우리 학교 맛집 지도</title>
  </head>
  <body>
    <noscript>이 앱을 실행하려면 JavaScript를 활성화해야 합니다.</noscript>    
    <!-- Netlify Forms를 위한 숨겨진 폼 -->
    <form name="restaurant-submit" netlify hidden>
      <input type="text" name="restaurantName" />
      <select name="category"></select>
      <input type="text" name="location" />
      <input type="text" name="priceRange" />
      <textarea name="recommendedMenu"></textarea>
      <textarea name="review"></textarea>
      <input type="text" name="submitterName" />
      <input type="email" name="submitterEmail" />
    </form>

    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>      
  </body>
</html>
```
---

## 🚀 배포 설정

### 🌍 배포 환경
- **프론트엔드**: Vercel (클라우드 배포)
- **백엔드**: Render (서버 호스팅)
- **데이터베이스**: MongoDB Atlas (클라우드 데이터베이스)

### ⚙️ 환경 변수 설정

#### 로컬 개발 환경 (.env)
```env
# 서버 API URL
VITE_API_URL=http://localhost:5000

# 클라이언트 URL (OAuth 리다이렉트용)
VITE_CLIENT_URL=http://localhost:5173

# 개발 환경 설정
NODE_ENV=development
```

#### 프로덕션 환경 (Vercel 환경변수)
```env
# 서버 API URL (Render 배포 후 실제 URL)
VITE_API_URL=https://your-app-name.onrender.com

# 클라이언트 URL (Vercel 배포 후 실제 URL)
VITE_CLIENT_URL=https://your-app-name.vercel.app

# 프로덕션 환경 설정
NODE_ENV=production
```

### 📁 Vercel 배포 설정

#### vercel.json 파일 생성
프로젝트 루트에 `vercel.json` 파일을 생성합니다:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

#### Vercel 배포 단계

1. **Vercel 계정 연결**
   - [vercel.com](https://vercel.com)에서 GitHub 계정으로 로그인
   - "New Project" 클릭

2. **GitHub 저장소 연결**
   - `pwd-week6-client` 저장소 선택
   - Framework Preset: `Vite` (자동 감지)

3. **환경 변수 설정**
   - Project Settings → Environment Variables
   - 다음 변수들을 추가:
     ```
     VITE_API_URL=https://<your-server-url>.onrender.com
     VITE_CLIENT_URL=https://<your-app-name>.vercel.app
     NODE_ENV=production
     ```

4. **배포 확인**
   - 배포 완료 후 생성된 URL 확인
   - 모든 페이지가 정상 작동하는지 테스트

### 📖 상세 배포 가이드

## 📋 배포 개요

- **프론트엔드**: Vercel에 배포
- **백엔드**: Render에 배포
- **데이터베이스**: MongoDB Atlas (클라우드)

---

## 🛠️ 사전 준비

### 1. 계정 준비
- ✅ [Vercel 계정](https://vercel.com) (GitHub 연동)
- ✅ [Render 계정](https://render.com) (GitHub 연동)
- ✅ [MongoDB Atlas 계정](https://cloud.mongodb.com)

### 2. 저장소 준비
```bash
# GitHub에 프로젝트 푸시 완료 확인
git add .
git commit -m "Deploy ready"
git push origin main
```

---

## 🌐 백엔드 배포 (Render)

### Step 1: Render에서 Web Service 생성

1. [Render Dashboard](https://dashboard.render.com) 접속
2. `New` → `Web Service` 선택
3. GitHub 저장소 연결: `pwd-week6-server`

### Step 2: 설정

**Basic Settings:**
- **Name**: `pwd-week6-server` (또는 원하는 이름)
- **Branch**: `main`
- **Root Directory**: `pwd-week6-server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodmap?retryWrites=true&w=majority
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
CLIENT_URL=https://your-app-name.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/google/callback
```

### Step 3: 배포 확인
배포 완료 후 URL 확인: `https://your-app-name.onrender.com`

---

## 🌍 프론트엔드 배포 (Vercel)

### Step 1: Vercel에서 프로젝트 임포트

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. `Add New...` → `Project` 선택
3. GitHub 저장소 연결: `pwd-week6-client`

### Step 2: 설정

**Framework Preset**: `Vite` (자동 감지)

**Environment Variables:**
```
VITE_API_URL=https://your-app-name.onrender.com
VITE_CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### Step 3: 배포 확인
배포 완료 후 URL 확인: `https://your-app-name.vercel.app`

---

## 🔄 상호 URL 업데이트

**중요**: 배포 후 실제 URL을 서로 환경변수에 설정해야 합니다.

### Render (서버) 환경변수 업데이트:
```
CLIENT_URL=https://your-actual-vercel-app.vercel.app
GOOGLE_CALLBACK_URL=https://your-actual-render-app.onrender.com/api/auth/google/callback
```

### Vercel (클라이언트) 환경변수 업데이트:
```  
VITE_API_URL=https://your-actual-render-app.onrender.com
VITE_CLIENT_URL=https://your-actual-vercel-app.vercel.app
```

---

## 🧪 테스트 및 검증

### 실제 구현된 고급 기능들

#### 1. **자동 환경 감지 시스템**
```javascript
// src/config/environment.js
const getEnvironmentConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  
  // 환경별 자동 설정
  const config = {
    development: {
      apiUrl: 'http://localhost:5000',
      clientUrl: 'http://localhost:5173',
    },
    production: {
      apiUrl: import.meta.env.VITE_API_URL || 'https://pwd-week6-server.onrender.com',
      clientUrl: import.meta.env.VITE_CLIENT_URL || 'https://pwd-week6-client.vercel.app',
    }
  };
  
  return isDevelopment ? config.development : config.production;
};
```

#### 2. **React Query 최적화 설정**
```javascript
// App.jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 캐싱
      retry: 1, // 실패 시 1회 재시도
    },
  },
});
```

#### 3. **통합 에러 처리 시스템**
```javascript
// src/services/api.jsx
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || '네트워크 오류가 발생했습니다.';
    console.error('API error:', errorMessage);
    
    // 사용자 친화적인 에러 메시지 추가
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);
```

#### 4. **자동 연결 테스트**
```javascript
// src/utils/connectionTest.js
export const testConnection = async () => {
  try {
    const response = await fetch(`${apiUrl}/health`);
    if (response.ok) {
      console.log('✅ 서버 연결 성공');
    } else {
      console.warn('⚠️ 서버 연결 실패');
    }
  } catch (error) {
    console.error('❌ 서버 연결 오류:', error);
  }
};
```

### 1. 로컬 개발 환경 테스트

#### 서버 연결 테스트
```bash
# 1. 서버 실행 (터미널 1)
cd pwd-week6-server
npm install
npm start
# 서버가 http://localhost:5000에서 실행됩니다

# 2. 클라이언트 실행 (터미널 2)
cd pwd-week6-client
npm install
npm run dev
# 클라이언트가 http://localhost:5173에서 실행됩니다
```

#### 기본 기능 테스트 체크리스트
- [ ] **홈페이지 로딩**: http://localhost:5173 접속 확인
- [ ] **네비게이션**: 모든 메뉴 링크 정상 작동
- [ ] **맛집 목록**: /list 페이지에서 맛집 카드 표시
- [ ] **맛집 상세**: 맛집 카드 클릭 시 상세 페이지 이동
- [ ] **인기 맛집**: /popular 페이지에서 TOP 5 표시
- [ ] **좋아요 기능**: 맛집 카드의 좋아요 버튼 작동
- [ ] **카테고리 필터**: 맛집 목록에서 카테고리별 필터링

### 2. 인증 시스템 테스트

#### 회원가입 테스트
- [ ] **회원가입 페이지**: /register 접속
- [ ] **폼 유효성 검사**: 빈 필드, 잘못된 이메일 형식 등 에러 메시지 표시
- [ ] **비밀번호 확인**: 비밀번호와 확인 비밀번호 일치 검사
- [ ] **회원가입 성공**: 유효한 정보 입력 시 회원가입 완료
- [ ] **자동 로그인**: 회원가입 후 자동으로 로그인 상태

#### 로그인 테스트
- [ ] **로그인 페이지**: /login 접속
- [ ] **이메일/비밀번호 로그인**: 정상 로그인 및 대시보드 이동
- [ ] **잘못된 정보**: 잘못된 이메일/비밀번호 입력 시 에러 메시지
- [ ] **소셜 로그인**: Google, Naver 로그인 버튼 클릭 (OAuth 설정 필요)

#### 보호된 라우트 테스트
- [ ] **미인증 접근**: 로그인하지 않은 상태에서 /dashboard, /submit 접근 시 로그인 페이지로 리다이렉트
- [ ] **인증 후 접근**: 로그인 후 보호된 페이지 정상 접근
- [ ] **관리자 페이지**: 일반 사용자가 /admin 접근 시 권한 없음 메시지
- [ ] **관리자 권한**: 관리자 계정으로 /admin 접근 시 정상 접근

### 3. 사용자 경험 테스트

#### 반응형 디자인 테스트
- [ ] **데스크톱**: 1920x1080 해상도에서 정상 표시
- [ ] **태블릿**: 768x1024 해상도에서 정상 표시
- [ ] **모바일**: 375x667 해상도에서 정상 표시
- [ ] **네비게이션**: 모바일에서 햄버거 메뉴 또는 적절한 네비게이션

#### 로딩 상태 테스트
- [ ] **페이지 로딩**: 각 페이지 로딩 시 스피너 표시
- [ ] **API 호출**: 맛집 데이터 로딩 시 로딩 상태 표시
- [ ] **폼 제출**: 로그인/회원가입 시 로딩 버튼 표시

#### 에러 처리 테스트
- [ ] **네트워크 오류**: 서버 연결 실패 시 적절한 에러 메시지
- [ ] **404 페이지**: 존재하지 않는 URL 접근 시 404 페이지 표시
- [ ] **폼 에러**: 유효하지 않은 입력 시 실시간 에러 메시지

### 4. 데이터 지속성 테스트

#### 로컬스토리지 테스트
- [ ] **좋아요 상태**: 페이지 새로고침 후에도 좋아요 상태 유지
- [ ] **로그인 상태**: 페이지 새로고침 후에도 로그인 상태 유지
- [ ] **사용자 정보**: 대시보드에서 사용자 정보 정상 표시

#### 세션 관리 테스트
- [ ] **자동 로그인**: 브라우저 재시작 후에도 로그인 상태 유지
- [ ] **로그아웃**: 로그아웃 후 보호된 페이지 접근 불가
- [ ] **세션 만료**: 세션 만료 시 자동 로그아웃 및 로그인 페이지 이동

### 5. 성능 테스트

#### 로딩 속도 테스트
- [ ] **초기 로딩**: 첫 페이지 로딩 시간 3초 이내
- [ ] **이미지 로딩**: 맛집 이미지 로딩 최적화
- [ ] **캐싱**: React Query 캐싱으로 재방문 시 빠른 로딩

#### 메모리 사용량 테스트
- [ ] **메모리 누수**: 장시간 사용 후 메모리 사용량 확인
- [ ] **컴포넌트 언마운트**: 페이지 이동 시 이전 컴포넌트 정상 정리

---

## 🧪 로컬 테스트

### 서버 (포트 5000)
```bash
cd pwd-week6-server
npm install
npm start
# http://localhost:5000 에서 실행
```

### 클라이언트 (포트 5173)  
```bash
cd pwd-week6-client
npm install
npm run dev
# http://localhost:5173 에서 실행
```

### 환경변수 설정

**클라이언트 (.env.local):**
```env
VITE_API_URL=http://localhost:5000
VITE_CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**서버 (.env):**
```env
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/foodmap
SESSION_SECRET=dev-secret-key
```

---

## 🔍 배포 검증 체크리스트

### ✅ 서버 체크
- [ ] Health check: `GET /health`
- [ ] CORS 헤더 정상
- [ ] 데이터베이스 연결 확인
- [ ] 인증 API 동작 확인

### ✅ 클라이언트 체크  
- [ ] 페이지 로딩 정상
- [ ] API 호출 성공
- [ ] OAuth 로그인 동작
- [ ] 라우팅 정상 작동

### ✅ 연동 체크
- [ ] 회원가입/로그인 성공
- [ ] 세션 유지 확인
- [ ] 맛집 데이터 로드
- [ ] 맛집 제보 기능

---

## 🚨 트러블슈팅

### 1. 인증 관련 문제

#### CORS 에러
```
Access to fetch at 'https://server.com' from origin 'https://client.com' 
has been blocked by CORS policy
```
**해결 방법**:
1. 서버의 `CLIENT_URL` 환경변수를 클라이언트 도메인으로 설정
2. 서버에서 CORS 설정 확인:
   ```js
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```

#### 로그인 후 리다이렉트 안됨
**증상**: 로그인 성공 후에도 로그인 페이지에 머물러 있음
**해결 방법**:
1. AuthContext의 `login` 함수에서 상태 업데이트 확인
2. 브라우저 개발자 도구에서 네트워크 탭 확인
3. 서버 응답에서 사용자 정보가 올바르게 반환되는지 확인

#### 세션 유지 안됨
**증상**: 페이지 새로고침 시 로그아웃됨
**해결 방법**:
1. `withCredentials: true` 설정 확인
2. HTTPS 환경에서 쿠키 설정 확인
3. 세션 쿠키가 정상적으로 설정되는지 확인
4. 서버의 세션 설정 확인 (MongoDB 연결, 세션 시크릿)
5. 브라우저 개발자 도구에서 쿠키 탭 확인

### 2. OAuth 관련 문제

#### Google OAuth 리다이렉트 에러
**해결 방법**:
1. Google Cloud Console에서 Callback URL을 배포된 서버 URL로 업데이트
2. OAuth 클라이언트 ID와 시크릿이 올바른지 확인
3. 서버의 Google OAuth 설정 확인

#### Naver OAuth 설정 문제
**해결 방법**:
1. Naver Developers에서 애플리케이션 등록 확인
2. Callback URL 설정 확인
3. 클라이언트 ID와 시크릿 확인

### 3. 라우팅 관련 문제

#### 404 에러 (Vercel 배포 시)
**증상**: 새로고침 시 404 에러 발생
**해결 방법**:
1. `vercel.json` 파일에서 SPA 라우팅 설정 확인:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

#### 보호된 라우트 무한 리다이렉트
**증상**: 로그인 페이지에서 무한 리다이렉트 발생
**해결 방법**:
1. AuthContext의 `isLoading` 상태 확인
2. `checkAuthStatus` 함수의 에러 처리 확인
3. 서버 연결 상태 확인

### 4. API 관련 문제

#### API 요청 실패
**증상**: 맛집 데이터가 로드되지 않음
**해결 방법**:
1. 서버가 실행 중인지 확인
2. API URL이 올바른지 확인
3. CORS 설정 확인
4. 네트워크 탭에서 요청/응답 확인

#### React Query 캐싱 문제
**증상**: 데이터가 업데이트되지 않음
**해결 방법**:
1. React Query DevTools 설치 및 사용
2. `staleTime` 설정 조정
3. `queryKey`가 올바른지 확인

### 5. 성능 관련 문제

#### 느린 로딩 속도
**해결 방법**:
1. 이미지 최적화 (WebP 형식 사용)
2. 코드 스플리팅 적용
3. 불필요한 리렌더링 방지 (React.memo, useMemo 사용)

#### 메모리 누수
**해결 방법**:
1. useEffect cleanup 함수 추가
2. 이벤트 리스너 정리
3. 타이머 정리

### 6. 배포 관련 문제

#### 환경 변수 설정 오류
**해결 방법**:
1. Vercel 대시보드에서 환경 변수 확인
2. 변수명이 `VITE_`로 시작하는지 확인
3. 빌드 후 재배포

#### 빌드 실패
**해결 방법**:
1. 로컬에서 `npm run build` 테스트
2. 의존성 버전 확인
3. Node.js 버전 확인

### 7. 개발 도구 활용

#### React Developer Tools
- 컴포넌트 상태 확인
- Props 전달 확인
- 리렌더링 원인 파악

#### Redux DevTools (선택사항)
- 전역 상태 디버깅
- 액션 추적

#### Network 탭
- API 요청/응답 확인
- CORS 에러 확인
- 요청 헤더 확인

### 8. 일반적인 해결 방법

#### 캐시 문제
```bash
# 브라우저 캐시 삭제
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)

# 개발 서버 재시작
npm run dev
```

#### 의존성 문제
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
```

#### 환경 변수 문제
```bash
# .env 파일 확인
cat .env

# 환경 변수 로드 확인
console.log(import.meta.env.VITE_API_URL)
```

---

## 📝 배포 후 할 일

1. **도메인 설정** (선택사항)
   - Vercel에서 커스텀 도메인 연결
   - Render에서 커스텀 도메인 연결

2. **모니터링 설정**
   - Render: 서버 로그 모니터링
   - Vercel: 함수 성능 모니터링

3. **백업 설정**
   - MongoDB Atlas 자동 백업 활성화

4. **보안 강화**
   - 환경변수 보안 재점검
   - HTTPS 강제 설정

---

## 🌐 기존 Netlify 배포 (참고용)

### 1. Netlify 계정 연결

1. [app.netlify.com](https://app.netlify.com) 로그인
2. `Add new site` 클릭
3. `Import an existing project` 선택

### 2. GitHub 연결

1. `Deploy with GitHub` 선택
2. GitHub 권한 승인
3. 리포지토리 검색: `pwd-week6-client`
4. 리포지토리 선택

### 3. 빌드 설정

자동으로 감지되지만, 확인 필요:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

`Deploy site` 클릭!

### 4. 배포 상태 확인

1. 배포 진행 상황 모니터링 (3-5분 소요)
2. 성공 시 URL 생성: `https://pwd-week6-client-<username>.netlify.app`

### 5. 사이트 이름 변경

1. `Site configuration` → `Site details`
2. `Change site name` 클릭
3. 원하는 이름 입력: `pwd-week6-client-<username>`
4. 새 URL: `https://pwd-week6-client-<username>.netlify.app`

### 6. Forms 확인

1. Netlify 대시보드 → `Forms` 탭
2. `restaurant-submit` 폼이 보이면 성공!
3. 테스트 제출 후 데이터 확인

---

## 🐛 트러블슈팅

### 문제 1: Netlify 배포 실패

```
Deploy directory 'dist' does not exist

# 해결방법
1. Netlify 대시보드 → Site configuration
2. Build & deploy → Build settings
3. Publish directory를 'build'로 변경
4. Save → Retry deploy
```

### 문제 2: Forms가 작동하지 않음

```html
<!-- public/index.html 확인 -->
<!-- 1. 숨겨진 폼이 있는지 -->
<!-- 2. netlify 속성이 있는지 -->
<!-- 3. form name이 일치하는지 -->
```

## 💬 도움 & 질문
- [Practical Web Service TA] (https://chatgpt.com/g/g-68bbbf3aa57081919811dd57100b1e46-ajou-digtalmedia-practical-web-service-ta)
---


---
## 📚 추가 학습 자료

### 공식 문서
- [React 공식 문서](https://react.dev)
- [React Router 문서](https://reactrouter.com)

### 추천 강의
- [생활코딩 React](https://opentutorials.org/course/4900)


## 📝 제출 방법
### 마감일
- 10월 19일 23시 59분 까지
### GitHub URL 
(예: https://github.com/<username>/pwd-week6-client)
### Netlify App URL 
(예: https://pwd-week6-client-<username>.netlify.app)
### 실습 체크리스트
- GitHub 저장소에 프로젝트 버전 관리가 바르게 되고 있는가?
- React로 개발한 컴포넌트와 페이지들이 모두 바르게 동작하는가?
- Netlify에 GitHub 저장소가 연결되어 자동 배포가 이루어 지고 있는가?
- 맛집 정보 제출 시 Netlify 서버에 데이터가 잘 제출 되었는가?


## 🔐 인증 시스템 사용법

### 1. 회원가입 및 로그인
- 이메일/비밀번호로 직접 가입 또는 로그인
- 구글/깃허브 OAuth로 간편 로그인
- 자동 세션 관리

### 2. 보호된 기능들
로그인이 필요한 기능들:
- ✅ 맛집 제보 (`/submit`)
- ✅ 사용자 대시보드 (`/dashboard`)
- ✅ 관리자 페이지 (`/admin`)
- ✅ 제출된 제보 관리 (`/submissions`)

### 3. 상태 관리
```jsx
// 인증 상태 사용하기
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (isAuthenticated) {
    return <p>안녕하세요, {user.name}님!</p>;
  }
  
  return <LoginForm />;
}
```

## 🎉 축하합니다! 완전한 React 웹 애플리케이션 완성!

### 🏆 달성한 성과

이제 여러분은 **인증 시스템이 포함된 완전한 React 웹 애플리케이션**을 성공적으로 개발했습니다!

#### ✨ **핵심 기능 구현**
- **완전한 사용자 인증 시스템**: 회원가입, 로그인, 로그아웃
- **소셜 로그인**: Google, Naver OAuth 연동
- **세션 기반 인증**: 안전한 세션 관리
- **보호된 라우트**: 로그인 필요 페이지 자동 보호
- **관리자 권한 시스템**: 일반 사용자/관리자 구분
- **사용자 대시보드**: 개인화된 사용자 페이지

#### 🛠️ **기술 스택 숙련도**
- **React 19.1**: 최신 React 기능 활용
- **Context API**: 전역 상태 관리
- **React Query**: 서버 상태 관리 및 캐싱
- **React Router v7**: 클라이언트 사이드 라우팅
- **Emotion**: CSS-in-JS 스타일링
- **React Hook Form**: 폼 상태 관리
- **Axios**: HTTP 클라이언트
- **Vercel**: 클라우드 배포

#### 🎯 **실무 역량**
- **풀스택 개발**: 프론트엔드 + 백엔드 연동
- **보안 구현**: 세션 기반 인증, CORS, 권한 관리
- **사용자 경험**: 로딩 상태, 에러 처리, 반응형 디자인
- **배포 및 운영**: Vercel + Render 클라우드 배포
- **버전 관리**: Git + GitHub 협업

### 🎯 **최종 체크리스트**

배포 완료 후 다음 사항들을 확인해보세요:

- [ ] **모든 페이지 정상 작동**: 홈, 목록, 상세, 인기, 제보, 로그인, 회원가입, 대시보드
- [ ] **인증 시스템 완벽 작동**: 회원가입, 로그인, 로그아웃, 세션 유지
- [ ] **보호된 라우트 정상 작동**: 로그인 필요 페이지 접근 제어
- [ ] **관리자 권한 정상 작동**: 관리자 전용 페이지 접근 제어
- [ ] **반응형 디자인**: 모바일, 태블릿, 데스크톱에서 정상 표시
- [ ] **성능 최적화**: 빠른 로딩 속도, 부드러운 사용자 경험
- [ ] **에러 처리**: 네트워크 오류, 404 페이지 등 적절한 에러 처리
- [ ] **보안**: CORS, 세션 기반 인증, HTTPS 등 보안 설정 완료

---

## 🎊 **프로젝트 완성!**

축하합니다! 이제 **완전한 사용자 인증 시스템을 갖춘 React 웹 애플리케이션**을 성공적으로 개발했습니다. 

**Happy Coding! 🚀**

---

*Last Updated: 2025.10.13*  
*Created by: Hyunseok Oh - Ajou Digital Media Practical Web Service*