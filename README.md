# 🎨 그라디언트 생성기 (Gradient Generator)

> 아름다운 CSS 그라디언트를 쉽고 빠르게 만들어주는 웹 도구

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

## ✨ 주요 기능

### 🌈 **5가지 그라디언트 타입**
- **선형 그라디언트** - 직선 방향의 기본 그라디언트
- **방사형 그라디언트** - 중심에서 바깥으로 퍼지는 원형/타원형
- **원뿔형 그라디언트** - 회전하는 원뿔 모양 (로고, 아이콘에 효과적)
- **반복 선형** - 패턴이 반복되는 선형 그라디언트
- **반복 방사형** - 패턴이 반복되는 방사형 그라디언트

### 🎯 **실시간 프리뷰**
- **기본 모드**: 순수 그라디언트 미리보기
- **요소 모드**: 버튼, 카드, 텍스트 등 실제 UI 요소에 적용된 모습
- **모바일 모드**: 모바일 앱 화면에서의 적용 모습

### 🎨 **고급 색상 편집**
- **무제한 색상 지점** 추가/제거
- **직관적인 슬라이더** + 정확한 숫자 입력
- **컬러 피커**로 정밀한 색상 선택
- **위치 조절** (0-100%)

### ⚙️ **세밀한 컨트롤**
- **각도 조절** (0-360°) - 선형, 원뿔형 그라디언트
- **방사형 모양** - 원형/타원형 선택
- **중심점 위치** - 원뿔형 그라디언트 중심 조절 (X, Y축)

### 🎪 **프리셋 & 히스토리**
- **12개 프리셋** - 선셋, 오션, 네온, 레인보우 등
- **랜덤 생성** - 자동으로 아름다운 조합 생성
- **히스토리 저장** - 최근 10개 그라디언트 자동 보관
- **원클릭 복원** - 저장된 그라디언트 즉시 적용

### 💻 **개발자 친화적**
- **CSS 코드 복사** - 클립보드로 바로 복사
- **실시간 코드 업데이트** - 변경사항 즉시 반영
- **크로스 브라우저** - 모든 모던 브라우저 지원

## 🚀 빠른 시작

### 설치

```bash
# 1. 프로젝트 생성
npm create vite@latest gradient-generator -- --template react
cd gradient-generator

# 2. 의존성 설치
npm install
npm install -D tailwindcss@^3.0.0 postcss autoprefixer
npm install lucide-react@^0.263.1

# 3. Tailwind 초기화
npx tailwindcss init -p
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── GradientGenerator.jsx    # 메인 컨테이너
│   ├── GradientPreview.jsx      # 3가지 프리뷰 모드
│   ├── CodeOutput.jsx           # CSS 코드 출력
│   ├── GradientControls.jsx     # 타입/각도 컨트롤
│   ├── ColorStopsEditor.jsx     # 색상 편집기
│   ├── PresetGallery.jsx        # 프리셋 + 히스토리
│   └── Footer.jsx               # 푸터
├── hooks/
│   ├── useGradient.js           # 그라디언트 상태 관리
│   └── useClipboard.js          # 클립보드 기능
├── utils/
│   └── gradientUtils.js         # 그라디언트 생성 유틸리티
└── data/
    └── presets.js               # 12개 프리셋 데이터
```

## 🎨 사용법

### 1. **기본 그라디언트 만들기**
1. 그라디언트 타입 선택 (선형/방사형/원뿔형 등)
2. 색상 추가/제거 및 위치 조절
3. 각도나 중심점 설정 (타입에 따라)
4. 실시간으로 미리보기 확인

### 2. **프리뷰 모드 활용**
- **기본**: 순수한 그라디언트 모양 확인
- **요소**: 버튼, 카드, 텍스트에 적용된 모습
- **모바일**: 실제 앱 화면에서의 모습

### 3. **코드 사용하기**
1. 마음에 드는 그라디언트 완성
2. "복사" 버튼으로 CSS 코드 복사
3. 프로젝트에 붙여넣기

```css
/* 생성된 CSS 예시 */
background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);
```

### 4. **히스토리 관리**
- **자동 저장**: 랜덤 생성, 프리셋 적용 시
- **수동 저장**: "저장" 버튼으로 현재 그라디언트 보관
- **빠른 접근**: 최근 그라디언트에서 원클릭 복원

## 🛠️ 기술 스택

- **Frontend**: React 18.2.0 + Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React 0.263.1
- **Font**: Chiron Sung HK (Google Fonts)
- **State Management**: React Hooks (useState, useCallback)

## 📱 브라우저 지원

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## 🎯 주요 특징

### ✅ **사용자 경험**
- **반응형 디자인** - 데스크톱, 태블릿, 모바일 최적화
- **다크 테마** - 눈에 편한 어두운 UI
- **부드러운 애니메이션** - 모든 상호작용에 자연스러운 전환
- **직관적 인터페이스** - 드래그, 클릭, 입력으로 쉬운 조작

### ⚡ **성능**
- **실시간 렌더링** - 변경사항 즉시 반영
- **최적화된 상태 관리** - 불필요한 리렌더링 방지
- **경량화** - 빠른 로딩과 부드러운 동작

### 🎨 **디자인**
- **컴포넌트 기반** - 재사용 가능한 모듈식 구조
- **타입세이프** - PropTypes로 안전한 데이터 전달
- **접근성** - 키보드 내비게이션 및 스크린 리더 지원

## 🤝 기여하기

1. 이 저장소를 Fork 하세요
2. Feature 브랜치를 만드세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 열어주세요

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 개발자

**Made by devdduddu** ❤️

---

## 🔮 향후 계획

- [ ] 이미지로 내보내기 (PNG, SVG)
- [ ] URL 공유 기능
- [ ] 키보드 단축키
- [ ] 색상 팔레트 추출
- [ ] 그라디언트 애니메이션
- [ ] 더 많은 프리셋 추가

---

### 🌟 이 프로젝트가 유용하다면 Star를 눌러주세요!

**그라디언트 생성기**로 더 아름다운 웹을 만들어보세요 🎨