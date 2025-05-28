import { DarkModeContext } from '../Context/DarkModeToggleContext'
import './Footer.css'
import { useContext } from 'react'

function Footer() {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <footer style={darkMode ? {color: 'white'} : {color: '#666'}}>
        © {new Date().getFullYear()} Desarrollado por Harlys Almánzar. Todos los derechos reservados. <br />
        Para información OFICIAL, consulte el sitio web de <a href="https://unapec.edu.do/costos/" target='_blank' style={{textDecoration: 'none', color: 'blue'}}>UNAPEC</a>
    </footer>
  )
}

export default Footer