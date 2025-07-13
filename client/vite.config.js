import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'water-quality-frontend-mkz7.onrender.com' // your Render frontend domain
    ]
  }
});
