# 이력서 작성기 (Resume Builder)

AI 개발자를 위한 전문적인 이력서 작성 도구입니다. 모던한 UI와 다양한 기능을 제공하여 체계적이고 전문적인 이력서를 작성할 수 있습니다.

## 🚀 주요 기능

- **📝 Rich Text Editor**: 굵게, 기울임, 목록 등 다양한 텍스트 서식 지원
- **🎨 테마 시스템**: 파스텔 컬러 테마와 랜덤 멀티컬러 테마
- **💾 자동 저장**: 실시간 자동 저장으로 데이터 손실 방지
- **📄 PDF 생성**: 고품질 PDF 이력서 생성 및 다운로드
- **🔍 미리보기**: 실시간 이력서 미리보기
- **📊 기술스택 관리**: 카테고리별 기술스택 분류 및 관리
- **📁 데이터 관리**: JSON 형식으로 데이터 내보내기/가져오기

## 📁 프로젝트 구조

```
이력서/
├── index.html                 # 메인 HTML 파일
├── README.md                  # 프로젝트 설명서
├── css/
│   └── styles.css            # 스타일시트
├── js/
│   ├── main.js               # 메인 애플리케이션 파일
│   ├── modules/              # JavaScript 모듈들
│   │   ├── core.js           # 핵심 기능 (초기화, 유틸리티)
│   │   ├── theme.js          # 테마 관리
│   │   ├── ui-controller.js  # UI 컨트롤 (토스트, 미리보기)
│   │   ├── form-manager.js   # 폼 관리 (자동저장, 동적 항목)
│   │   ├── rich-editor.js    # Rich Text Editor
│   │   ├── skills-manager.js # 기술스택 관리
│   │   ├── data-manager.js   # 데이터 관리 (저장/복원)
│   │   └── resume-generator.js # 이력서 생성 (HTML/PDF)
│   └── utils/
│       └── script-backup.js  # 기존 스크립트 백업
└── assets/
    └── images/               # 이미지 파일들
```

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PDF 생성**: html2canvas, jsPDF, html2pdf.js
- **스타일링**: CSS Grid, Flexbox, CSS Variables
- **모듈화**: ES6 Modules 패턴

## 🚀 시작하기

1. **저장소 클론**
   ```bash
   git clone [repository-url]
   cd 이력서
   ```

2. **로컬 서버 실행**
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx http-server

   # PHP
   php -S localhost:8000
   ```

3. **브라우저에서 접속**
   ```
   http://localhost:8000
   ```

## 📋 사용법

### 1. 기본 정보 입력
- 이름, 이메일, 연락처 등 기본 정보 입력
- 프로필 사진 업로드 (선택사항)

### 2. 이력서 내용 작성
- **학력사항**: 학교명, 전공, 졸업구분 등
- **경력사항**: 회사명, 직책, 주요업무, 성과 등
- **프로젝트**: 개인/단체 프로젝트 구분하여 작성
- **기술스택**: 카테고리별로 기술 분류
- **자기소개**: 다양한 주제로 자기소개 작성

### 3. Rich Text Editor 사용
- **굵게**: `Ctrl+B` 또는 툴바 버튼
- **기울임**: `Ctrl+I` 또는 툴바 버튼
- **목록**: 툴바의 목록 버튼 사용
- **번호 목록**: 번호 지정 목록 생성

### 4. 테마 변경
- 우측 상단의 테마 버튼으로 색상 변경
- 랜덤 멀티컬러 테마로 다양한 색상 조합 시도

### 5. 미리보기 및 PDF 생성
- **미리보기**: 실시간으로 이력서 확인
- **PDF 다운로드**: 고품질 PDF 파일 생성

## 🔧 모듈 구조

### Core Module (`core.js`)
- 전역 변수 관리
- 페이지 초기화
- 기본 유틸리티 함수들

### Theme Module (`theme.js`)
- 테마 변경 및 관리
- 랜덤 색상 생성
- CSS 변수 동적 설정

### UI Controller (`ui-controller.js`)
- 토스트 알림 시스템
- 미리보기 기능
- 폼 초기화

### Form Manager (`form-manager.js`)
- 자동 저장 기능
- 동적 항목 추가/삭제
- 폼 데이터 관리

### Rich Editor (`rich-editor.js`)
- Rich Text Editor 초기화
- 툴바 및 명령어 처리
- 텍스트 서식 관리

### Skills Manager (`skills-manager.js`)
- 기술스택 데이터 수집/복원
- 기술 분류 로직
- 대시보드 요약 계산

### Data Manager (`data-manager.js`)
- 폼 데이터 수집/복원
- JSON 내보내기/가져오기
- 하이라이트 추출

### Resume Generator (`resume-generator.js`)
- HTML 이력서 생성
- PDF 생성 및 다운로드
- 다양한 PDF 생성 방법

## 💾 데이터 관리

### 자동 저장
- 3초마다 자동으로 데이터 저장
- 브라우저 새로고침 시에도 데이터 유지

### 수동 저장/불러오기
- 임시저장 버튼으로 수동 저장
- 저장된 데이터 불러오기 기능

### 데이터 내보내기/가져오기
- JSON 형식으로 데이터 내보내기
- 다른 기기에서 데이터 가져오기

## 🎨 테마 시스템

### 기본 테마
- 파스텔 블루, 그린, 퍼플, 오렌지, 레드, 그레이

### 랜덤 멀티컬러
- 완전 랜덤, 보완색 관계, 삼각형 색상 관계
- HSL 색상 공간을 활용한 조화로운 색상 생성

## 📄 PDF 생성

### 지원 형식
- A4 크기, 세로 방향
- 고품질 이미지 (2x 스케일)
- 페이지 브레이크 자동 처리

### 생성 방법
1. **html2canvas + jsPDF**: 기본 방법
2. **html2pdf.js**: 백업 방법
3. **대안 방법**: 다양한 옵션으로 PDF 생성

## 🔍 개발자 정보

### 브라우저 지원
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 성능 최적화
- 모듈화를 통한 코드 분할
- 지연 로딩 (Lazy Loading)
- 메모리 누수 방지

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 이슈를 통해 남겨주세요.

---

**이력서 작성기** - AI 개발자를 위한 전문적인 이력서 작성 도구 🚀
