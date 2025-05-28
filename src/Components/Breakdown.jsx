import Contado from "./Contado"
import PaymentMethod30 from "./PaymentMethod30"
import './Breakdown.css'
import PaymentMethod20 from "./PaymentMethod20"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { useContext } from "react"

function Breakdown() {

    const {paymentMethod, noDiscount} = useContext(GradeAndPeriodContext);

  return (
    <>
{   noDiscount !== 0 && 
   <section className="price-breakdown">
        <h3 className="calculations-h3">Costos totales estimados</h3>
        <p className="calculations-p">Basados en tus selecciones</p> 
          {
            paymentMethod === 'Contado' ? 
            <>
                  {noDiscount !== 0 && <Contado />}
              </>
              :
              paymentMethod === 'Anticipo del 30' ?
              <>
                  {noDiscount !== 0 && <PaymentMethod30 />}
              </>
              :
              paymentMethod === 'Anticipo del 20' ?
              <>
              {noDiscount !== 0 && <PaymentMethod20 />}
              </>
              :
              null
            }
      </section>}
    </>
  )
}

export default Breakdown