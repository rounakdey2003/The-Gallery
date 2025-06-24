import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  plugins: [
    glsl({
      include: [
        "**/*.glsl",
        "**/*.wgsl",
        "**/*.vert",
        "**/*.frag",
        "**/*.vs",
        "**/*.fs",
      ],
      exclude: undefined,
      
      warnDuplicatedImports: true,
      
      defaultExtension: "glsl",
      
      watch: true,
      
      root: "/",
    }),
  ],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          
          'animation': ['gsap', 'motion'],
          
          'text': ['troika-three-text'],
          
          'scroll': ['lenis'],
          
          'vendor': []
        }
      }
    },
    
    chunkSizeWarningLimit: 1000,
    
    sourcemap: true,
    
    target: 'esnext',
    
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
});
