import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import { referenciasMayo } from "../referencias-may-ago"
import { Table, TableBody, TableRow, TableCell, Divider, Typography } from "@mui/material"

function Contado() {
  const {
    tuition,
    techResource,
    trabajoFinal,
    regularCreditsSubtotal,
    finalProjectSubtotal,
  } = useContext(GradeAndPeriodContext)

  const { selectedTotal } = useContext(SelectLaboratoriesContext)

  const recursosTec = techResource ? referenciasMayo.recursosTec : 0
  const { carnet } = referenciasMayo
  const regularCreditsWithDiscount = regularCreditsSubtotal * 0.90
  const finalProjectWithDiscount = finalProjectSubtotal * 0.90

  const totalPayment = carnet + selectedTotal + recursosTec + tuition

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
              ? 'Monográfico (6 créditos)'
              : 'Tesis (6 créditos)',
          value: finalProjectWithDiscount,
        }]
      : []),

    ...(techResource
      ? [{
          label: 'Rec. Tecnológicos',
          value: recursosTec,
        }]
      : []),

    {
      label: 'Lab. Tecnología',
      value: selectedTotal,
    },

    {
      label: 'Serv. Carnet',
      value: carnet,
    },
  ]

  return (
    <>
      <Table size="small" sx={{ mt: 1 }}>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} hover>
              <TableCell sx={{ border: 0, py: 1 }}>{row.label}</TableCell>
              <TableCell align="right" sx={{ border: 0, py: 1 }}>
                RD$ {row.value.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider sx={{ my: 1 }} />
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: 0, py: 1, fontWeight: 700 }}>
              <Typography variant="body2" fontWeight={700}>Total Neto</Typography>
            </TableCell>
            <TableCell align="right" sx={{ border: 0, py: 1 }}>
              <Typography variant="body2" fontWeight={700} color="success.main" sx={{ fontFamily: '"Fira Code", monospace' }}>
                RD$ {totalPayment.toLocaleString()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default Contado
