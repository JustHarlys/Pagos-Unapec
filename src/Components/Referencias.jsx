import { referenciasMayo } from "../referencias-may-ago"
import { referenciasSep } from "../referencias-sep-dic"
import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import { materias } from "../data/materias"
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@mui/material"

function Referencias() {
  const { selectedCategory, selectedGrade, techResource } = useContext(GradeAndPeriodContext)
  const { selectedLabs } = useContext(SelectLaboratoriesContext)

  const { recursosTec, creditos, carnet } = referenciasMayo
  const { recurstosTecSep, creditosSep, carnetSep } = referenciasSep
  const creditoPosgrado = 4460

  const firstSelectedCode = Array.from(selectedLabs)[0]
  const firstSelectedLab = materias.find(m => m.codigo === firstSelectedCode)
  const firstLabCost = firstSelectedLab?.costo || 0

  let rows = null

  if (selectedGrade === 'Grado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      rows = [
        { label: 'Crédito', value: creditos },
        ...(techResource ? [{ label: 'Rec. Tecnológicos', value: recursosTec }] : []),
        { label: 'Lab. Tecnología', value: firstLabCost },
        { label: 'Serv. Carnet', value: carnet },
      ]
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      rows = [
        { label: 'Crédito', value: creditosSep },
        ...(techResource ? [{ label: 'Rec. Tecnológicos', value: recurstosTecSep }] : []),
        { label: 'Lab. Tecnología', value: firstLabCost },
        { label: 'Serv. Carnet', value: carnetSep },
      ]
    }
  } else if (selectedGrade === 'Posgrado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      rows = [
        { label: 'Crédito', value: creditoPosgrado },
        ...(techResource
          ? [{ label: 'Rec. Tecnológicos', value: recursosTec }]
          : []),
        { label: 'Lab. Tecnología', value: firstLabCost },
        { label: 'Serv. Carnet', value: carnet },
      ]
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      rows = [
        { label: 'Crédito', value: creditoPosgrado },
        ...(techResource
          ? [{ label: 'Rec. Tecnológicos', value: recurstosTecSep }]
          : []),
        { label: 'Lab. Tecnología', value: firstLabCost },
        { label: 'Serv. Carnet', value: carnetSep },
      ]
    }
  }

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', flex: 1 }}>
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#FAFBFC',
        }}
      >
        <Typography variant="subtitle2" fontWeight={700}>
          Referencias de costos
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Tarifario vigente desde ago. 2025
        </Typography>
      </Box>

      <Box sx={{ px: 2, py: 2 }}>
        {selectedCategory === '' || selectedGrade === '' ? (
          <Box sx={{ px: 1, py: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <i className="fa-solid fa-circle-info" style={{ fontSize: 16, opacity: 0.4 }} />
            <Typography variant="body2" color="text.secondary">
              Elige período y grado para ver los precios de referencia.
            </Typography>
          </Box>
        ) : (
          <Table size="small">
            <TableBody>
              {rows?.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{
                    '&:nth-of-type(odd)': {
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 500, border: 0, py: 1, fontSize: '0.82rem' }}>
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
                    }}
                  >
                    RD$ {row.value.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Paper>
  )
}

export default Referencias
