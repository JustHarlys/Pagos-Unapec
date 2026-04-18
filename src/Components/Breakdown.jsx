import Contado from "./Contado"
import PaymentMethod30 from "./PaymentMethod30"
import PaymentMethod20 from "./PaymentMethod20"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { useContext } from "react"
import { Paper, Typography, Box } from "@mui/material"

function Breakdown() {
  const { paymentMethod, noDiscount } = useContext(GradeAndPeriodContext)

  if (noDiscount === 0) return null

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
          Costos totales estimados
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Desglose por concepto
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 2 }}>
        {paymentMethod === 'Contado' && <Contado />}
        {paymentMethod === 'Anticipo del 30' && <PaymentMethod30 />}
        {paymentMethod === 'Anticipo del 20' && <PaymentMethod20 />}
      </Box>
    </Paper>
  )
}

export default Breakdown
