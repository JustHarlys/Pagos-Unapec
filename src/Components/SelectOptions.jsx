import { materias } from "../data/materias"
import { materiasPosgrado } from "../data/materiasPosgrado"
import { useEffect, useContext } from "react"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import './SelectLabs.css'


import './SelectLabs.css'
import SubjectCheckbox from "./SubjectCheckbox"
import { GradeAndPeriodContext } from "../Context/GradeAndPeriodContext"

function SelectOptions() {

  const { searchSubject, setFilteredSubjects, filteredSubjects} = useContext(SelectLaboratoriesContext)
  
  const { selectedGrade } = useContext(GradeAndPeriodContext)

  useEffect(() => {
    const baseData = !selectedGrade || selectedGrade === 'Grado' ? materias : materiasPosgrado;

    if (searchSubject.trim() !== '') {
      const res = baseData.filter((materia) =>
        materia.nombre.toLowerCase().startsWith(searchSubject.toLowerCase())
      );
      setFilteredSubjects(res);
    } else {
      setFilteredSubjects(baseData);
    }
  }, [searchSubject, selectedGrade]);

  return (
    <div className="subjects">
      {filteredSubjects.map((materia) => (
        <div key={materia.codigo} className="inner-subject">
        <SubjectCheckbox  materia={materia}/>
        </div>
      ))}
    </div>
  )
}

export default SelectOptions
