import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import CalendarPage from './Pages/CalendarPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendario" element={<CalendarPage />} />
    </Routes>
  )
}

export default App