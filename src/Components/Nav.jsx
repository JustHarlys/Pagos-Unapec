import unapecLogo from '../assets/image.png'
import '../Components/Nav.css'

function Nav() {
  return (
    <nav className='nav'>
        <img src={unapecLogo} alt="Logo de la Universidad APEC" width={80} className='logo-nav'/>
        <h3 className='logo-h3'>Planificación de Pagos para estudiantes</h3>

    </nav>
  )
}

export default Nav