# 🎨 DrawStarter: The Easiest Way to Start Your Creation

**DrawStarter** is a web application that helps digital artists and illustrators overcome creative blocks and draw consistently every day. When you're stuck on "what to draw today" or "want to secure consistent work time," DrawStarter is here to accompany you on your creative journey.

---

## ✨ Key Features

- **✍️ Random Topic Generator:** When you lack inspiration, you can get diverse drawing topics instantly with a single button click.
- **👤 User Authentication System:** Easily sign up and log in with your email and password to securely manage all your data.
- **⏱️ Focus Timer:** A timer to help you concentrate solely on your work for a set amount of time. (Includes start, stop, and reset functions)
- **📈 Automatic Work Time Tracking:** The time spent using the timer is automatically recorded, allowing you to understand your work patterns and accumulated time at a glance.
- **📱 Mobile Optimized:** Designed with a responsive layout to provide a consistent experience on smartphones, tablets, and PCs, anytime, anywhere.

---

## 🔧 Tech Stack

| Category          | Technology                                                                    |
| ----------------- | ----------------------------------------------------------------------------- |
| **Framework**     | [Next.js (App Router)](https://nextjs.org/)                                   |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                 |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                      |
| **Backend & DB**  | [Supabase](https://supabase.io/) (Auth, Database, Storage)                    |
| **State Management**| [React Context API](https://react.dev/learn/passing-data-deeply-with-context) |
| **Code Quality**  | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)               |
| **CI/CD**         | [GitHub Actions](https://github.com/features/actions)                         |
| **Deployment**    | [Vercel](https://vercel.com/)                                                 |

---

## 🚀 Getting Started

To run the project in your local environment, follow these steps.

**1. Clone the repository**

```bash
git clone https://github.com/mandu9284/drawstarter.git
cd drawstarter
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the project root directory and add your Supabase project's environment variables. You can find them in your Supabase dashboard under **Project Settings > API**.

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

**4. Run the local development server**

```bash
npm run dev
```

Now, you can open your browser and go to `http://localhost:3000` to run DrawStarter.

---

## 🤝 Contributing

DrawStarter is an open-source project. We welcome any form of contribution, including bug reports, feature suggestions, and code contributions. For more details, please refer to the `CONTRIBUTING.md` file. (Currently in preparation)

## 📄 License

This project is licensed under the [MIT License](LICENSE).