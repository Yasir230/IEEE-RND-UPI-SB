# IEEE-RND-UPI-SB
IEEE — R&D project for Universitas Pendidikan Indonesia (UPI) IEEE Student Branch.

## Description
A React-based animated web application for showcasing UPI IEEE SB events, memories, and activities. Features smooth scrolling, GSAP animations, interactive photo galleries, and audio integration.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3, tw-animate-css
- **UI Components**: Radix UI (accordion, alert dialog, avatar, etc.), shadcn/ui
- **Animation**: GSAP, Lenis (smooth scroll)
- **Form Handling**: React Hook Form, Zod
- **Routing**: React Router 7
- **Charts**: Recharts
- **Linting**: ESLint 9, TypeScript ESLint

## Project Structure
```
app/
├── public/
│   └── images/          # Photo assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Static data (photos, etc.)
│   ├── sections/        # Page sections (Hero, Gallery, etc.)
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/Yasir230/IEEE-RND-UPI-SB.git
```
2. Navigate to the app directory:
```bash
cd IEEE-RND-UPI-SB/app
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```
5. Open your browser at `http://localhost:5173`

## Build Instructions
```bash
cd app
npm run build
npm run preview
```

## Available Scripts
- `npm run dev` — Start development server with HMR
- `npm run build` — Build for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

## Features
- **Hero Section**: Animated hero with polaroid photo cards
- **Intro Section**: Project introduction with animations
- **Featured Memory Section**: Highlighted event memories
- **Photo Gallery**: Interactive polaroid-style gallery with lightbox
- **Smooth Scrolling**: Lenis-powered smooth scroll
- **GSAP Animations**: Scroll-triggered animations for all sections
- **Audio Integration**: Background audio player
- **Responsive Design**: Mobile-friendly layout
- **Accessibility**: Semantic HTML, ARIA attributes, empty alt texts for decorative images

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request
