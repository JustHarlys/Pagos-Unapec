import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { referenciasMayo } from "../referencias-may-ago"
import { referenciasSep } from "../referencias-sep-dic"
import './Breakdown.css'

function Breakdown() {

    const {carnet, labTec, recursosTec} = referenciasMayo

    const {tuition} = useContext(GradeAndPeriodContext);
    const totalPayment = carnet + (labTec * 5) + recursosTec + tuition


  return (
    <section className="price-breakdown">
        <table>
            <thead>
                <tr>
                    <th>Créditos: </th>
                    <td>{tuition.toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Rec. Tecnológicos</th>
                    <td>{referenciasMayo.recursosTec.toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Lab. Tecnología</th>
                    <td>{referenciasMayo.labTec * 5}</td>
                </tr>
                <tr>
                    <th>Serv. Carnet</th>
                    <td>{referenciasMayo.carnet}</td>
                </tr>
                <tr>
                    <th>Total Neto: </th>
                    <td>{totalPayment.toLocaleString()}</td>
                </tr>
            </thead> 
        </table>
    </section>
  )
}

export default Breakdown