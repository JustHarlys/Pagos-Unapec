import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import './SelectLabs.css'
import SelectOptions from './SelectOptions';
import { useContext } from 'react';
import { SelectLaboratoriesContext } from '../Context/SelectLaboratories';

function SelectLabs() {
  const {
    searchSubject,
    selectedTotal,
    selectedLabs,
    handleSelectMenu,
    CleanLabSelection,
    setSearchSubject,
  } = useContext(SelectLaboratoriesContext)

  return (
    <Dialog open fullWidth maxWidth="md" onClose={handleSelectMenu} disableScrollLock>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Typography variant="h6" fontWeight={600}>Selecciona las materias</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Monto Total: <strong>RD$ {selectedTotal.toLocaleString()}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Qty: <strong>{selectedLabs.size}</strong>
            </Typography>
          </Box>
        </Box>
        <TextField
        size='small'
        type='text'
        placeholder='Filtrar por nombre o código'
        sx={{
          width: {
            lg: '600px',
            xs: '250px'
          }
        }}
        onChange={(e) => setSearchSubject(e.target.value)}
        value={searchSubject}
        InputProps={{
          endAdornment: searchSubject && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearchSubject('')}>
                ✕
              </IconButton>
            </InputAdornment>
          )
        }}
        />

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

          <Button variant='contained' sx={{ p: 1.7, mt: 0.7}} onClick={handleSelectMenu} >
              Guardar y Cerrar
          </Button>

      <DialogContent dividers sx={{ p: 0, maxHeight: 400 }}>
        <SelectOptions />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="outlined" color="error" onClick={CleanLabSelection}>
          Limpiar selección
        </Button>
        <Button variant="contained" onClick={handleSelectMenu}>
          Guardar y cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SelectLabs
