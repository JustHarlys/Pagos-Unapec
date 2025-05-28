import './Footer.css'

function Footer() {
  return (
    <footer style={{  }}>
        © {new Date().getFullYear()} Desarrollado por Harlys Almánzar. Todos los derechos reservados. <br />
        Para información OFICIAL, consulte el sitio web de <a href="https://unapec.edu.do/costos/" target='_blank' style={{textDecoration: 'none', color: 'blue'}}>UNAPEC</a>
    </footer>
  )
}

export default Footer