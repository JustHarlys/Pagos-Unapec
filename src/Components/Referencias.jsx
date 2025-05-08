import { referenciasMayo } from "../referencias-may-ago"
import { referenciasSep } from "../referencias-sep-dic"
import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import './Referencias.css'

function Referencias() {

  const {selectedCategory, selectedGrade} = useContext(GradeAndPeriodContext);

  console.log(referenciasMayo)
  const { recursosTec, creditos, labTec, carnet } = referenciasMayo
  const { recurstosTecSep, creditosSep, labtecSep, carnetSep} = referenciasSep

  console.log(recursosTec, creditos, labTec, carnet)

  let content = null;

  if (selectedGrade === 'Grado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      content = (
        <table>
          <tr>
            <th>Crédito</th>
            <th>Recursos técnologicos</th>
            <th>Lab. Tecnología</th>
            <th>Serv. de Carnet</th>
          </tr>
        <tr>
          <td>{recursosTec}</td>
          <td>{creditos}</td>
          <td>{labTec}</td>
          <td>{carnet}</td>
        </tr>
        </table>
      );
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      content = (
        <table>
            <th>Crédito</th>
            <th>Recursos técnologicos</th>
            <th>Lab. Tecnología</th>
            <th>Serv. de Carnet</th>
        <tr>
          <td>{recurstosTecSep}</td>
          <td>{creditosSep}</td>
          <td>{labtecSep}</td>
          <td>{carnetSep}</td>
        </tr>
        </table>
      );
    }
  } else if (selectedGrade === 'Posgrado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      content = (
        <div>
          <p>{recursosTec}</p>
          <p>{creditos + 1665}</p>
          <p>{labTec}</p>
          <p>{carnet}</p>
        </div>
      )
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      content = (
        <div>
          <p>{recursosTec}</p>
          <p>{creditos + 1835}</p>
          <p>{labTec}</p>
          <p>{carnet}</p>
        </div>
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