import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { referenciasMayo } from "../referencias-may-ago"
import { referenciasSep } from "../referencias-sep-dic"
import './PaymentMethod30.css'

const thirtyPercent = 0.30
const seventyPercent = 0.70
const tenPercent = 0.10



function PaymentMethod30() {

  const {noDiscount} = useContext(GradeAndPeriodContext);
  const frontPayment = noDiscount * thirtyPercent
  const diferredCredits = noDiscount * seventyPercent
  const admCharges = diferredCredits * 0.10
  const diferredPayments = diferredCredits / 3

  return (
    <table className="paymentMethod30">
        <thead>
          <tr>

          </tr>
          <tr>
            <th>Anticipo 30%</th>
            <td>{frontPayment}</td>
          </tr>
          <tr>
            <th>Lab. Tecnología</th>
            <td>{referenciasMayo.labTec * 3}</td>
          </tr>
          <tr>
            <th>Rec. Tecnológicos</th>
            <td>{referenciasMayo.recursosTec}</td>
          </tr>
          <tr>
            <th>Serv. Carnet</th>
            <td>{referenciasMayo.carnet}</td>
          </tr>
          <tr>
            <th>Total Neto</th>
            <td>{frontPayment + (referenciasMayo.labTec * 3) + referenciasMayo.recursosTec + referenciasMayo.carnet}</td>
          </tr>
        </thead> 
    </table>
  )
}

export default PaymentMethod30