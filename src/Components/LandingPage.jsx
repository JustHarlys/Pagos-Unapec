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
import { useContext, useState } from 'react';
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext';
import { referenciasMayo } from '../referencias-may-ago';
import { referenciasSep } from '../referencias-sep-dic';

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
    setPaymentMethod
  } = useContext(GradeAndPeriodContext);

  const posgradoMayo = referenciasMayo.creditos + 1665
  const posgradoSep = referenciasMayo.creditos + 1835



  function handleOnChange(e) {
    setTotalCredits(parseInt(e.target.value));
  }

  function handleCreditsMultiplier() {

    if (selectedGrade === 'Grado') {
      if (paymentMethod === 'Contado') {
        if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
          setTuition((totalCredits * referenciasMayo.creditos) - ((totalCredits * referenciasMayo.creditos) * 0.10))
        }
      }
    }

    else if (selectedGrade === 'Posgrado') {
      if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
        setTuition(totalCredits * posgradoMayo)
      } else if (selectedCategory === 'Admitido a partir de sept-dic 2024') {
        setTuition(totalCredits * posgradoSep)
      }
    }
  }

  return (
    <Container sx={{ mt: 4, width: '40%' }}>
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

        <TextField
          fullWidth
          label="Total de créditos"
          type="number"
          value={totalCredits}
          onChange={handleOnChange}
          margin="normal"
        />



        <Button variant="contained" onClick={handleCreditsMultiplier} sx={{ mt: 2 }}>
          Calcular colegiatura
        </Button>
      </Paper>
    </Container>
  );
}

export default LandingPage;
