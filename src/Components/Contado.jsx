import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import { referenciasMayo } from "../referencias-may-ago"

function Contado() {

    
    const {tuition, techResource} = useContext(GradeAndPeriodContext);
    const {selectedTotal} = useContext(SelectLaboratoriesContext)
    
      const recursosTec = techResource ? referenciasMayo.recursosTec : 0
    const {carnet} = referenciasMayo
    const totalPayment = carnet + selectedTotal + recursosTec + tuition

  return (
            <table>
                <thead>
                    <tr>
                        <th>Créditos: </th>
                        <td>{`RD$ ${tuition.toLocaleString()}`}</td>
                    </tr>
                    {techResource && <tr>
                        <th>Rec. Tecnológicos</th>
                        <td>{`RD$ ${recursosTec.toLocaleString()}`}</td>
                    </tr>}
                    <tr>
                        <th>Lab. Tecnología</th>
                        <td>{`RD$ ${selectedTotal.toLocaleString()}`}</td>
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
  )
}

export default Contado