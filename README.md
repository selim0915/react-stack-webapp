# React Stack WebApp

React 스택으로 구축된 현대적인 웹 애플리케이션입니다.

* 🔗 https://react-stack-webapp.vercel.app

<br />

## 1. 개요 (Overview)

### 1.1. 기술 스택
| 분류 | 기술 |
| :--- | :--- |
| **프론트엔드** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **백엔드** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) |
| **데이터베이스** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) |
| **실시간 통신** | ![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=flat-square&logo=socketdotio&logoColor=white) |
| **테스트** | ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white) |
| **배포** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

### 1.2. 주요 기능
- **로그인/회원가입**: JWT 기반 인증 및 사용자/관리자 역할 관리
- **게시판**: 공지사항, 자유게시판
- **채팅**: WebSocket 기반의 실시간 채팅방
- **마이페이지**: 사용자 정보 관리

### 1.3. 시스템 구성
- **웹 서버**: 고성능 프론트엔드 및 API 호스팅
- **웹소켓 서버**: 실시간 양방향 통신
- **데이터베이스**: 확장 가능한 NoSQL 데이터 관리
- **테스트 환경**: 통합 품질 보증 환경

<br />

## 2. 개발 환경 설정
```bash
$ npm run dev 
# https://localhost:4002
```
```bash
$ npm run server:dev
$ npm run client:dev
# https://localhost:4000
```

<br />

## 3. 빌드 및 배포

### 3.1. 빌드 (Build)
프로덕션용 정적 파일이 `/dist` 폴더에 생성됩니다.
```bash
$ npm run build
```

### 3.2. 배포 (Deployment)
#### 3.2.1. 자동 배포
GitHub 리포지토리를 Vercel 대시보드에 연결하면 푸시할 때마다 자동으로 배포됩니다.

#### 3.2.2. 수동 배포
```bash
$ npm run deploy
```
