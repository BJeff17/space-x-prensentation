# 🚀 SpaceX Presentation

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)

> An interactive and animated presentation showcasing SpaceX's organizational structure, key achievements, and space exploration vision. Built for an English CC2 oral presentation.

---

## ✨ Features

- **🌙 Animated Hero Section** - Watch the Apollo-style moon landing and SpaceX Starship Mars landing animations unfold
- **📊 Key Figures** - Animated statistics with rocket landing effects showcasing SpaceX's achievements
- **🏢 Organization Chart** - Interactive hierarchical view of SpaceX's leadership with rocket-themed animations
- **🌟 Star Field Background** - Immersive space-themed animated starfield
- **⌨️ Keyboard Navigation** - Navigate slides using arrow keys
- **🖱️ Mouse Wheel Support** - Scroll through sections with your mouse wheel
- **🔲 Fullscreen Mode** - Press `F` to toggle fullscreen presentation mode
- **📱 Responsive Design** - Optimized for all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animation library |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [Lucide React](https://lucide.dev/) | Icon library |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or pnpm installed on your machine

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BJeff17/space-x-prensentation.git
   cd space-x-prensentation
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Or using pnpm
   pnpm install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Or using pnpm
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Navigation Controls

| Control | Action |
|---------|--------|
| `↑` `↓` | Navigate between sections |
| `←` `→` | Navigate between sections |
| `F` | Toggle fullscreen mode |
| `Esc` | Exit fullscreen |
| **Mouse Wheel** | Scroll through sections |
| **Click navigation dots** | Jump to specific section |

### Sections

1. **Hero** - SpaceX introduction with moon/Mars landing animations
2. **Key Figures** - Company statistics with rocket animations
3. **Organization** - Interactive org chart with leadership hierarchy
4. **Credits** - Presentation information and attributions

## 📁 Project Structure

```
space-x-prensentation/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main presentation page
├── components/
│   ├── ui/              # Shadcn/ui components
│   ├── hero-section.tsx # Hero with space animations
│   ├── key-figures.tsx  # Statistics section
│   ├── solar-org-chart.tsx # Organizational chart
│   ├── credits.tsx      # Credits section
│   └── star-field.tsx   # Animated background
├── public/              # Static assets
└── styles/              # Additional styles
```

## 🎨 Customization

### Colors & Theme

The project uses CSS variables for theming. You can customize colors in `app/globals.css`.

### Adding New Sections

1. Create a new component in `components/`
2. Import it in `app/page.tsx`
3. Add the section name to the `sections` array
4. Add a new AnimatePresence block for your section

## 📚 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 👤 Author

**BJeff17**

- Oral presentation for English CC2
- Teacher: Mrs. PORET GILBERT

## 📄 License

This project was created for educational purposes as part of an English presentation.

---

<p align="center">
  <sub>🌟 Making humanity multiplanetary, one presentation at a time 🚀</sub>
</p>