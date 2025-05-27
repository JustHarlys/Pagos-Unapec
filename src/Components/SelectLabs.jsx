import {
  Typography,
  Button,
} from '@mui/material';
import './SelectLabs.css'
import SelectOptions from './SelectOptions';
import { useContext } from 'react';
import { SelectLaboratoriesContext } from '../Context/SelectLaboratories';
import { materias } from '../data/materias';

function SelectLabs() {

  const {selectedLabs, handleSelectMenu, CleanLabSelection, showInputFilter, handleSearchInput} = useContext(SelectLaboratoriesContext)

  // Calcular Total RD$ de los laboratorios
  const selectedTotal = Array.from(selectedLabs).reduce((total, codigo) => {
  const lab = materias.find(m => m.codigo === codigo);
  return total + (lab ? lab.costo : 0);
}, 0);
  return (
    <section className="select-labs">
      <div className="outer-select">
        <Typography>
          Selecciona las materias
        </Typography>

        <div className='qty-search'> 
        <Typography>
          Monto Total: RD$ {selectedTotal.toLocaleString()}
        </Typography>

        <Typography>
          Qty: {selectedLabs.size}
        </Typography>

        </div>
      </div>

        <div className='inner-select'>
            <SelectOptions />
        </div>

        <div className='buttons-labs'>

          <Button variant='contained' sx={{ p: 1.7, mt: 0.7}} onClick={CleanLabSelection}>
            Limpiar
          </Button>

          <Button variant='contained' sx={{ p: 1.7, mt: 0.7}} onClick={handleSelectMenu} style={{backgroundColor: 'red'}}>
              Cerrar
          </Button>


        </div>
        
    </section>
  )
}

export default SelectLabs