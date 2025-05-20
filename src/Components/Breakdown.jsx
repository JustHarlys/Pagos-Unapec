import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { referenciasMayo } from "../referencias-may-ago"
import PaymentMethod30 from "./PaymentMethod30"
import './Breakdown.css'

function Breakdown() {

    const {carnet, labTec, recursosTec} = referenciasMayo

    const {tuition, paymentMethod} = useContext(GradeAndPeriodContext);
    const totalPayment = carnet + (labTec * 5) + recursosTec + tuition


  return (
    <section className="price-breakdown">

      <h3 className="calculations-h3">Costos totales estimados</h3>
      <p className="calculations-p">Basados en tus selecciones</p>

      

        {
            paymentMethod === 'Contado' ?
            <table>
                <thead>
                    <tr>
                        <th>Créditos: </th>
                        <td>{`RD$ ${tuition.toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <th>Rec. Tecnológicos</th>
                        <td>{`RD$ ${referenciasMayo.recursosTec.toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <th>Lab. Tecnología</th>
                        <td>{`RD$ ${(referenciasMayo.labTec * 5).toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <th>Serv. Carnet</th>
                        <td>{`RD$ ${referenciasMayo.carnet}`}</td>
                    </tr>
                    <tr>
                        <th>Total Neto: </th>
                        <td>{`RD$ ${totalPayment.toLocaleString()}`}</td>
                    </tr>
                </thead> 
            </table>
            :
            paymentMethod === 'Anticipo del 30' ?
            <>
                <PaymentMethod30 />
            </>
            :
            paymentMethod === 'Anticipo del 20' ?
            <>
            <h1>Hola</h1>
            </>
            :
            null
        }
    </section>
  )
}

export default Breakdown