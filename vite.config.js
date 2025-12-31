import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-framer': ['framer-motion'],
                    'vendor-lucide': ['lucide-react'],
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                }
            }
        },
        chunkSizeWarningLimit: 1000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
