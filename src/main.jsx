import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import RouterApp from './be/RouterApp.jsx'
=======
import RouterApp from './be/Router'
>>>>>>> 4d48508860846a90ff6a33fc7f47a3ff3c2f7c96

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
