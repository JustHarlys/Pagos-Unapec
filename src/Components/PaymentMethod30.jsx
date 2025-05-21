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
  const admCharges = (diferredCredits * tenPercent)
  const diferredPayments = (diferredCredits / 3)
  const diferredPaymentsFixed = (diferredCredits / 3).toFixed(2)

  const admChargesPerMonth = (admCharges / 3).toFixed(2)
  const totalFirstPayment = (frontPayment + (referenciasMayo.labTec * 3) + referenciasMayo.recursosTec + referenciasMayo.carnet).toFixed(2)
  const monthlyTotal = ((admCharges / 3) + diferredPayments).toFixed(2)
  const fullTermTotal = ((frontPayment + (referenciasMayo.labTec * 3) + referenciasMayo.recursosTec + referenciasMayo.carnet) + (((admCharges / 3) + diferredPayments) * 3))
  let nf = new Intl.NumberFormat('en-US')

  return (
    <table className="paymentMethod30">
        <thead>
        <h5>Pago Inmediato</h5>
          <tr>
            <th>Anticipo 30%:</th>
            <td>RD$ {frontPayment.toLocaleString()}</td>
          </tr>
          <tr>
            <th>Lab. Tecnología:</th>
            <td>RD$ {(referenciasMayo.labTec * 3).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Rec. Tecnológicos:</th>
            <td>RD$ {(referenciasMayo.recursosTec).toLocaleString()}</td>
          </tr>
          <tr>
            <th>Serv. Carnet:</th>
            <td>RD$ {referenciasMayo.carnet}</td>
          </tr>
          <tr>
            <th>Total Neto: </th>
            <td>RD$ {nf.format(totalFirstPayment)}</td>
          </tr>
        </thead> 

        <thead>
          <h5 style={{marginTop: 30}}>Pago en 3 cuotas mensuales</h5>
          <tr>
            <th>Cargos Admvo: </th>
            <td>RD$ {nf.format(admChargesPerMonth)}</td>
          </tr>
          <tr>
            <th>Diferido Colegiatura: </th>
            <td>RD$ {nf.format(diferredPaymentsFixed)}</td>
          </tr>
          <tr>
            <th>Total Neto Mensual:</th>
            <td>RD$ {nf.format(monthlyTotal)}</td>
          </tr>

          <tr>
            <th>Total Cuatrimestre: </th>
            <td>RD$ {nf.format(fullTermTotal)}</td>
          </tr>
        </thead>
    </table>
  )
}

export default PaymentMethod30