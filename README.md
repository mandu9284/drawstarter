# 🎨 DrawStarter: 당신의 창작을 시작하는 가장 쉬운 방법

**DrawStarter**는 디지털 아티스트와 일러스트레이터들이 창작의 장벽을 넘고, 매일 꾸준히 그림을 그릴 수 있도록 돕는 웹 애플리케이션입니다. "오늘 무엇을 그릴지 막막할 때", "작업 시간을 꾸준히 확보하고 싶을 때", DrawStarter가 여러분의 창작 여정을 함께합니다.

---

## ✨ 주요 기능

- **✍️ 랜덤 주제 생성기:** 영감이 떠오르지 않을 때, 버튼 하나로 다채로운 드로잉 주제를 즉시 제안받을 수 있습니다.
- **👤 사용자 인증 시스템:** 이메일과 비밀번호로 간편하게 가입하고 로그인하여 모든 데이터를 안전하게 관리하세요.
- **⏱️ 집중 타이머:** 설정된 시간 동안 온전히 작업에만 집중할 수 있도록 도와주는 타이머입니다. (시작, 정지, 리셋 기능 포함)
- **📈 작업 시간 자동 기록:** 타이머를 사용한 시간이 자동으로 기록되어, 나의 작업 패턴과 누적 시간을 한눈에 파악할 수 있습니다.
- **📱 모바일 최적화:** 반응형 디자인으로 설계되어 언제 어디서든 스마트폰, 태블릿, PC에서 동일한 경험을 제공합니다.

---

## 🔧 기술 스택

| 구분       | 기술                                                                  |
| ---------- | --------------------------------------------------------------------- |
| **프레임워크** | [Next.js (App Router)](https://nextjs.org/)                           |
| **언어**     | [TypeScript](https://www.typescriptlang.org/)                         |
| **스타일링**   | [Tailwind CSS](https://tailwindcss.com/)                              |
| **백엔드 & DB** | [Supabase](https://supabase.io/) (인증, 데이터베이스, 스토리지)       |
| **상태 관리**  | [React Context API](https://react.dev/learn/passing-data-deeply-with-context) |
| **코드 품질**  | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)        |
| **CI/CD**    | [GitHub Actions](https://github.com/features/actions)                 |
| **배포**     | [Vercel](https://vercel.com/)                                         |

---

## 🚀 시작하기

로컬 환경에서 프로젝트를 실행하려면 다음 단계를 따르세요.

**1. 저장소 복제**

```bash
git clone https://github.com/mandu9284/drawstarter.git
cd drawstarter
```

**2. 의존성 설치**

```bash
npm install
```

**3. 환경 변수 설정**

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고, Supabase 프로젝트의 환경 변수를 추가합니다. Supabase 대시보드의 **Project Settings > API**에서 확인할 수 있습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

**4. 로컬 개발 서버 실행**

```bash
npm run dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 DrawStarter를 실행할 수 있습니다.

---

## 🤝 기여하기

DrawStarter는 오픈소스 프로젝트입니다. 버그 리포트, 기능 제안, 코드 기여 등 어떤 형태의 참여든 환영합니다. 자세한 내용은 `CONTRIBUTING.md` 파일을 참고해 주세요. (현재 준비 중)

## 📄 라이선스

본 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.
