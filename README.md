# 🎨 DrawStarter

> **DrawStarter**는 디지털 아티스트와 일러스트레이터들이 매일 창작을 시작할 수 있도록 돕는 웹앱입니다.  
> "오늘 그릴 게 없을 때", "그릴 시간 확보가 어려울 때" — DrawStarter가 여러분의 시작을 함께합니다.

---

## ✨ 주요 기능 (MVP 기준)

- 📝 **랜덤 주제 생성기**  
  매일 새로운 드로잉 주제를 제공 (명사 + 스타일 + 분위기 조합)

- ⏱️ **Pomodoro 기반 타이머**  
  25분 집중 타이머로 창작 시간 확보

- 💾 **로컬 저장 기반 누적 시간 기록**  
  내가 얼마나 그리고 있는지 시각화

- 📱 **모바일 최적화**  
  반응형 디자인으로 언제 어디서든 사용 가능

---

## 🔧 기술 스택

| 기술 | 설명 |
|------|------|
| [Next.js (App Router)](https://nextjs.org/) | 프레임워크 |
| [TypeScript](https://www.typescriptlang.org/) | 타입 안정성 |
| [Tailwind CSS](https://tailwindcss.com/) | 빠른 UI 구현 |
| localStorage | 사용자 누적 시간 저장 |
| (옵션) GPT API | 고급 주제 자동 생성 (계획 중) |

---

## 🗂️ 프로젝트 구조

```
drawstarter/
├── app/              # 페이지 구성 (홈, 타이머, 완료 등)
├── components/       # UI 컴포넌트
├── lib/              # 로직 유틸 (주제 생성, 시간 계산 등)
├── styles/           # 글로벌 CSS
├── types/            # 타입 정의
└── public/           # 정적 파일 (아이콘, OG 이미지 등)
```

---

## 🚀 실행 방법

```bash
# 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# Vercel 등에 배포 준비
npm run build
