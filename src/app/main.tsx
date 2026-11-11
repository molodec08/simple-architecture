import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// i18n инициализируется до первого рендера
import '@/shared/i18n'
import './styles/index.css'
import { App } from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
