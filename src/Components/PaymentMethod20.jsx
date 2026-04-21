import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import { referenciasMayo } from "../referencias-may-ago"
import { Table, TableBody, TableRow, TableCell, Divider, Typography } from "@mui/material"

const twentyPercent = 0.20
const eightyPercent = 0.80
const tenPercent = 0.10

function PaymentMethod20() {
  const { noDiscount, techResource } = useContext(GradeAndPeriodContext)
  const { selectedTotal } = useContext(SelectLaboratoriesContext)

  const recursosTec = techResource ? referenciasMayo.recursosTec : 0
  const frontPayment = noDiscount * twentyPercent
  const diferredCredits = noDiscount * eightyPercent
  const admCharges = diferredCredits * tenPercent
  const diferredPayments = diferredCredits / 3
  const admChargesPerMonth = (admCharges / 3).toFixed(2)
  const diferredPaymentsFixed = (diferredCredits / 3).toFixed(2)
  const totalFirstPayment = (frontPayment + selectedTotal + recursosTec + referenciasMayo.carnet).toFixed(2)
  const monthlyTotal = ((admCharges / 3) + diferredPayments).toFixed(2)
  const fullTermTotal = (frontPayment + selectedTotal + recursosTec + referenciasMayo.carnet) + (((admCharges / 3) + diferredPayments) * 3)
  const nf = new Intl.NumberFormat('en-US')

  const immediateRows = [
    { label: 'Anticipo 20%', value: nf.format(frontPayment) },
    { label: 'Lab. Tecnología', value: nf.format(selectedTotal) },
    ...(techResource ? [{ label: 'Rec. Tecnológicos', value: nf.format(recursosTec) }] : []),
    { label: 'Serv. Carnet', value: nf.format(referenciasMayo.carnet) },
  ]

  const monthlyRows = [
    { label: 'Cargos Admvo.', value: nf.format(admChargesPerMonth) },
    { label: 'Diferido Colegiatura', value: nf.format(diferredPaymentsFixed) },
  ]

  return (
    <>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 2, mb: 0.5 }}>
        Pago Inmediato
      </Typography>
      <Table size="small">
        <TableBody>
          {immediateRows.map((row, i) => (
            <TableRow key={i} hover>
              <TableCell sx={{ border: 0, py: 0.8 }}>{row.label}</TableCell>
              <TableCell align="right" sx={{ border: 0, py: 0.8 }}>RD$ {row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider sx={{ my: 1 }} />
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: 0, py: 0.8 }}>
              <Typography variant="body2" fontWeight={700}>Total Neto</Typography>
            </TableCell>
            <TableCell align="right" sx={{ border: 0, py: 0.8 }}>
              <Typography variant="body2" fontWeight={700} color="success.main" sx={{ fontFamily: '"Fira Code", monospace' }}>RD$ {nf.format(totalFirstPayment)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 3, mb: 0.5 }}>
        Pago en 3 cuotas mensuales
      </Typography>
      <Table size="small">
        <TableBody>
          {monthlyRows.map((row, i) => (
            <TableRow key={i} hover>
              <TableCell sx={{ border: 0, py: 0.8 }}>{row.label}</TableCell>
              <TableCell align="right" sx={{ border: 0, py: 0.8 }}>RD$ {row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider sx={{ my: 1 }} />
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ border: 0, py: 0.8 }}>
              <Typography variant="body2" fontWeight={700}>Total Neto Mensual</Typography>
            </TableCell>
            <TableCell align="right" sx={{ border: 0, py: 0.8 }}>
              <Typography variant="body2" fontWeight={700} color="success.main" sx={{ fontFamily: '"Fira Code", monospace' }}>RD$ {nf.format(monthlyTotal)}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ border: 0, py: 0.8 }}>
              <Typography variant="body2" fontWeight={700}>Total Cuatrimestre</Typography>
            </TableCell>
            <TableCell align="right" sx={{ border: 0, py: 0.8 }}>
              <Typography variant="body2" fontWeight={700} color="success.main" sx={{ fontFamily: '"Fira Code", monospace' }}>RD$ {nf.format(fullTermTotal)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default PaymentMethod20
