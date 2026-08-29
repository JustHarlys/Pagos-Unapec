import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from 'react'

import { simuladores } from '../data/simuladores'
import { simuladoresPosgrado } from '../data/simuladoresPosgrado'
import { GradeAndPeriodContext } from './GradeAndPeriodContext'

export const SelectSimulatorsContext = createContext()

export default function SelectSimulatorsProvider({ children }) {
  const { selectedGrade } = useContext(GradeAndPeriodContext)

  const [showMenu, setShowMenu] = useState(false)
  const [selectedSimulators, setSelectedSimulators] = useState(new Set())
  const [searchSubject, setSearchSubject] = useState('')
  const [filteredSubjects, setFilteredSubjects] = useState(simuladores)

  useEffect(() => {
    if (selectedGrade === 'Grado' || !selectedGrade) {
      setFilteredSubjects(simuladores)
    } else if (selectedGrade === 'Posgrado') {
      setFilteredSubjects(simuladoresPosgrado)
    }

    setSelectedSimulators(new Set())
    setSearchSubject('')
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
      const simulator =
        simuladores.find(m => m.codigo === codigo) ||
        simuladoresPosgrado.find(m => m.codigo === codigo)

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