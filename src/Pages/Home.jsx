// Home.jsx
import unapecLogo from '../assets/image.png'

import { useContext } from 'react'

import { Box, Container, Typography, IconButton, Tooltip } from '@mui/material'

import { Link } from 'react-router-dom'

import { DarkModeContext } from '../Context/DarkModeToggleContext'

import LandingPage from '../Components/LandingPage'
import Referencias from '../Components/Referencias'
import GradeAndPeriodProvider from '../Context/GradeAndPeriodContext'
import Calculation from '../Components/Calculation'
import Breakdown from '../Components/Breakdown'
import SelectLaboratoriesProvider from '../Context/SelectLaboratories'
import Footer from '../Components/Footer'

import { Analytics } from '@vercel/analytics/react'

function Home() {
  const { darkMode, handleToggle } = useContext(DarkModeContext)

  return (
    <GradeAndPeriodProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
        }}
      >
        <Box
          sx={{
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(160deg, #0F172A 0%, #1a2d45 100%)'
                : 'linear-gradient(160deg, #1E3A5F 0%, #2a5298 100%)',
            px: { xs: 2, md: 4 },
            color: '#fff',
            minHeight: { xs: 88, md: 96 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container maxWidth="lg" disableGutters>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              {/* Logo + título + subtítulo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                  src={unapecLogo}
                  alt="Logo UNAPEC"
                  height={52}
                  width="auto"
                  style={{
                    objectFit: 'contain',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: '#fff',
                      lineHeight: 1.2,
                      mb: 0.3,
                    }}
                  >
                    Estima tu colegiatura
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      maxWidth: 420,
                    }}
                  >
                    Selecciona tu categoría, grado y créditos para obtener un
                    desglose estimado de tus costos cuatrimestrales.
                  </Typography>
                </Box>
              </Box>

              {/* Botones */}
              <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                <Tooltip
                  title={darkMode ? 'Modo claro' : 'Modo oscuro'}
                  placement="bottom"
                >
                  <IconButton
                    onClick={handleToggle}
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'rgba(255,255,255,0.85)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: 'rgba(255,255,255,0.12)',
                      },
                    }}
                  >
                    <i
                      className={
                        darkMode
                          ? 'fa-solid fa-sun'
                          : 'fa-solid fa-moon'
                      }
                      style={{
                        fontSize: 17,
                        width: 17,
                        textAlign: 'center',
                      }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Calendario académico" placement="bottom">
                  <IconButton
                    component={Link}
                    to="/calendario"
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'rgba(255,255,255,0.85)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: 'rgba(255,255,255,0.12)',
                      },
                    }}
                  >
                    <i
                      className="fa-regular fa-calendar-days"
                      style={{ fontSize: 17 }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Ver en GitHub" placement="bottom">
                  <IconButton
                    component="a"
                    href="https://github.com/JustHarlys/Pagos-Unapec"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 40,
                      height: 40,
                      color: 'rgba(255,255,255,0.85)',
                      '&:hover': {
                        color: '#fff',
                        bgcolor: 'rgba(255,255,255,0.12)',
                      },
                    }}
                  >
                    <i
                      className="fa-brands fa-github"
                      style={{ fontSize: 17 }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 3, md: 4 },
            flex: 1,
          }}
        >
          <SelectLaboratoriesProvider>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', md: '420px' },
                  flexShrink: 0,
                }}
              >
                <LandingPage />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  minWidth: 0,
                }}
              >
                <Calculation />

                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Breakdown />
                  <Referencias />
                </Box>
              </Box>
            </Box>
          </SelectLaboratoriesProvider>
        </Container>

        <Footer />
        <Analytics />
      </Box>
    </GradeAndPeriodProvider>
  )
}

export default Home