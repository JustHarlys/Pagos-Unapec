import { useContext, useMemo } from "react"
import { Checkbox, FormControlLabel } from "@mui/material"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"



function SubjectCheckbox({ materia }) {

  const { selectedLabs, toggleLabSelection} = useContext(SelectLaboratoriesContext);

  const isChecked = useMemo(() => selectedLabs.has(materia.codigo), [selectedLabs, materia.codigo]);

  return (
    <FormControlLabel 
    control={
      <Checkbox
      checked={isChecked}
      onChange={() => toggleLabSelection(materia.codigo)}
      />
    }
    label={`${materia.codigo} - ${materia.nombre}  ------   RD$ ${materia.costo.toLocaleString()}.00`}
    />
  )
}

export default SubjectCheckbox