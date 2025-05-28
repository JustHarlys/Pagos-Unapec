import unapecLogo from '../assets/image.png'
import '../Components/Nav.css'
import { useContext } from 'react'
import { DarkModeContext } from '../Context/DarkModeToggleContext'

function Nav() {

  const { darkMode, handleToggle } = useContext(DarkModeContext)

  return (
    <nav className='nav'>
        <img src={unapecLogo} alt="Logo de la Universidad APEC" width={80} className='logo-nav'/>
        <h3 className='logo-h3' style={darkMode ? {color: 'white'} : {color : 'black'}}>Planificación de Pagos para estudiantes</h3>

        <div onClick={handleToggle} style={darkMode ? {color: 'white'} : {color : 'black'}}>
        {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
        </div>

    </nav>
  )
}

export default Nav