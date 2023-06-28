import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [reactRefresh(), vue()],
});