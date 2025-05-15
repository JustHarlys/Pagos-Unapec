import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { referenciasMayo } from "../referencias-may-ago"
import './Breakdown.css'

function Breakdown() {

    const {carnet, labTec, recursosTec} = referenciasMayo

    const {tuition} = useContext(GradeAndPeriodContext);
    const totalPayment = carnet + (labTec * 5) + recursosTec + tuition


  return (
    <section className="price-breakdown">

      <h3 className="calculations-h3">Costos totales estimados</h3>
      <p className="calculations-p">Basados en tus selecciones</p>

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
    </section>
  )
}

export default Breakdown