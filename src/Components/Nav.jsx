import unapecLogo from '../assets/image.png'
import '../Components/Nav.css'
import { useContext } from 'react'
import { DarkModeContext } from '../Context/DarkModeToggleContext'

function Nav() {

  const { darkMode, handleToggle } = useContext(DarkModeContext)

  return (
    <nav className='nav'>
        <img src={unapecLogo} alt="Logo de la Universidad APEC" width={80} className='logo-nav'/>
        <h3 className='logo-h3' style={darkMode ? {color: 'white'} : {color : 'black'}}>Planificación de pagos para estudiantes</h3>

        <div className='nav-btns'>
          <button
            onClick={handleToggle}
            className="toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: darkMode ? 'white' : 'black'
            }}
            >
            {darkMode ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
          </button>
          <a href="https://github.com/JustHarlys/Pagos-Unapec" target='_blank' style={darkMode ? {color : 'white'} : {color: 'black'}}> <i className='fa-brands fa-github'></i> </a>
        </div>
    </nav>
  )
}

export default Nav