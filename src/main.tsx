import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Enigma from './components/Enigma/Enigma'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Enigma />
  </StrictMode>,
)
