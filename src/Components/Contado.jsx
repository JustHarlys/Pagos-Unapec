import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import { SelectSimulatorsContext } from "../Context/SelectSimulatorsContext"
import { referenciasActuales } from "../data/referenciasActuales"

import {
  Box,
  Divider,
  Typography,
} from "@mui/material"

function Contado() {
  const {
    tuition,
    techResource,
    trabajoFinal,
    regularCreditsSubtotal,
    finalProjectSubtotal,
  } = useContext(GradeAndPeriodContext)

  const {
    selectedTotal: laboratoriesTotal,
  } = useContext(SelectLaboratoriesContext)

  const {
    selectedTotal: simulatorsTotal,
  } = useContext(SelectSimulatorsContext)

  const recursosTec = techResource
    ? referenciasActuales.recursosTec
    : 0

  const { carnet } = referenciasActuales

  const regularCreditsWithDiscount =
    regularCreditsSubtotal * 0.90

  const finalProjectWithDiscount =
    finalProjectSubtotal * 0.90

  const totalPayment =
    carnet +
    laboratoriesTotal +
    simulatorsTotal +
    recursosTec +
    tuition

  const rows = [
    ...(regularCreditsSubtotal > 0
      ? [{
          label: 'Créditos regulares',
          value: regularCreditsWithDiscount,
        }]
      : []),

    ...(finalProjectSubtotal > 0
      ? [{
          label:
            trabajoFinal === 'MON400'
              ? 'Monográfico'
              : 'Tesis',
          value: finalProjectWithDiscount,
        }]
      : []),

    ...(techResource
      ? [{
          label: 'Rec. Tecnológicos',
          value: recursosTec,
        }]
      : []),

    ...(laboratoriesTotal > 0
      ? [{
          label: 'Laboratorios',
          value: laboratoriesTotal,
        }]
      : []),

    ...(simulatorsTotal > 0
      ? [{
          label: 'Simulación / Aprendizaje',
          value: simulatorsTotal,
        }]
      : []),

    {
      label: 'Serv. Carnet',
      value: carnet,
    },
  ]

  return (
    <Box sx={{ mt: 0.5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        {rows.map((row) => (
          <Box
            key={row.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              px: 1.5,
              py: 1.25,
              borderRadius: 1.5,
              transition: 'background-color 0.15s ease',

              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.04)'
                    : 'rgba(0,0,0,0.025)',
              },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                minWidth: 0,
              }}
            >
              {row.label}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontFamily: '"Fira Code", monospace',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              RD$ {row.value.toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: 1.5,
          py: 1.5,
          borderRadius: 2,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(5,150,105,0.12)'
              : 'rgba(5,150,105,0.07)',
        }}
      >
        <Typography
          variant="body2"
          fontWeight={700}
        >
          Total Neto
        </Typography>

        <Typography
          variant="body1"
          fontWeight={700}
          color="success.main"
          sx={{
            fontFamily: '"Fira Code", monospace',
            whiteSpace: 'nowrap',
          }}
        >
          RD$ {totalPayment.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  )
}

export default Contado