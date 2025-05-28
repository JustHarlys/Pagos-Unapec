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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useContext } from 'react';
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext';
import { referenciasMayo } from '../referencias-may-ago';
import { referenciasSep } from '../referencias-sep-dic';
import { SelectLaboratoriesContext } from '../Context/SelectLaboratories';
import SelectLabs from './SelectLabs';
import '../App.css'

function LandingPage() {

  const {
    selectedCategory,
    setSelectedCategory,
    selectedGrade,
    setSelectedGrade,
    totalCredits,
    setTotalCredits,
    setTuition,
    paymentMethod,
    setPaymentMethod,
    setNoDiscount,
    setCreditReference,
    techResource,
    handleChange
  } = useContext(GradeAndPeriodContext);


  const {
    showMenu,
    handleSelectMenu,
    selectedLabs
  } = useContext(SelectLaboratoriesContext)

  const posgradoMayo = referenciasMayo.creditos + 1665
  const posgradoSep = referenciasMayo.creditos + 1835



  function handleOnChange(e) {
    setTotalCredits(parseInt(e.target.value));
  }

  function handleCreditsMultiplier() {

    if (selectedGrade === 'Grado') {
      if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
        if (paymentMethod === 'Contado') {
          setTuition((totalCredits * referenciasMayo.creditos) - ((totalCredits * referenciasMayo.creditos) * 0.10))
          setNoDiscount(totalCredits * referenciasMayo.creditos)
          setCreditReference(referenciasMayo.creditos)
        }

        else if (paymentMethod === 'Anticipo del 30') {
          setNoDiscount(totalCredits * referenciasMayo.creditos)
          setTuition(totalCredits * referenciasMayo.creditos)
          setCreditReference(referenciasMayo.creditos)
        } 

        else if (paymentMethod === 'Anticipo del 20') {
          setNoDiscount(totalCredits * referenciasMayo.creditos)
          setTuition(totalCredits * referenciasMayo.creditos)
          setCreditReference(referenciasMayo.creditos)
        }

      } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
        if (paymentMethod === 'Contado') {
          setTuition((totalCredits * referenciasSep.creditosSep) - ((totalCredits * referenciasSep.creditosSep) * 0.10))
          setNoDiscount(totalCredits * referenciasSep.creditosSep)
          setCreditReference(referenciasSep.creditosSep)
        }

        else if (paymentMethod === 'Anticipo del 30') {
          setNoDiscount(totalCredits * referenciasSep.creditosSep)
          setTuition(totalCredits * referenciasSep.creditosSep)
          setCreditReference(referenciasSep.creditosSep)
        } 

        else if (paymentMethod === 'Anticipo del 20') {
          setNoDiscount(totalCredits * referenciasSep.creditosSep)
          setTuition(totalCredits * referenciasSep.creditosSep)
          setCreditReference(referenciasSep.creditosSep)
        }
      }
    }

    else if (selectedGrade === 'Posgrado') {
      if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
        if (paymentMethod === 'Contado') {
          setTuition((totalCredits * posgradoMayo) - ((totalCredits * posgradoMayo) * 0.10))
          setNoDiscount(totalCredits * posgradoMayo)
          setCreditReference(posgradoMayo)

        } 
        
        else if (paymentMethod === 'Anticipo del 30') {
          setTuition(totalCredits * posgradoMayo)
          setNoDiscount(totalCredits * posgradoMayo)
          setCreditReference(posgradoMayo)
        } 

        else if (paymentMethod === 'Anticipo del 20') {
          setTuition(totalCredits * posgradoMayo)
          setNoDiscount(totalCredits * posgradoMayo)
          setCreditReference(posgradoMayo)
        }


      } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
        if (paymentMethod === 'Contado') {
          setTuition((totalCredits * posgradoSep) - ((totalCredits * posgradoSep) * 0.10))
          setNoDiscount(totalCredits * posgradoSep)
          setCreditReference(posgradoSep)
        } 
        
        else if (paymentMethod === 'Anticipo del 30') {
          setTuition(totalCredits * posgradoSep)
          setNoDiscount(totalCredits * posgradoSep)
          setCreditReference(posgradoSep)
        }

        else if (paymentMethod === 'Anticipo del 20') {
          setTuition(totalCredits * posgradoSep)
          setNoDiscount(totalCredits * posgradoSep)
          setCreditReference(posgradoSep)
        }
      }
    }

  }

  return (
    <Container sx={{ mt: 4, width: {xs : '100%', lg : '40%'} }} className='main-container'>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Pre-planifica tu colegiatura
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Categoría</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Categoría"
          >
            <MenuItem value="Admitido hasta mayo-ago 2024">
              Admitido hasta mayo-ago 2024
            </MenuItem>
            <MenuItem value="Admitido a partir de sept-dic 2024">
              Admitido a partir de sept-dic 2024
            </MenuItem>
          </Select>
        </FormControl>



        <FormControl fullWidth margin="normal">
          <InputLabel>Grado</InputLabel>
          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            label="Grado"
          >
            <MenuItem value="Grado">Grado</MenuItem>
            <MenuItem value="Posgrado">Posgrado</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel>Método de Pago</InputLabel>
          <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          label="PaymentMethod"
          >
            <MenuItem value="Contado">Pago de contado</MenuItem>
            <MenuItem value="Anticipo del 30">Pago anticipado del 30%</MenuItem>
            <MenuItem value="Anticipo del 20">Pago anticipado del 20%</MenuItem>
          </Select>
        </FormControl>

        <div className='select-laboratory' style={{display: 'flex', alignItems: 'center'}}>


        <TextField
          value={selectedLabs.size === 0 ? '' : selectedLabs.size}
          label={selectedLabs.size === 0 ? '' : "Laboratorios"}
          type='number'
          margin='normal'
          sx={{width: {
            xs : '100%',
            lg : '40%'
          }}}
          InputProps={{
            readOnly: true
          }}
          className='lab-textfield'
          placeholder='Seleccionar Labs'
          disabled
          />

          <Button variant='contained' sx={{ p: 1.7, mt: 0.7, width : {xs : '100%', lg: '40%'}}} onClick={handleSelectMenu} className='btn-select-tabs' size='medium'>
            Seleccionar labs
          </Button>

        </div>



          <FormControl sx={{mt : { xs : 2}}}>
          <FormControlLabel control={<Checkbox />} value={techResource} onChange={handleChange} label="Recursos Tecnologicos"/>
          </FormControl>


        <TextField
          fullWidth
          label="Total de créditos"
          type="number"
          value={totalCredits}
          onChange={handleOnChange}
          margin="normal"
        />

        <Button variant="contained" onClick={handleCreditsMultiplier} sx={{ mt: 2, width : {xs : '100%'}, p: 1.7}}>
          Calcular colegiatura
        </Button>

        {showMenu && <SelectLabs />}
      </Paper>
    </Container>
  );
}

export default LandingPage;
