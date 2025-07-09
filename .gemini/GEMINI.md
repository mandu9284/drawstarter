## 프로젝트 룰 
### i18n
- i18n의 번역 (dict) 반드시 사용해야 함
- 타입은 반드시 types/type.ts에 정의해야 함
- 타입이 없으면 추가해야 함

### TypeScript & Next.js 코딩 규약

#### 1\. TypeScript 기본 권장 사항

- **명시적인 타입 선언**: 가능한 한 명시적으로 타입을 선언하여 코드의 가독성과 유지보수성을 높입니다.
  - **Bad**: `let user = {};`
  - **Good**: `let user: { name: string; age: number; } = { name: 'John', age: 30 };` 또는 `interface User { name: string; age: number; } let user: User = { name: 'John', age: 30 };`

- **인터페이스(Interface) 또는 타입 별칭(Type Alias) 활용**: 복잡한 객체나 함수 타입은 인터페이스나 타입 별칭으로 정의하여 재사용성과 가독성을 높입니다.
  - **Interface**: 객체의 모양을 정의할 때 주로 사용. 확장이 용이.
    ```typescript
    interface Product {
      id: string
      name: string
      price: number
    }
    ```
  - **Type Alias**: 복합 타입, 유니온 타입, 튜플 타입 등 다양한 타입을 정의할 때 사용.
    ```typescript
    type ProductId = string | number
    type UserRole = 'admin' | 'editor' | 'viewer'
    ```

- **`any` 타입 지양**: `any` 타입 사용은 TypeScript의 장점을 상쇄시키므로, 가능한 한 구체적인 타입을 사용하거나 `unknown` 타입을 활용하여 안전하게 타입을 다룹니다.
  - **Bad**: `const fetchData = (url: string): any => { /* ... */ };`
  - **Good**: `const fetchData = (url: string): Promise<SomeType> => { /* ... */ };`
  - `unknown` 사용 예:
    ```typescript
    function processData(data: unknown) {
      if (typeof data === 'string') {
        console.log(data.toUpperCase())
      }
    }
    ```

- **엄격한 null/undefined 체크**: `tsconfig.json`에서 `strictNullChecks: true`를 설정하여 런타임 오류를 방지합니다. 옵셔널 체이닝 (`?.`)과 Nullish Coalescing (`??`)을 적극 활용합니다.

  ```typescript
  interface User {
    name: string
    email?: string // email은 선택 사항
  }

  const user: User = { name: 'Alice' }
  const email = user.email ?? 'No email provided' // email이 null 또는 undefined일 경우 기본값 설정
  ```

- **제네릭(Generics) 활용**: 재사용 가능한 컴포넌트나 함수를 만들 때 제네릭을 활용하여 다양한 타입에 대응할 수 있도록 합니다.

  ```typescript
  function identity<T>(arg: T): T {
    return arg
  }
  ```

- **enum 대신 유니온 타입 (Union Type) 활용**: JavaScript로 트랜스파일 시 enum은 추가적인 코드를 생성하므로, 간단한 상수 집합에는 유니온 타입을 사용하는 것이 효율적일 수 있습니다.
  - **Enum**:
    ```typescript
    enum Status {
      Pending,
      Success,
      Failed,
    }
    const currentStatus = Status.Pending
    ```
  - **Union Type**:
    ```typescript
    type Status = 'pending' | 'success' | 'failed'
    const currentStatus: Status = 'pending'
    ```

#### Next.js 특정 권장 사항

- **파일 및 폴더 구조**: 일관성 있는 파일 구조를 유지하여 프로젝트 탐색 및 관리를 용이하게 합니다.
  - **`pages`**: 페이지 컴포넌트
    - `pages/index.tsx`
    - `pages/about.tsx`
    - `pages/users/[id].tsx` (동적 라우팅)
  - **`components`**: 재사용 가능한 UI 컴포넌트
    - `components/common/Button.tsx`
    - `components/layout/Header.tsx`
    - `components/features/UserCard.tsx`
    - `components/ui/Input.tsx` (Shadcn UI 등 사용하는 경우)
  - **`lib`**: 유틸리티 함수, API 요청 함수, 헬퍼 등
    - `lib/api.ts`
    - `lib/utils.ts`
    - `lib/hooks.ts` (커스텀 훅)
  - **`styles`**: 전역 스타일 또는 CSS 모듈
    - `styles/globals.css`
    - `styles/Home.module.css`
  - **`public`**: 정적 자원 (이미지, 폰트 등)

- **데이터 페칭 (Data Fetching)**: Next.js의 데이터 페칭 함수들을 적절히 활용합니다.
  - **`getServerSideProps`**: 매 요청마다 서버에서 데이터를 가져와야 할 때 사용. SEO에 중요하거나 최신 데이터가 필요한 경우.
  - **`getStaticProps`**: 빌드 시점에 데이터를 가져와 정적 HTML 파일을 생성할 때 사용. 자주 변하지 않는 데이터에 적합하며, CDN 캐싱을 통해 빠른 로딩 속도를 제공.
    - `revalidate` 옵션을 사용하여 ISR (Incremental Static Regeneration) 구현.
  - **`getStaticPaths`**: `getStaticProps`와 함께 동적 라우팅 ([slug].tsx) 페이지의 경로를 정의할 때 사용.
  - **클라이언트 측 데이터 페칭**: `SWR` 또는 `React Query`와 같은 라이브러리를 사용하여 클라이언트에서 데이터를 페칭하고 캐싱, 재검증 등을 관리합니다.
    - 로딩 상태, 에러 처리 등을 쉽게 구현할 수 있습니다.

- **API 라우트 (API Routes)**: 백엔드 로직이 필요할 때 Next.js의 API 라우트를 활용합니다.
  - `pages/api` 디렉토리 아래에 생성.
  - 간단한 백엔드 로직이나 외부 API와의 통신을 위한 프록시 등으로 활용.
  - 타입스크립트와 함께 사용하여 API 응답 및 요청에 대한 타입을 정의합니다.

    ```typescript
    // pages/api/users.ts
    import type { NextApiRequest, NextApiResponse } from 'next'

    interface User {
      id: number
      name: string
    }

    export default function handler(
      req: NextApiRequest,
      res: NextApiResponse<User[]>,
    ) {
      if (req.method === 'GET') {
        const users: User[] = [{ id: 1, name: 'John Doe' }]
        res.status(200).json(users)
      } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
      }
    }
    ```

- **컴포넌트 분리**: 재사용 가능한 UI와 로직은 별도의 컴포넌트로 분리합니다.
  - **Atomic Design**: 아톰, 분자, 유기체, 템플릿, 페이지 등으로 구분하여 컴포넌트를 설계하는 것을 고려해볼 수 있습니다.
  - **책임 분리**: 각 컴포넌트는 단일 책임을 가지도록 합니다.

- **상대 경로 대신 절대 경로 사용**: `tsconfig.json`에서 `baseUrl`을 설정하여 절대 경로를 사용하면 경로 관리가 훨씬 용이해집니다.

  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      "baseUrl": ".", // 또는 "src"
      "paths": {
        "@/components/*": ["src/components/*"],
        "@/lib/*": ["src/lib/*"],
        "@/styles/*": ["src/styles/*"]
      }
    }
  }
  ```

  - **Bad**: `import Button from '../../components/common/Button';`
  - **Good**: `import Button from '@/components/common/Button';`

- **CSS 모듈 또는 Tailwind CSS 사용**:
  - **CSS 모듈**: 컴포넌트 레벨 스코프 CSS를 통해 스타일 충돌을 방지합니다. (`.module.css`)
  - **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크로, 빠르게 UI를 구축하고 일관된 디자인 시스템을 유지하는 데 효과적입니다.

- **이미지 최적화**: Next.js의 `Image` 컴포넌트를 사용하여 이미지 최적화 및 레이아웃 시프트 방지합니다.

  ```typescript
  import Image from 'next/image';

  <Image
    src="/profile.jpg"
    alt="Profile picture"
    width={500}
    height={500}
    layout="responsive" // 또는 "fill", "fixed", "intrinsic"
  />
  ```

- **환경 변수 관리**: `next.config.js` 또는 `.env.local`을 통해 환경 변수를 관리합니다.
  - `NEXT_PUBLIC_` 접두사를 붙여야 클라이언트 측 코드에서 접근할 수 있습니다.
  - 민감한 정보는 클라이언트 측에서 직접 노출되지 않도록 주의합니다.

#### 공통 코딩 스타일 및 도구

- **ESLint**: 코드 품질을 유지하고 잠재적인 버그를 미리 발견합니다. Next.js는 기본적으로 ESLint를 지원하며, TypeScript 관련 플러그인(`@typescript-eslint/eslint-plugin`)을 함께 사용합니다.
  - **규칙 설정**: 팀의 합의를 통해 특정 규칙을 활성화/비활성화하고 에러/경고 레벨을 조정합니다.
  - **Prettier와 통합**: Prettier의 포맷팅 규칙과 충돌하지 않도록 설정합니다.

- **Prettier**: 일관된 코드 포맷팅을 강제하여 코드 리뷰 시간을 줄이고 가독성을 높입니다.
  - `.prettierrc` 파일을 통해 규칙을 정의합니다. (예: `tabWidth`, `semi`, `singleQuote` 등)
  - Git Hooks (husky + lint-staged)와 연동하여 커밋 전에 자동으로 코드 포맷팅을 적용하는 것을 권장합니다.

- **Webpack Alias (선택 사항)**: `tsconfig.json`의 `paths` 설정과 유사하게, Webpack 레벨에서 모듈 경로를 별칭으로 설정하여 긴 상대 경로를 줄일 수 있습니다. Next.js는 `tsconfig.json` 설정을 자동으로 인식하므로 필수는 아닙니다.

- **코멘트 (Comments)**:
  - 복잡한 로직, 비즈니스 규칙, 비표준 구현 등에 대한 설명을 작성합니다.
  - JSDoc 스타일의 주석을 사용하여 함수, 컴포넌트, 인터페이스 등에 대한 설명을 추가하면 IDE에서 툴팁으로 표시되어 협업에 도움이 됩니다.

- **네이밍 컨벤션 (Naming Conventions)**:
  - **변수/함수**: `camelCase` (예: `userName`, `getUserData`)
  - **클래스/컴포넌트/인터페이스/타입**: `PascalCase` (예: `UserProfile`, `Button`, `IUser`, `UserType`)
  - **상수**: `UPPER_SNAKE_CASE` (예: `API_KEY`, `MAX_ITEM_COUNT`)
  - **파일 이름**:
    - 컴포넌트: `PascalCase` (예: `UserProfile.tsx`, `Button.tsx`)
    - 페이지: `kebab-case` 또는 `camelCase` (예: `about-us.tsx`, `users/[id].tsx`)
    - 유틸리티/훅: `camelCase` (예: `utils.ts`, `useAuth.ts`)

- **코드 구조 및 가독성**:
  - **함수 길이 제한**: 너무 긴 함수는 작은 단위로 분리합니다.
  - **매직 넘버/스트링 지양**: 상수로 정의하여 사용합니다.
  - **조기 리턴 (Early Return)**: 조건문이 복잡할 때 중첩을 줄이고 가독성을 높입니다.
  - **디스트럭처링 (Destructuring)**: 객체/배열 디스트럭처링을 적극 활용하여 코드 간결성 높입니다.

#### 추천 설정 예시

**`tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true, // 모든 strict 모드 활성화 (strictNullChecks 포함)
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"] // src 디렉토리를 사용하는 경우
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**`.eslintrc.json` (Next.js 기본 + TypeScript)**

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier" // Prettier와 ESLint 충돌 방지
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    // 여기에 팀의 ESLint 규칙을 추가 또는 재정의합니다.
    // 예:
    // "@typescript-eslint/no-unused-vars": "warn",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "react/react-in-jsx-scope": "off", // Next.js 13부터 필요 없음
    // "react/display-name": "off"
  }
}
```

**`.prettierrc`**

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "all",
  "arrowParens": "always",
  "endOfLine": "lf"
}
```


### github issue template

#### rules

- github issue를 만들 때는 반드시 github issue template를 사용해야 함

- assignees는 반드시 추가해야 함
- assignees는 팀원의 github username을 사용해야 함
- labels는 반드시 추가해야 함
- github issue template는 .github/ISSUE_TEMPLATE 폴더에 위치해야 함
- github issue template는 yaml 파일로 작성해야 함
- github issue template는 name, description, title, labels, body를 포함해야 함
- github issue template는 body는 배열로 작성해야 함
- github issue template는 body의 type은 textarea, input, checkbox, dropdown을 사용할 수 있음
- github issue template는 body의 type이 textarea인 경우 attributes는 label, placeholder, description을 포함해야 함
- github issue template는 body의 type이 input인 경우 attributes는 label, placeholder를 포함해야 함
- github issue template는 body의 type이 checkbox인 경우 attributes는 label을 포함해야 함
- github issue template는 body의 type이 dropdown인 경우 attributes는 label, options를 포함해야 함
- github issue template는 validations는 required를 포함해야 함
- github issue template는 validations의 required는 true, false를 포함해야 함
- 
#### github issue template 위치
- .github/ISSUE_TEMPLATE/bug_report.yml
- .github/ISSUE_TEMPLATE/feature_request.yml


### github pull request template
#### rules

- github pull request를 만들 때는 반드시 github pull request template를 사용해야 함
- github pull request template는 .github/pull_request_template.md 파일에 작성해야 함
- github pull request template는 body는 배열로 작성해야 함
- github pull request template는 body의 type은 textarea, input, checkbox, dropdown을 사용할 수 있음
- github pull request template는 body의 type이 textarea인 경우 attributes는 label, placeholder, description을 포함해야 함
- github pull request template는 body의 type이 input인 경우 attributes는 label, placeholder를 포함해야 함
- github pull request template는 body의 type이 checkbox인 경우 attributes는 label을 포함해야 함
- github pull request template는 body의 type이 dropdown인 경우 attributes는 label, options를 포함해야 함
- github pull request template는 validations는 required를 포함해야 함
- github pull request template는 validations의 required는 true, false를 포함해야 함


#### github pull request template 위치
- .github/pull_request_template.md
