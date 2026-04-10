import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // 빌드 최적화 설정
    build: {
      // 최신 브라우저 대상으로 빌드 크기 축소
      target: 'es2022',
      // CSS 코드 분할 활성화 (라우트별 CSS 분리)
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // 수동 청크 분할 - 벤더 라이브러리를 별도 청크로 분리하여 캐싱 효율 극대화
          manualChunks: {
            // React 코어 라이브러리 (변경 빈도 낮음, 장기 캐싱 대상)
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // UI 관련 라이브러리 (애니메이션, 아이콘)
            'ui-vendor': ['motion', 'lucide-react'],
            // 다국어 지원 라이브러리
            'i18n-vendor': ['i18next', 'react-i18next'],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify -- file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
