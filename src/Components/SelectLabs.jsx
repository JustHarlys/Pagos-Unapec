import {
  Typography,
  Button,
  TextField,
} from '@mui/material';
import './SelectLabs.css'
import SelectOptions from './SelectOptions';
import { useContext } from 'react';
import { SelectLaboratoriesContext } from '../Context/SelectLaboratories';

function SelectLabs() {

  const {searchSubject, selectedTotal, selectedLabs, handleSelectMenu, CleanLabSelection, setSearchSubject} = useContext(SelectLaboratoriesContext)


  return (
    <section className="select-labs">
      <div className="outer-select">
        <Typography>
          Selecciona las materias
        </Typography>

        <TextField
        size='small'
        type='text'
        placeholder='Filtrar por nombre de asignatura'
        style={{
          width : 1000
        }}
        onChange={(e) => setSearchSubject(e.target.value)}
        value={searchSubject}
        >

        </TextField>

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
              Cerrar y Guardar
          </Button>


        </div>
        
    </section>
  )
}

export default SelectLabs