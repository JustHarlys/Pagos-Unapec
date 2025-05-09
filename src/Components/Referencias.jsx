import { referenciasMayo } from "../referencias-may-ago"
import { referenciasSep } from "../referencias-sep-dic"
import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import './Referencias.css'

function Referencias() {

  const {selectedCategory, selectedGrade} = useContext(GradeAndPeriodContext);

  const { recursosTec, creditos, labTec, carnet } = referenciasMayo
  const { recurstosTecSep, creditosSep, labtecSep, carnetSep} = referenciasSep

  let content = null;

  if (selectedGrade === 'Grado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      content = (
        <table>
          <tr>
            <th>Crédito</th>
            <th>Recursos Técnologicos</th>
            <th>Lab. Tecnología</th>
            <th>Serv. de Carnet</th>
          </tr>
          <tr>
            <td>RD$ {recursosTec}</td>
            <td>RD$ {creditos}</td>
            <td>RD$ {labTec}</td>
            <td>RD$ {carnet}</td>
          </tr>
        </table>
      );
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      content = (
        <table>
          <tr>
            <th>Crédito</th>
            <th>Recursos Técnologicos</th>
            <th>Lab. Tecnología</th>
            <th>Serv. de Carnet</th>
          </tr>
          <tr>
            <td>RD$ {recurstosTecSep}</td>
            <td>RD$ {creditosSep}</td>
            <td>RD$ {labtecSep}</td>
            <td>RD$ {carnetSep}</td>
        </tr>
        </table>
      );
    }
  } else if (selectedGrade === 'Posgrado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      content = (
        <table>
          <tr>
            <th>Crédito</th>
            <th>Recursos Técnologicos</th>
            <th>Lab. Tecnología</th>
            <th>Serv. de Carnet</th>
          </tr>
          <td>RD$ {recursosTec}</td>
          <td>RD$ {creditos + 1665}</td>
          <td>RD$ {labTec}</td>
          <td>RD$ {carnet}</td>
        </table>
      )
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      content = (
        <table>
          <tr>
            <th>Crédito</th>
            <th>Recursos Técnologicos</th>
            <th>Lab. Tecnología</th>
            <th>Serv. de Carnet</th>
          </tr>
          <tr>
            <td>RD$ {recursosTec}</td>
            <td>RD$ {creditos + 1835.00}</td>
            <td>RD$ {labTec}</td>
            <td>RD$ {carnet}</td>
          </tr>
        </table>
      )
    }
  }

  return (
    <section className="prices-reference">
      {content}
    </section>
  )
}

export default Referencias;