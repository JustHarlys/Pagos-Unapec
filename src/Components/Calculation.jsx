import { Typography } from "@mui/material"
import {GradeAndPeriodContext} from "../Context/GradeAndPeriodContext"
import { useContext } from "react"
import './Calculation.css'
import { referenciasSep } from "../referencias-sep-dic"
import { referenciasMayo } from "../referencias-may-ago"

function Calculation() {

  const creditosMay = referenciasMayo.creditos
  const creditosSep = referenciasSep.creditosSep
  const creditosPosSep = creditosMay + 1835
  const creditosPosMay = creditosSep + 1665

  const {selectedCategory, selectedGrade, tuition} = useContext(GradeAndPeriodContext)

  let credit = ''

  if (selectedGrade === 'Grado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      credit = creditosMay
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      credit = creditosSep
    }
   } else if (selectedGrade === 'Posgrado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      credit = creditosPosMay
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      credit = creditosPosSep
    }
   }


  return (
    <section className="calculations-section">

      <h3 className="calculations-h3">Costos totales estimados</h3>
      <p className="calculations-p">Basados en tus selecciones</p>
      
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Colegiatura: RD$ {tuition.toLocaleString()}
      </Typography>

      <p className="calculations-p-2">
        Calculado a RD ${credit} por crédito
      </p>

    </section>
  )
}

export default Calculation