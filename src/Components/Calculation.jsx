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

  const {selectedCategory, selectedGrade, tuition, paymentMethod, noDiscount} = useContext(GradeAndPeriodContext)

  let credit = ''
  let totalCreditsNoDiscount

  if (selectedGrade === 'Grado') {
    if (paymentMethod === 'Contado') {
      if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
        credit = creditosMay
        totalCreditsNoDiscount = noDiscount
      } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
        credit = creditosSep
        totalCreditsNoDiscount = noDiscount
      }

    }
   } else if (selectedGrade === 'Posgrado') {
    if (paymentMethod === 'Contado') {
      if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
        totalCreditsNoDiscount = noDiscount
        credit = creditosPosMay
      } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
        credit = creditosPosSep
        totalCreditsNoDiscount = noDiscount
      }
    }
   }

  return (
    <section className="calculations-section">

      <h3 className="calculations-h3">Costos totales estimados</h3>
      <p className="calculations-p">Basados en tus selecciones</p>
      
      
      <div className="both-calculations">
      <Typography variant="h6" sx={{ mt: 2 }} >
        Total Colegiatura: RD$ {tuition.toLocaleString()}
      </Typography>

      <Typography sx={{ mt: 3.1}} variant="caption" style={{textDecoration: 'line-through', color: 'gray'}}>
        {tuition !== 0 && `RD$ ${totalCreditsNoDiscount}`}
      </Typography>
      </div>


      <p className="calculations-p-2">
        {tuition !== 0 && `Calculado a RD$ ${credit} por crédito`}
      </p>



    </section>
  )
}

export default Calculation