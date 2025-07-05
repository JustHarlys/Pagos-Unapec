import { useContext, useMemo } from "react"
import { Checkbox, FormControlLabel } from "@mui/material"
import { SelectLaboratoriesContext } from "../Context/SelectLaboratories"



function SubjectCheckbox({ materia }) {

  const { selectedLabs, toggleLabSelection, } = useContext(SelectLaboratoriesContext);

  const isChecked = useMemo(() => selectedLabs.has(materia.codigo), [selectedLabs, materia.codigo]);


  return (
    <FormControlLabel 
    control={
      <Checkbox
        checked={isChecked}
        onChange={() => toggleLabSelection(materia.codigo)}
      />
    }
    label={    <div>
      <strong>{materia.codigo}</strong> - {materia.nombre}<br />
      <span style={{ color: '#555' }}>
        RD$ {materia.costo.toLocaleString()}.00
      </span>
    </div>}
    sx={{
      '& .MuiFormControlLabel-label': {
        fontSize: {
          xs: '0.71rem', 
          sm: '0.85rem', 
          md: '1rem'     
        }
      }
    }}
  />
  )
}

export default SubjectCheckbox