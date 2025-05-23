import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import './SelectLabs.css'

function SelectLabs() {
  return (
    <section className="select-labs">
      <div className="outer-select">
        <Typography>
          Selecciona las materias
        </Typography>

        <Typography>
          Qty: N
        </Typography>

        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

        <div className='inner-select'>
            <p>Hola</p>
        </div>
    </section>
  )
}

export default SelectLabs