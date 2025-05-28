import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DarkModeToggleProvider from './Context/DarkModeToggleContext.jsx'



createRoot(document.getElementById('root')).render(
    <DarkModeToggleProvider>
        <App />
    </DarkModeToggleProvider>
)
