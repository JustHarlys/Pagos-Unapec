import unapecLogo from '../assets/image.png'
import { useContext } from 'react'
import { DarkModeContext } from '../Context/DarkModeToggleContext'
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip } from '@mui/material'

function Nav() {
  const { darkMode, handleToggle } = useContext(DarkModeContext)

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 2, md: 4 },
          minHeight: { xs: 56, sm: 60 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: 1.5,
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={unapecLogo}
              alt="Logo UNAPEC"
              height={28}
              style={{
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>

          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{
              color: 'rgba(255,255,255,0.92)',
              display: { xs: 'none', sm: 'block' },
              letterSpacing: '0.2px',
            }}
          >
            Estimador de Colegiatura
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {/* Dark mode */}
          <Tooltip
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            placement="bottom"
          >
            <IconButton
              onClick={handleToggle}
              size="medium"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                '&:hover': {
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <i
                className={
                  darkMode
                    ? 'fa-solid fa-sun'
                    : 'fa-solid fa-moon'
                }
                style={{ fontSize: 17 }}
              />
            </IconButton>
          </Tooltip>

          {/* Calendario académico */}
          <Tooltip title="Calendario académico" placement="bottom">
            <IconButton
              component="a"
              href="/calendario"
              size="medium"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                '&:hover': {
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <i
                className="fa-regular fa-calendar-days"
                style={{ fontSize: 17 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Nav