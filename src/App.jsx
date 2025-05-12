import './App.css'
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage'
import Referencias from './Components/Referencias'
import GradeAndPeriodProvider from './Context/GradeAndPeriodContext'
import Calculation from './Components/Calculation'

function App() {

  return (
    

      <GradeAndPeriodProvider >
        <Nav />
        <div className='app'>

          <LandingPage />

          <div className='ref-calc'>
          <Calculation />
          <Referencias /> 
          </div>
        </div>

      </GradeAndPeriodProvider>
  )
}

export default App
