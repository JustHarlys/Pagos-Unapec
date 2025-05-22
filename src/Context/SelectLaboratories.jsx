import { createContext, useState } from "react";

export const SelectLaboratoriesContext = createContext()

export default function SelectLaboratoriesProvider({ children }) {

    const [showMenu, setShowMenu] = useState(false)
    const [labs, setLabs] = useState(0)

    function handleSelectMenu() {
        setShowMenu(prevState => !prevState)
        console.log(showMenu)
    }
 
    return(
        <SelectLaboratoriesContext.Provider
            value={{
                showMenu,
                handleSelectMenu,
                labs,
                setLabs
            }}
        >
            {children}
        </SelectLaboratoriesContext.Provider>
    )

}