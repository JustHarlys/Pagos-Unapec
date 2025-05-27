import { referenciasMayo } from "../referencias-may-ago"
import { referenciasSep } from "../referencias-sep-dic"
import { useContext } from "react"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"
import './Referencias.css'

function Referencias() {

  const {selectedCategory, selectedGrade, techResource} = useContext(GradeAndPeriodContext);

  const { recursosTec, creditos, labTec, carnet } = referenciasMayo
  const { recurstosTecSep, creditosSep, labtecSep, carnetSep} = referenciasSep
  const creditosPosSep = creditos + 1835
  const creditosPosMay = creditos + 1665
  let content = null;

  if (selectedGrade === 'Grado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      content = (
        <table>
          <thead>
            <tr>
              <th>Crédito</th>
              <td>RD$ {creditos.toLocaleString()}</td>
            </tr>
            {techResource && <tr>
              <th>Rec. Técnologicos</th>
              <td>RD$ { recursosTec.toLocaleString()}</td>
            </tr>}
            <tr>
              <th>Lab. Tecnología</th>
              <td>RD$ {labTec}</td>
            </tr>
            <tr>
              <th>Serv. Carnet</th>
              <td>RD$ {carnet}</td>
            </tr>
            </thead>
        </table>
      );
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      content = (
        <table>
          <thead>
            <tr>
              <th>Crédito</th>
              <td>RD$ {creditosSep.toLocaleString()}</td>
            </tr>
            {techResource && <tr>
              <th>Rec. Técnologicos</th>
              <td>RD$ { recurstosTecSep.toLocaleString()}</td>
            </tr>}
            <tr>
              <th>Lab. Tecnología</th>
              <td>RD$ {labtecSep}</td>
            </tr>
            <tr>
              <th>Serv. Carnet</th>
              <td>RD$ {carnetSep}</td>
            </tr>
            </thead>
        </table>
      );
    }
  } else if (selectedGrade === 'Posgrado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      content = (
        <table>
          <thead>
            <tr>
              <th>Crédito</th>
              <td>RD$ {creditosPosMay.toLocaleString()}</td>
            </tr>
            {techResource && <tr>
              <th>Rec. Técnologicos</th>
              <td>RD$ { recursosTec.toLocaleString()}</td>
            </tr>}
            <tr>
              <th>Lab. Tecnología</th>
              <td>RD$ {labTec}</td>
            </tr>
            <tr>
              <th>Serv. Carnet</th>
              <td>RD$ {carnet}</td>
            </tr>
            </thead>
        </table>
      )
    } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
      content = (
        <table>
          <thead>
            <tr>
              <th>Crédito</th>
              <td>RD$ {creditosPosSep.toLocaleString()}</td>
            </tr>
            {techResource && <tr>
              <th>Rec. Técnologicos</th>
              <td>RD$ {recursosTec.toLocaleString()}</td>
            </tr>}
            <tr>
              <th>Lab. Tecnología</th>
              <td>RD$ {labTec}</td>
            </tr>
            <tr>
              <th>Serv. Carnet</th>
              <td>RD$ {carnet}</td>
            </tr>
            </thead>
        </table>
      )
    }
  }

  return (
    <section className="prices-reference">

      <h3 className="calculations-h3"> Referencias de costos </h3>
      <p className="calculations-p" style={{marginBottom: 20}}> Basados en tus selecciones </p>
      
      {selectedCategory === '' || selectedGrade === ''
      ?
      <p> Para ver las referencias, elija el período y el grado</p>
      :
        <div>
        {content}
        </div>
      }

 
    </section>
  )
}

export default Referencias;