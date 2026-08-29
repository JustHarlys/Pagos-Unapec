import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import { referenciasActuales } from '../data/referenciasActuales'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Typography
} from "@mui/material"
import { SelectSimulatorsContext } from "../Context/SelectSimulatorsContext"

const thirtyPercent = 0.30
const seventyPercent = 0.70
const tenPercent = 0.10

function PaymentMethod30() {
  const { noDiscount, techResource } = useContext(GradeAndPeriodContext)

  const {
    selectedTotal: laboratoriesTotal,
  } = useContext(SelectLaboratoriesContext)

  const {
    selectedTotal: simulatorsTotal,
  } = useContext(SelectSimulatorsContext)

  const recursosTec = techResource
    ? referenciasActuales.recursosTec
    : 0

  const frontPayment = noDiscount * thirtyPercent
  const diferredCredits = noDiscount * seventyPercent
  const admCharges = diferredCredits * tenPercent
  const diferredPayments = diferredCredits / 3

  const admChargesPerMonth = (admCharges / 3).toFixed(2)
  const diferredPaymentsFixed = (diferredCredits / 3).toFixed(2)

  const totalFirstPayment = (
    frontPayment +
    laboratoriesTotal +
    simulatorsTotal +
    recursosTec +
    referenciasActuales.carnet
  ).toFixed(2)

  const monthlyTotal = (
    (admCharges / 3) +
    diferredPayments
  ).toFixed(2)

  const fullTermTotal =
    (
      frontPayment +
      laboratoriesTotal +
      simulatorsTotal +
      recursosTec +
      referenciasActuales.carnet
    ) +
    (((admCharges / 3) + diferredPayments) * 3)

  const nf = new Intl.NumberFormat('en-US')

  const immediateRows = [
    {
      label: 'Anticipo 30%',
      value: nf.format(frontPayment),
    },

    ...(laboratoriesTotal > 0
      ? [{
          label: 'Laboratorios',
          value: nf.format(laboratoriesTotal),
        }]
      : []),

    ...(simulatorsTotal > 0
      ? [{
          label: 'Simulación / Aprendizaje',
          value: nf.format(simulatorsTotal),
        }]
      : []),

    ...(techResource
      ? [{
          label: 'Rec. Tecnológicos',
          value: nf.format(recursosTec),
        }]
      : []),

    {
      label: 'Serv. Carnet',
      value: nf.format(referenciasActuales.carnet),
    },
  ]

  const monthlyRows = [
    {
      label: 'Cargos Admvo.',
      value: nf.format(admChargesPerMonth),
    },
    {
      label: 'Diferido Colegiatura',
      value: nf.format(diferredPaymentsFixed),
    },
  ]

  const amountCellSx = {
    border: 0,
    py: 0.8,
    pl: 1,
    whiteSpace: 'nowrap',
    width: '1%',
  }

  const labelCellSx = {
    border: 0,
    py: 0.8,
    pr: 1,
  }

  const amountTypographySx = {
    fontFamily: '"Fira Code", monospace',
    whiteSpace: 'nowrap',
  }

  return (
    <>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        sx={{
          mt: 2,
          mb: 0.5,
        }}
      >
        Pago Inmediato
      </Typography>

      <Table size="small">
        <TableBody>
          {immediateRows.map((row, i) => (
            <TableRow key={i} hover>
              <TableCell sx={labelCellSx}>
                {row.label}
              </TableCell>

              <TableCell
                align="right"
                sx={amountCellSx}
              >
                RD$ {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider sx={{ my: 1 }} />

      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell
              sx={{
                ...labelCellSx,
                fontWeight: 700,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={700}
              >
                Total Neto
              </Typography>
            </TableCell>

            <TableCell
              align="right"
              sx={amountCellSx}
            >
              <Typography
                variant="body2"
                fontWeight={700}
                color="success.main"
                sx={amountTypographySx}
              >
                RD$ {nf.format(totalFirstPayment)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography
        variant="subtitle2"
        fontWeight={600}
        sx={{
          mt: 3,
          mb: 0.5,
        }}
      >
        Pago en 3 cuotas mensuales
      </Typography>

      <Table size="small">
        <TableBody>
          {monthlyRows.map((row, i) => (
            <TableRow key={i} hover>
              <TableCell sx={labelCellSx}>
                {row.label}
              </TableCell>

              <TableCell
                align="right"
                sx={amountCellSx}
              >
                RD$ {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider sx={{ my: 1 }} />

      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={labelCellSx}>
              <Typography
                variant="body2"
                fontWeight={700}
              >
                Total Neto Mensual
              </Typography>
            </TableCell>

            <TableCell
              align="right"
              sx={amountCellSx}
            >
              <Typography
                variant="body2"
                fontWeight={700}
                color="success.main"
                sx={amountTypographySx}
              >
                RD$ {nf.format(monthlyTotal)}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={labelCellSx}>
              <Typography
                variant="body2"
                fontWeight={700}
              >
                Total Cuatrimestre
              </Typography>
            </TableCell>

            <TableCell
              align="right"
              sx={amountCellSx}
            >
              <Typography
                variant="body2"
                fontWeight={700}
                color="success.main"
                sx={amountTypographySx}
              >
                RD$ {nf.format(fullTermTotal)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

export default PaymentMethod30