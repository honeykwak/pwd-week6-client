# 📚 PWD Week 3 - React와 Netlify로 만드는 Ajou Campus Foodmap

> **실용 웹 개발 3주차**: React의 핵심 개념을 학습하고, 실제 작동하는 웹 서비스를 Netlify에 배포합니다.
## 📋 강의 자료
- [3주차 강의자료](https://drive.google.com/file/d/1EXfyxPi06jV5YWpDnW5Upiwt3Xv8j2Ec/view?usp=drive_link)

---

## 🎯 프로젝트 소개

### 만들게 될 서비스
**아주 캠퍼스 푸드맵** - 아주대학교 주변 맛집을 소개하고 제보받는 커뮤니티 서비스

### 주요 기능
- 🔐 **사용자 인증 시스템**
  - 이메일/비밀번호 로그인/회원가입
  - 구글/깃허브 OAuth 로그인
  - 세션 기반 인증 관리
- 🍜 맛집 목록 보기 (실시간 데이터)
- ❤️ 좋아요 기능 (데이터베이스 저장)
- 🔍 카테고리별 필터링
- 📝 맛집 제보 (인증된 사용자만)
- 🏆 인기 TOP 5
- 👤 사용자 대시보드
- 🛡️ 보호된 라우트
- 📱 반응형 디자인

### 사용 기술
- **Frontend**: React 19.1
- **Vite**: Build Tool
- **Routing**: React Router v7
- **Styling**: Emotion (CSS-in-JS)
- **Forms**: React Hook Form
- **State Management**: 
  - useState, useEffect
  - Context API (인증 상태)
  - React Query (서버 상태)
- **API**: Axios
- **Authentication**: 
  - JWT/Session based
  - OAuth (Google, GitHub)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Deployment**: Netlify (Frontend) + Railway (Backend)

---

## ✅ 사전 준비사항

### 1. 필수 프로그램 설치

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

### 2. 계정 준비
- ✅ [GitHub 계정](https://github.com) (코드 저장용)
- ✅ [Netlify 계정](https://netlify.com) (배포용 - GitHub 계정으로 가입 권장)

### 3. 에디터 준비
- 📝 [VS Code](https://code.visualstudio.com) 권장
- 추천 확장 프로그램:  
  - Prettier: 코드 스타일을 자동으로 정리하여 일관된 형식을 유지
  - Auto Rename Tag: HTML/XML 태그의 시작 또는 종료 태그를 수정하면 자동으로 짝 태그도 함께 변경

---

## 🚀 프로젝트 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음과 같이 설정하세요:

```env
# 서버 API URL
VITE_API_URL=http://localhost:5000

# 클라이언트 URL (OAuth 리다이렉트용)
VITE_CLIENT_URL=http://localhost:5173
```

### Step 1: React + Vite 프로젝트 개발환경 구축

```bash
# React 프로젝트 폴더 생성성
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
### 각 라이브러리 설명

| 라이브러리 | 용도 | 버전 |
|-----------|------|------|
| react-dom | Dom 관리 | ^19.1.1 |
| react-router-dom | 페이지 라우팅 | ^7.9.1 |
| axios | HTTP 통신 | ^1.12.1 |
| react-hook-form | 폼 관리 | ^7.62.0 |
| @emotion/react | CSS-in-JS | ^11.11.0
| @tanstack/react-query |서버 상태 관리 | ^5.87.4 | |
| react-icons | 아이콘 | ^5.5.0 |
| react-toastify | 알림 메시지 | ^11.0.5 |
| react-spinners | 로딩 애니메이션 | ^0.17.0 |
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
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
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
mkdir src/components src/pages src/services src/styles
```

### 최종 구조

```
pwd-week6-client/
├── src/
│   ├── components/         # 재사용 컴포넌트
│   │   ├── Header.jsx
│   │   ├── NotFound.jsx
│   │   ├── PopularRestaurants.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── RestaurantList.jsx
│   │   ├── SubmitRestaurant.jsx
│   │   └── ProtectedRoute.jsx    # 🔐 보호된 라우트
│   ├── contexts/          # 🆕 Context API
│   │   └── AuthContext.jsx       # 🔐 인증 상태 관리
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── DetailPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ListPage.jsx
│   │   ├── PopularPage.jsx
│   │   ├── SubmitPage.jsx
│   │   ├── AdminPage.jsx
│   │   ├── SubmissionsPage.jsx
│   │   ├── LoginPage.jsx         # 🔐 로그인 페이지
│   │   ├── RegisterPage.jsx      # 🔐 회원가입 페이지
│   │   └── DashboardPage.jsx     # 🔐 사용자 대시보드
│   ├── services/          # API 로직
│   │   ├── api.jsx               # 일반 API
│   │   └── authApi.js            # 🔐 인증 API
│   ├── styles/            # 스타일
│   │   └── GlobalStyles.jsx
│   ├── App.css           # 기본 스타일
│   ├── App.jsx           # 메인 앱 (라우터 + 인증)
│   ├── index.css         # 기본 스타일
│   └── main.jsx          # 진입점
├── .env                  # 🆕 환경 변수
├── .env.example          # 환경 변수 예시
├── .gitignore
├── index.html
├── package.json
└── README.md
└── vite.config.js
```

---

## 🔧 핵심 컴포넌트 구현

### 1. index.html 수정 (Netlify Forms 추가)

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

### 2. 메인 앱 구조
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

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import SubmitPage from './pages/SubmitPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';

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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/restaurant/:id" element={<DetailPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/submit" element={<SubmitPage />} />
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
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  max-width: 600px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Ajou Campus Foodmap
      </h1>
      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular Top 3
        </NavLink>
        <NavLink to="/submit" className={isActive('/submit')}>
          <FaPlus /> Submit New restaurant
        </NavLink>
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
- **프론트엔드**: Vercel
- **백엔드**: Render
- **데이터베이스**: MongoDB Atlas

### ⚙️ 환경 변수 설정

**로컬 개발 환경 (.env.local):**
```env
VITE_API_URL=http://localhost:5000
VITE_CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**프로덕션 환경 (Vercel 환경변수):**
```env
VITE_API_URL=https://your-app-name.onrender.com
VITE_CLIENT_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

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
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret  
GITHUB_CALLBACK_URL=https://your-app-name.onrender.com/api/auth/github/callback
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
GITHUB_CALLBACK_URL=https://your-actual-render-app.onrender.com/api/auth/github/callback
```

### Vercel (클라이언트) 환경변수 업데이트:
```  
VITE_API_URL=https://your-actual-render-app.onrender.com
VITE_CLIENT_URL=https://your-actual-vercel-app.vercel.app
```

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

### CORS 에러
```
Access to fetch at 'https://server.com' from origin 'https://client.com' 
has been blocked by CORS policy
```
**해결**: 서버의 `CLIENT_URL` 환경변수를 클라이언트 도메인으로 설정

### OAuth 리다이렉트 에러
**해결**: Google/GitHub 콘솔에서 Callback URL을 배포된 서버 URL로 업데이트

### 세션 유지 안됨
**해결**: 
1. `withCredentials: true` 설정 확인
2. HTTPS 환경에서 쿠키 설정 확인

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
- [Netlify 문서](https://docs.netlify.com)

### 추천 강의
- [생활코딩 React](https://opentutorials.org/course/4900)


## 📝 제출 방법
### 마감일
- 9월 21일 11시 59분 까지
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

## 🎉 축하합니다!

이제 여러분은:
- ✨ React로 실제 작동하는 풀스택 웹 서비스를 만들었습니다
- ✨ 사용자 인증 시스템을 구현할 수 있습니다
- ✨ OAuth (Google, GitHub) 로그인을 연동할 수 있습니다
- ✨ Context API로 전역 상태를 관리할 수 있습니다
- ✨ 보호된 라우트를 구현할 수 있습니다
- ✨ Node.js 백엔드와 React 프론트엔드를 연동할 수 있습니다
- ✨ 주요 React 라이브러리를 사용할 수 있습니다
- ✨ Git과 GitHub를 활용할 수 있습니다

**다음 주**: 고급 기능 추가 및 배포 최적화

---

*Last Updated: 2025.09-15*  
*Created by: Hyunseok Oh - Ajou Digital Media Practical Web Service*