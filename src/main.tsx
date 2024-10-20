import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Extract the URL parameter using vanilla JavaScript
const params = new URLSearchParams(window.location.search)
const paramValue = params.get('skupina') // Replace 'yourParamName' with the actual parameter name


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App group={paramValue} />
  </StrictMode>
)
