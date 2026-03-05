import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for city event APIs to avoid CORS issues in development
      '/api/city-events': {
        target: 'https://www.miamigov.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/city-events/, '/api/events'),
        secure: false, // Set to false to handle certificate issues
        followRedirects: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      // Proxy for USDA Farmers Market API to avoid CORS and certificate issues
      '/api/farmers-markets': {
        target: 'https://search.ams.usda.gov',
        changeOrigin: true,
        rewrite: (path) => {
          // Remove /api/farmers-markets prefix and add the correct path
          const queryString = path.replace('/api/farmers-markets', '');
          return `/farmersmarkets/v1/data.svc/locSearch${queryString}`;
        },
        secure: false, // Set to false to handle certificate issues
        followRedirects: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Add headers that might be required by the API
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (compatible; Jacently/1.0)');
            proxyReq.setHeader('Accept', 'application/json');
            console.log('Proxying farmers market request:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Farmers market API response:', proxyRes.statusCode, req.url);
          });
          proxy.on('error', (err, _req, res) => {
            console.log('Farmers market proxy error:', err);
          });
        },
      },
      // Proxy for SerpAPI to avoid CORS issues in development
      '/api/serpapi': {
        target: 'https://serpapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/serpapi/, '/search'),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying SerpAPI request:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('SerpAPI response:', proxyRes.statusCode, req.url);
          });
          proxy.on('error', (err, _req, res) => {
            console.log('SerpAPI proxy error:', err);
          });
        },
      },
      // Proxy for OpenWebNinja to avoid CORS issues in development
      '/api/openwebninja': {
        target: 'https://api.openwebninja.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/openwebninja/, ''),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying OpenWebNinja request:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('OpenWebNinja response:', proxyRes.statusCode, req.url);
          });
          proxy.on('error', (err, _req, res) => {
            console.log('OpenWebNinja proxy error:', err);
          });
        },
      },
    },
  },
})

