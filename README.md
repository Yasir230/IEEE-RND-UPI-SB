# IEEE-RND-UPI-SB
Kimi Agent PRD (Product Requirement Document) Animasi IEEE — R&D project for Universitas Pendidikan Indonesia (UPI) IEEE Student Branch.

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
IEEE-RND-UPI-SB/
├── README.md                # Project documentation
├── tech-spec.md             # Technical specification
└── app/                     # Application source code
    ├── public/              # Static assets (images, audio)
    ├── src/
    │   ├── components/      # Reusable components (Navigation, AudioPlayer, PolaroidCard)
    │   ├── sections/        # Page sections (Hero, Intro, PhotoGallery, etc.)
    │   ├── App.tsx          # Main application component
    │   └── App.css         # Global styles
    ├── package.json         # Dependencies and scripts
    ├── vite.config.ts       # Vite configuration
    └── tsconfig.json        # TypeScript configuration
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
5. Open your browser at `http://localhost:5173` (or the port shown in the terminal).

## Build Instructions
To create a production build:
```bash
cd app
npm run build
```
Preview the production build:
```bash
npm run preview
```

## Available Scripts
- `npm run dev`: Start development server with HMR
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## Features
- Smooth scrolling with Lenis
- GSAP-powered animations
- Interactive photo gallery with polaroid-style cards
- Background audio player
- Responsive navigation with scroll-to-section
- Featured memory section
- Event photo showcase

## Contributing
All files are maintained by the UPI IEEE SB team. Follow these steps to contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "feat: add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request
