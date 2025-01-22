import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { LoadingOverlay } from './components/LoadingOverlay.tsx'
import { ErrorAlert } from './components/ErrorAlert.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingOverlay />
      <ErrorAlert />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
