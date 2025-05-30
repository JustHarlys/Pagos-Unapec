import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { materias } from "../data/materias";
import { materiasPosgrado } from "../data/materiasPosgrado";
import { GradeAndPeriodContext } from "./GradeAndPeriodContext";

export const SelectLaboratoriesContext = createContext()

export default function SelectLaboratoriesProvider({ children }) {
  const { selectedGrade } = useContext(GradeAndPeriodContext);

  const [showMenu, setShowMenu] = useState(false);
  const [selectedLabs, setSelectedLabs] = useState(new Set());
  const [searchSubject, setSearchSubject] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);


    useEffect(() => {
        if (selectedGrade === 'Grado' || !selectedGrade) {
            setFilteredSubjects(materias);
        } else if (selectedGrade === 'Posgrado') {
            setFilteredSubjects(materiasPosgrado);
        }
    }, [selectedGrade]);

  function handleSelectMenu() {
    setShowMenu(prevState => !prevState);
  }

  function toggleLabSelection(labId) {
    setSelectedLabs(prev => {
      const updated = new Set(prev);
      updated.has(labId) ? updated.delete(labId) : updated.add(labId);
      return updated;
    });
  }

  const selectedTotal = useMemo(() => {
    return Array.from(selectedLabs).reduce((total, codigo) => {
      const lab = materias.find(m => m.codigo === codigo) || materiasPosgrado.find(m => m.codigo === codigo);
      return total + (lab ? lab.costo : 0);
    }, 0);
  }, [selectedLabs]);

  function CleanLabSelection() {
    setSelectedLabs(new Set());
  }

  return (
    <SelectLaboratoriesContext.Provider
      value={{
        showMenu,
        handleSelectMenu,
        selectedLabs,
        toggleLabSelection,
        CleanLabSelection,
        selectedTotal,
        searchSubject,
        setSearchSubject,
        filteredSubjects,
        setFilteredSubjects
      }}
    >
      {children}
    </SelectLaboratoriesContext.Provider>
  );
}