import { materias } from "../data/materias"
import { useEffect, useContext } from "react"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"
import './SelectLabs.css'


import './SelectLabs.css'
import SubjectCheckbox from "./SubjectCheckbox"

function SelectOptions() {

  const { searchSubject, setFilteredSubjects, filteredSubjects} = useContext(SelectLaboratoriesContext)
  

  useEffect(() => {
    if (searchSubject.trim() !== '') {
      const res = materias.filter((materia) =>
        materia.nombre.toLowerCase().startsWith(searchSubject.toLowerCase())
      );
      setFilteredSubjects(res);
    } else {
      setFilteredSubjects(materias);
    }
  }, [searchSubject]);

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
