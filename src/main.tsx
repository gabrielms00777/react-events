import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { LoadingOverlay } from './components/LoadingOverlay.tsx'
import { ErrorAlert } from './components/ErrorAlert.tsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoadingOverlay />
        <ErrorAlert />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
