import './App.css'
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage'
import Referencias from './Components/Referencias'
import GradeAndPeriodProvider from './Context/GradeAndPeriodContext'
import Calculation from './Components/Calculation'
import Breakdown from './Components/Breakdown'
import SelectLaboratoriesProvider from './Context/SelectLaboratories'
import SelectLabs from './Components/SelectLabs'

function App() {

  return (
    

      <GradeAndPeriodProvider >
        
        <Nav />
        <div className='app'>

          <SelectLaboratoriesProvider>
            <LandingPage />
          </SelectLaboratoriesProvider>

          <div className='ref-calc'>
          <Calculation />
          <Breakdown />
          <Referencias /> 
          <SelectLabs />
          </div>
        </div>

      </GradeAndPeriodProvider>
  )
}

export default App
