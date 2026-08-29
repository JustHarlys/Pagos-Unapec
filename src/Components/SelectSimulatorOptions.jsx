import { useEffect, useContext } from 'react'

import { simuladores } from '../data/simuladores'
import { simuladoresPosgrado } from '../data/simuladoresPosgrado'

import { SelectSimulatorsContext } from '../Context/SelectSimulatorsContext'
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext'

import SimulatorCheckbox from './SimulatorCheckbox'

import './SelectLabs.css'

function SelectSimulatorOptions() {
  const {
    searchSubject,
    setFilteredSubjects,
    filteredSubjects,
  } = useContext(SelectSimulatorsContext)

  const { selectedGrade } = useContext(GradeAndPeriodContext)

  useEffect(() => {
    const baseData =
      !selectedGrade || selectedGrade === 'Grado'
        ? simuladores
        : simuladoresPosgrado

    if (searchSubject.trim() !== '') {
      const query = searchSubject.toLowerCase()

      const results = baseData.filter(
        materia =>
          materia.nombre.toLowerCase().includes(query) ||
          materia.codigo.toLowerCase().includes(query) ||
          materia.tipo.toLowerCase().includes(query) ||
          materia.referencia?.toLowerCase().includes(query)
      )

      setFilteredSubjects(results)
    } else {
      setFilteredSubjects(baseData)
    }
  }, [
    searchSubject,
    selectedGrade,
    setFilteredSubjects,
  ])

  return (
    <div className="subjects">
      {filteredSubjects.map(materia => (
        <div
          key={materia.codigo}
          className="inner-subject"
        >
          <SimulatorCheckbox materia={materia} />
        </div>
      ))}
    </div>
  )
}

export default SelectSimulatorOptions