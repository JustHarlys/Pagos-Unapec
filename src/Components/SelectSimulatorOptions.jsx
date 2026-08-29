import { useEffect, useContext } from 'react'

import { simuladores } from '../data/simuladores'
import { SelectSimulatorsContext } from '../Context/SelectSimulatorsContext'
import SimulatorCheckbox from './SimulatorCheckbox'

import './SelectLabs.css'

function SelectSimulatorOptions() {
  const {
    searchSubject,
    setFilteredSubjects,
    filteredSubjects,
  } = useContext(SelectSimulatorsContext)

  useEffect(() => {
    if (searchSubject.trim() !== '') {
      const query = searchSubject.toLowerCase()

      const results = simuladores.filter(
        materia =>
          materia.nombre.toLowerCase().includes(query) ||
          materia.codigo.toLowerCase().includes(query) ||
          materia.tipo.toLowerCase().includes(query)
      )

      setFilteredSubjects(results)
    } else {
      setFilteredSubjects(simuladores)
    }
  }, [searchSubject, setFilteredSubjects])

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