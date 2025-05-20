import './App.css'
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage'
import Referencias from './Components/Referencias'
import GradeAndPeriodProvider from './Context/GradeAndPeriodContext'
import Calculation from './Components/Calculation'
import Breakdown from './Components/Breakdown'
import Practice from './Components/Practice'

function App() {

  return (
    

      <GradeAndPeriodProvider >
        <Nav />
        <div className='app'>

          <LandingPage />

          <div className='ref-calc'>
          <Calculation />
          <Breakdown />
          <Referencias /> 
          </div>
        </div>

      <Practice />
      </GradeAndPeriodProvider>
  )
}

export default App
