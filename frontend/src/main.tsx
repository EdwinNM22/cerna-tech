import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import App from './App.tsx'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { ThemeProvider } from './components/theme-provider'
import './index.css'

function Root() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
