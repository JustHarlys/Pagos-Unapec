import { materias } from "../data/materias"
import './SelectLabs.css'


import './SelectLabs.css'
import SubjectCheckbox from "./SubjectCheckbox"

function SelectOptions() {
  return (
    <div className="subjects">
      {materias.map((materia) => (
        <SubjectCheckbox key={materia.codigo} materia={materia} />
      ))}
    </div>
  )
}

export default SelectOptions