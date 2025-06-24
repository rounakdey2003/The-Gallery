# The Gallery

A modern, interactive web gallery showcasing creative designs and WebGL text animations with custom post-processing effects and liquid cursor interactions.

## 🌟 Features

- **WebGL Text Animations**: Custom shader-based text rendering with reveal animations
- **Liquid Cursor**: Interactive liquid-style cursor with glow effects
- **Post-Processing Effects**: Custom fragment shaders for visual enhancement
- **Smooth Scrolling**: Powered by Lenis for buttery smooth scroll experience
- **Responsive Design**: Optimized for all screen sizes
- **Modern Typography**: Custom Humane font family integration
- **Wavy Glass Effects**: Interactive hover effects on text elements

## 🛠️ Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **3D Graphics**: Three.js
- **Text Rendering**: Troika Three Text
- **Animations**: GSAP, Motion
- **Smooth Scrolling**: Lenis
- **Build Tool**: Vite
- **Shaders**: GLSL (WebGL Shading Language)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Gallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Gallery/
├── public/
│   ├── fonts/                 # Humane font family files
│   ├── favicon.svg
│   └── site.webmanifest
├── src/
│   ├── css/
│   │   ├── base.css          # Base styles and typography
│   │   ├── scroll.css        # Smooth scrolling styles
│   │   ├── styles.css        # Main styling and liquid cursor
│   │   └── wavy-glass.css    # Wavy glass effect styles
│   ├── js/
│   │   ├── main.ts           # Main application entry point
│   │   ├── utils.js          # Utility functions
│   │   └── classes/
│   │       ├── Commons.ts    # Common WebGL setup and utilities
│   │       ├── LiquidCursor.ts # Liquid cursor implementation
│   │       ├── PostProcessing.ts # Post-processing effects
│   │       └── WebGLText.ts  # WebGL text rendering
│   └── shaders/
│       ├── postprocessing/   # Post-processing shaders
│       └── text/             # Text rendering shaders
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Key Components

### WebGL Text Rendering
- Custom shader-based text animation with reveal effects
- Powered by Troika Three Text for high-quality typography
- Dynamic color and progress animations

### Liquid Cursor
- Interactive cursor with liquid-like behavior
- Glow effects and smooth transitions
- Backdrop blur and blend modes for visual appeal

### Post-Processing Pipeline
- Custom fragment shaders for visual enhancement
- Real-time effects processing
- Optimized rendering pipeline

### Wavy Glass Effects
- Interactive hover animations on text elements
- CSS-based wave distortions
- Smooth transitions and transforms

## 🎯 Interactive Features

- **Hover Effects**: Words glow and animate on hover
- **Liquid Cursor**: Custom cursor follows mouse movement with fluid animations
- **Smooth Scrolling**: Enhanced scrolling experience with Lenis
- **WebGL Animations**: Hardware-accelerated text animations
- **Responsive Design**: Adapts to different screen sizes

## 🎮 Usage

1. **Navigation**: Scroll through the gallery to explore different sections
2. **Interactions**: Hover over text elements to see glow effects
3. **Cursor**: Watch the liquid cursor follow your mouse movements
4. **Text Animations**: Observe the WebGL text reveal animations

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

*Note: WebGL support is required for optimal experience*

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Features

1. **New Animations**: Add shaders in `src/shaders/`
2. **CSS Effects**: Modify styles in `src/css/`
3. **WebGL Components**: Create new classes in `src/js/classes/`
4. **Assets**: Add fonts and images to `public/`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you or if you found it interesting!

---

*Made with ❤️ by [Rounak Dey](https://github.com/rounakdey2003)*
