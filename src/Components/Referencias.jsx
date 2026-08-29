import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material"
import { referenciasActuales } from "../data/referenciasActuales"

function Referencias() {
  const { selectedGrade } = useContext(GradeAndPeriodContext)

  const referenciasGrado = [
    {
      categoria: 'Académicos',
      items: [
        {
          label: 'Crédito',
          value: referenciasActuales.grado.credito,
        },
        {
          label: 'Rec. Tecnológicos',
          value: referenciasActuales.recursosTec,
        },
        {
          label: 'Serv. Carnet',
          value: referenciasActuales.carnet,
        },
      ],
    },

    {
      categoria: 'Laboratorios',
      items: [
        {
          label: 'LTEC — Tecnología / Informática',
          value: referenciasActuales.laboratorios.LTEC,
        },
        {
          label: 'LART — Arte',
          value: referenciasActuales.laboratorios.LART,
        },
        {
          label: 'LTUR — Turismo',
          value: referenciasActuales.laboratorios.LTUR,
        },
      ],
    },

    {
      categoria: 'Simulación y aprendizaje',
      items: [
        {
          label: 'Objetos de aprendizaje — TATA',
          value: referenciasActuales.simulacion.TATA,
        },
        {
          label: 'Simulador',
          value: referenciasActuales.simulacion.simulador,
        },
        {
          label: 'Microcredencial',
          value: referenciasActuales.simulacion.microcredencial,
        },
        {
          label: 'Simulador ADM535',
          value: referenciasActuales.simulacion.ADM535,
        },
      ],
    },
  ]

  const referenciasPosgrado = [
    {
      categoria: 'Académicos',
      items: [
        {
          label: 'Crédito',
          value: referenciasActuales.posgrado.credito,
        },
        {
          label: 'Rec. Tecnológicos',
          value: referenciasActuales.recursosTec,
        },
        {
          label: 'Serv. Carnet',
          value: referenciasActuales.carnet,
        },
      ],
    },

    {
      categoria: 'Laboratorios',
      items: [
        {
          label: 'LTEC — Tecnología / Informática',
          value: referenciasActuales.laboratorios.LTEC,
        },
      ],
    },

    {
      categoria: 'Simulación y aprendizaje',
      items: [
        {
          label: 'Objetos de aprendizaje — TATA',
          value: referenciasActuales.simulacion.TATA,
        },
        {
          label: 'Simulador — SPOS',
          value: referenciasActuales.simulacion.simulador,
        },
      ],
    },
  ]

  const references =
    selectedGrade === 'Grado'
      ? referenciasGrado
      : selectedGrade === 'Posgrado'
        ? referenciasPosgrado
        : []

  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        flex: 1,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.03)'
              : '#FAFBFC',
        }}
      >
        <Typography variant="subtitle2" fontWeight={700}>
          Referencias de costos
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Tarifario vigente desde ago. 2026
        </Typography>
      </Box>

      <Box sx={{ px: 2, py: 2 }}>
        {selectedGrade === '' ? (
          <Box
            sx={{
              px: 1,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <i
              className="fa-solid fa-circle-info"
              style={{
                fontSize: 16,
                opacity: 0.4,
              }}
            />

            <Typography variant="body2" color="text.secondary">
              Elige el nivel académico para ver los precios de referencia.
            </Typography>
          </Box>
        ) : (
          <>
            {references.map((section) => (
              <Box
                key={section.categoria}
                sx={{
                  mb: 2.5,
                  '&:last-child': {
                    mb: 0,
                  },
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    px: 1,
                  }}
                >
                  {section.categoria}
                </Typography>

                <Table size="small" sx={{ mt: 0.5 }}>
                  <TableBody>
                    {section.items.map((row, i) => (
                      <TableRow
                        key={row.label}
                        sx={{
                          '&:nth-of-type(odd)': {
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255,255,255,0.02)'
                                : 'rgba(0,0,0,0.02)',
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: 500,
                            border: 0,
                            py: 1,
                            fontSize: '0.82rem',
                          }}
                        >
                          {row.label}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            border: 0,
                            py: 1,
                            fontSize: '0.82rem',
                            fontFamily: '"Fira Code", monospace',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          RD$ {row.value.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  )
}

export default Referencias