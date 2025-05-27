import { createContext, useState, useMemo } from "react";
import { materias } from "../data/materias";

export const SelectLaboratoriesContext = createContext()

export default function SelectLaboratoriesProvider({ children }) {


    const [showMenu, setShowMenu] = useState(false)
    const [selectedLabs, setSelectedLabs] = useState(new Set())
    const [searchSubject, setSearchSubject] = useState('')
    const [filteredSubjects, setFilteredSubjects] = useState(materias)

    function handleSelectMenu() {
        setShowMenu(prevState => !prevState)
    }

    function toggleLabSelection(labId) {
        setSelectedLabs(prev => {
            const updated = new Set(prev);
            if (updated.has(labId)) {
                updated.delete(labId);
            } else {
                updated.add(labId)
            }
            return updated
        })
    }

    const selectedTotal = useMemo(() => {
        return Array.from(selectedLabs).reduce((total, codigo) => {
            const lab = materias.find(m => m.codigo === codigo);
            return total + (lab ? lab.costo : 0);
        }, 0);
    }, [selectedLabs])

    function CleanLabSelection() {
        setSelectedLabs(new Set())
    }
 
    return(
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
    )

}