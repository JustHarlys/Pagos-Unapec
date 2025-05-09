import './App.css'
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage'
import Referencias from './Components/Referencias'
import GradeAndPeriodProvider from './Context/GradeAndPeriodContext'

function App() {

  return (
    
      <GradeAndPeriodProvider>
        <Nav />
        <LandingPage />
        <Referencias />    
      </GradeAndPeriodProvider>
  )
}

export default App
