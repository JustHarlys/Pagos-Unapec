import { createContext, useState } from "react";

export const SelectLaboratoriesContext = createContext()

export default function SelectLaboratoriesProvider({ children }) {


    const [showMenu, setShowMenu] = useState(false)
    const [showInputFilter, setShowInputFilter] = useState(false)
    const [selectedLabs, setSelectedLabs] = useState(new Set())

    function handleSelectMenu() {
        setShowMenu(prevState => !prevState)
        console.log(showMenu)
    }

    function handleSearchInput() {
        setShowInputFilter(prevState => !prevState);
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
                showInputFilter,
                handleSearchInput
            }}
        >
            {children}
        </SelectLaboratoriesContext.Provider>
    )

}