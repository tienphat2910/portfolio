# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, Three.js, and Tailwind CSS. Features bilingual support (English/Vietnamese), dark/light mode toggle, and an interactive 3D hero section.

## Features

- **Bilingual Support**: Toggle between English and Vietnamese languages
- **Dark/Light Mode**: Smooth theme transitions with persistent user preferences
- **3D Interactive Hero**: Subtle floating spheres background using Three.js
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean typography, spacious layout, minimalist design
- **Sections**: Hero, About, Projects, Contact with a simple form

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js with React Three Fiber
- **Language**: TypeScript
- **State Management**: React Context for themes and languages

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles with theme variables
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page with sections
├── components/
│   ├── Header.tsx           # Navigation and toggles
│   ├── Hero.tsx             # 3D background and intro
│   ├── About.tsx            # About section
│   ├── Projects.tsx         # Projects grid
│   └── Contact.tsx          # Contact form
├── contexts/
│   ├── ThemeContext.tsx     # Theme management
│   └── LanguageContext.tsx  # Language management
├── translations/
│   ├── en.json              # English translations
│   └── vi.json              # Vietnamese translations
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Adding Your Content

1. **Translations**: Update `translations/en.json` and `translations/vi.json` with your personal information, project details, etc.

2. **Projects**: Modify the projects array in `components/Projects.tsx` to include your actual projects with links.

3. **Styling**: Adjust colors and styles in `app/globals.css` or component files.

4. **3D Background**: Customize the Three.js scene in `components/Hero.tsx` for different effects.

### Theme Customization

The theme uses CSS variables defined in `app/globals.css`. Update the `--background` and `--foreground` variables for custom colors.

### Language Support

Add new languages by:

1. Creating a new JSON file in `translations/`
2. Updating the `translations` object in `contexts/LanguageContext.tsx`
3. Adding the language option to the toggle logic

## Deployment

Deploy to Vercel, Netlify, or any static hosting service:

```bash
npm run build
```

The `out/` directory contains the production build.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
