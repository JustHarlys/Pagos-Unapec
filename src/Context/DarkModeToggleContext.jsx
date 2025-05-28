import { createContext, useState } from "react"

export const DarkModeContext = createContext()

function DarkModeToggleProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false); 
  
  const handleToggle = () => {
    setDarkMode(prevState => !prevState)
  }

  return (
    <DarkModeContext.Provider value={{
      darkMode,
      handleToggle
    }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeToggleProvider;