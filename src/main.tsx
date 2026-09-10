import { StrictMode } from 'react'
import { console.info('apex chat build 2026-09-10d')

createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { App } from './app'
import { ErrorBoundary } from './components/ui/error-boundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

window.addEventListener('unhandledrejection', (e) => {
  // Surface promise rejections in dev; don't crash the app.
  console.error('[unhandledrejection]', e.reason)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
