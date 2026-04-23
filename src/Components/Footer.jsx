import { Box, Typography, Link, Container, Divider } from '@mui/material'

function Footer() {
  return (
    <Box component="footer" sx={{ mt: 2 }}>
      <Divider />
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 1.5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 0.25,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              © {new Date().getFullYear()} Desarrollado por Harlys Almánzar
            </Typography>
            <Typography variant="caption" color="text.disabled" display="block">
              Actualizado al tarifario con fecha del 1ro de Agosto, 2025
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Para información oficial, consulte{' '}
            <Link
              href="https://unapec.edu.do/costos/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="primary"
              fontWeight={500}
            >
              unapec.edu.do
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
