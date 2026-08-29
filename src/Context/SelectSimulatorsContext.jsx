import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from 'react'

import { simuladores } from '../data/simuladores'
import { GradeAndPeriodContext } from './GradeAndPeriodContext'

export const SelectSimulatorsContext = createContext()

export default function SelectSimulatorsProvider({ children }) {
  const { selectedGrade } = useContext(GradeAndPeriodContext)

  const [showMenu, setShowMenu] = useState(false)
  const [selectedSimulators, setSelectedSimulators] = useState(new Set())
  const [searchSubject, setSearchSubject] = useState('')
  const [filteredSubjects, setFilteredSubjects] = useState(simuladores)

  useEffect(() => {
    if (selectedGrade === 'Grado') {
      setFilteredSubjects(simuladores)
    } else {
      setFilteredSubjects([])
      setSelectedSimulators(new Set())
      setSearchSubject('')
      setShowMenu(false)
    }
  }, [selectedGrade])

  function handleSelectMenu() {
    setShowMenu(prevState => !prevState)
  }

  function toggleSimulatorSelection(codigo) {
    setSelectedSimulators(prev => {
      const updated = new Set(prev)

      if (updated.has(codigo)) {
        updated.delete(codigo)
      } else {
        updated.add(codigo)
      }

      return updated
    })
  }

  const selectedTotal = useMemo(() => {
    return Array.from(selectedSimulators).reduce((total, codigo) => {
      const simulator = simuladores.find(
        materia => materia.codigo === codigo
      )

      return total + (simulator ? simulator.costo : 0)
    }, 0)
  }, [selectedSimulators])

  function cleanSelection() {
    setSelectedSimulators(new Set())
  }

  return (
    <SelectSimulatorsContext.Provider
      value={{
        showMenu,
        handleSelectMenu,
        selectedSimulators,
        toggleSimulatorSelection,
        cleanSelection,
        selectedTotal,
        searchSubject,
        setSearchSubject,
        filteredSubjects,
        setFilteredSubjects,
      }}
    >
      {children}
    </SelectSimulatorsContext.Provider>
  )
}