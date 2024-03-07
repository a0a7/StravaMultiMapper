import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type UserConfig } from 'vitest/config';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		chunkSizeWarningLimit: 1000
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		threads: false,
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTest.ts'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json', 'html']
		}
	}
});

const config: UserConfig = {
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                })
            ]
        }
    }
};
