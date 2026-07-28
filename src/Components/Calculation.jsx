import { Typography, Paper, Box, Chip } from "@mui/material"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { useContext } from "react"

function Calculation() {
  const {
    tuition,
    paymentMethod,
    noDiscount,
    creditReference,
    trabajoFinal,
  } = useContext(GradeAndPeriodContext)

  const isEmpty = tuition === 0 && noDiscount === 0

  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        borderColor: isEmpty ? 'divider' : 'success.main',
        borderWidth: isEmpty ? 1 : 1,
        transition: 'border-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) =>
            isEmpty
              ? theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#FAFBFC'
              : theme.palette.mode === 'dark' ? 'rgba(5,150,105,0.12)' : 'rgba(5,150,105,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle2" fontWeight={700}>
            Costos totales de créditos
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Basados en tus selecciones
          </Typography>
        </Box>
        {!isEmpty && (
          <Chip
            label="Calculado"
            size="small"
            color="success"
            variant="outlined"
            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
          />
        )}
      </Box>
      <Box sx={{ px: 3, py: 3 }}>
        {isEmpty ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'text.secondary' }}>
            <i className="fa-solid fa-calculator" style={{ fontSize: 20, opacity: 0.4 }} />
            <Typography variant="body2" color="text.secondary">
              Completa el formulario y presiona "Calcular colegiatura" para ver los resultados.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
              <Typography
                variant="h4"
                fontWeight={700}
                color="success.main"
                sx={{ fontFamily: '"Fira Code", monospace', letterSpacing: '-1px' }}
              >
                RD$ {(paymentMethod === 'Contado' ? tuition : noDiscount).toLocaleString()}
              </Typography>
              {tuition !== 0 && paymentMethod === 'Contado' && (
                <Typography
                  variant="body1"
                  sx={{ textDecoration: 'line-through', color: 'text.disabled', fontFamily: '"Fira Code", monospace' }}
                >
                  RD$ {noDiscount.toLocaleString()}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
              {paymentMethod === 'Contado' && (
                <Chip
                  label="10% descuento aplicado"
                  size="small"
                  color="success"
                  sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                />
              )}
            <Chip
              label={`RD$ ${creditReference.toLocaleString()} / crédito regular`}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 500, fontSize: '0.7rem' }}
            />

            {trabajoFinal && (
              <Chip
                label={`RD$ 4,725 / crédito ${trabajoFinal}`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500, fontSize: '0.7rem' }}
              />
            )}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  )
}

export default Calculation
