import './App.css'
import Nav from './Components/Nav'
import LandingPage from './Components/LandingPage'
import Referencias from './Components/Referencias'
import GradeAndPeriodProvider from './Context/GradeAndPeriodContext'
import Calculation from './Components/Calculation'
import Breakdown from './Components/Breakdown'
import SelectLaboratoriesProvider from './Context/SelectLaboratories'
import Footer from './Components/Footer'
import { useContext, useEffect } from 'react'
import { DarkModeContext } from './Context/DarkModeToggleContext'

const body = document.body;

function App() {

  const {darkMode} = useContext(DarkModeContext)

  useEffect(() => {
    if (darkMode === false) {
      body.style.backgroundColor = 'rgb(255, 251, 255)'
    } else {
      body.style.backgroundColor = 'rgb(41,45,52)'
    }
  })


  return (
    

      <GradeAndPeriodProvider >
        
        <Nav />
        <div className='app'>

         <SelectLaboratoriesProvider>
          <LandingPage />
          
          <div className='ref-calc'>
            <Calculation className="calculation"/>
            <div className='calculations-ref'>
              <Breakdown />
              <Referencias />
            </div>
          </div>
        </SelectLaboratoriesProvider>

        </div>

        <Footer />
      </GradeAndPeriodProvider>
  )
}

export default App
