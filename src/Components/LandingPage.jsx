import {
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
  Box,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { useContext } from 'react';
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext';
import { referenciasMayo } from '../referencias-may-ago';
import { referenciasSep } from '../referencias-sep-dic';
import { SelectLaboratoriesContext } from '../Context/SelectLaboratories';
import SelectLabs from './SelectLabs';
import HelpContainer from './HelpContainer';
import { SelectSimulatorsContext } from '../Context/SelectSimulatorsContext'
import SelectSimulators from './SelectSimulators'

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
    handleChange,
    handleHelpMenu,
    showHelp,
    trabajoFinal,
    setTrabajoFinal,
    setRegularCreditsSubtotal,
    setFinalProjectSubtotal,
  } = useContext(GradeAndPeriodContext);

  const { showMenu, handleSelectMenu, selectedLabs } = useContext(SelectLaboratoriesContext);
  const {
    showMenu: showSimulatorMenu,
    handleSelectMenu: handleSimulatorMenu,
    selectedSimulators,
  } = useContext(SelectSimulatorsContext);

  const creditoPosgrado = 4460
  const CREDITO_TRABAJO_FINAL = 4725
  const CREDITOS_TRABAJO_FINAL = 6

  function handleOnChange(e) {
    setTotalCredits(parseInt(e.target.value));
  }

function handleCreditsMultiplier() {
  let costoCreditoRegular = 0

  if (selectedGrade === 'Grado') {
    if (selectedCategory === 'Admitido hasta mayo-ago 2024') {
      costoCreditoRegular = referenciasMayo.creditos
    } else if (
      selectedCategory === 'Admitido a partir de sept-dic 2024'
    ) {
      costoCreditoRegular = referenciasSep.creditosSep
    }
  } else if (selectedGrade === 'Posgrado') {
    costoCreditoRegular = creditoPosgrado
  }

  const creditosRegulares = Number(totalCredits) || 0

  const subtotalCreditosRegulares =
    creditosRegulares * costoCreditoRegular

  const cursaTrabajoFinal =
    selectedGrade === 'Grado' &&
    (trabajoFinal === 'MON400' || trabajoFinal === 'TES500')

  const subtotalTrabajoFinal = cursaTrabajoFinal
    ? CREDITOS_TRABAJO_FINAL * CREDITO_TRABAJO_FINAL
    : 0

  const totalSinDescuento =
    subtotalCreditosRegulares + subtotalTrabajoFinal

  const totalFinal =
    paymentMethod === 'Contado'
      ? totalSinDescuento * 0.90
      : totalSinDescuento

  setRegularCreditsSubtotal(subtotalCreditosRegulares)
  setFinalProjectSubtotal(subtotalTrabajoFinal)

  setNoDiscount(totalSinDescuento)
  setTuition(totalFinal)
  setCreditReference(costoCreditoRegular)
}

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#FAFBFC',
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Pre-planifica tu colegiatura
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Estimado orientativo — no oficial
          </Typography>
        </Box>
        <Tooltip title="¿Cómo funciona?" placement="left">
          <IconButton onClick={handleHelpMenu} size="small" color="primary">
            <i className="fa-solid fa-circle-question" style={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ px: 3, py: 3 }}>
        {showHelp && <HelpContainer />}

        <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Perfil académico
        </Typography>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Categoría de admisión</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Categoría de admisión"
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="Admitido hasta mayo-ago 2024">Admitido hasta mayo-ago 2024</MenuItem>
            <MenuItem value="Admitido a partir de sept-dic 2024">Admitido a partir de sept-dic 2024</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Nivel de grado</InputLabel>
          <Select
            value={selectedGrade}
            onChange={(e) => {
              const gradoSeleccionado = e.target.value

              setSelectedGrade(gradoSeleccionado)

              if (gradoSeleccionado !== 'Grado') {
                setTrabajoFinal('')
              }
            }}
            label="Nivel de grado"
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="Grado">Grado</MenuItem>
            <MenuItem value="Posgrado">Posgrado</MenuItem>
          </Select>

        {selectedGrade === 'Grado' && (
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel>Trabajo Final de Grado</InputLabel>

            <Select
              value={trabajoFinal}
              onChange={(e) => setTrabajoFinal(e.target.value)}
              label="Trabajo Final de Grado"
              MenuProps={{ disableScrollLock: true }}
            >
              <MenuItem value="">
                No estoy cursándolo
              </MenuItem>

              <MenuItem value="MON400">
                Monográfico — MON400
              </MenuItem>

              <MenuItem value="TES500">
                Tesis — TES500
              </MenuItem>
            </Select>

            {trabajoFinal && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.75, ml: 1.75 }}
              >
                Se agregarán automáticamente 6 créditos a RD$4,725 cada uno.
              </Typography>
            )}
          </FormControl>
        )}
        </FormControl>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Créditos y servicios
        </Typography>

        <TextField
          fullWidth
          label={trabajoFinal ? 'Créditos adicionales' : 'Total de créditos'}
          type="number"
          value={totalCredits}
          onChange={handleOnChange}
          margin="normal"
          size="small"
          inputProps={{ min: 0 }}
          helperText={
            trabajoFinal
              ? 'No incluyas los 6 créditos de Tesis o Monográfico; se agregan automáticamente.'
              : 'Introduce los créditos que cursarás durante el período.'
          }
        />

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'stretch', mt: 1, mb: 0.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            value={selectedLabs.size === 0 ? '' : selectedLabs.size}
            label={selectedLabs.size > 0 ? `${selectedLabs.size} lab${selectedLabs.size > 1 ? 's' : ''} seleccionado${selectedLabs.size > 1 ? 's' : ''}` : ''}
            type="number"
            size="small"
            sx={{ flex: 1 }}
            InputProps={{ readOnly: true }}
            placeholder="Sin labs"
            disabled
          />
          <Button
            variant="outlined"
            onClick={handleSelectMenu}
            size="small"
            sx={{ flex: 1, whiteSpace: 'nowrap', borderStyle: 'dashed', height: 40 }}
          >
            <i className="fa-solid fa-flask" style={{ marginRight: 8, fontSize: 12 }} />
            Seleccionar labs
          </Button>
        </Box>

        {selectedGrade === 'Grado' && (
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              alignItems: 'stretch',
              mt: 3,
              mb: 0.5,
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          >
            <TextField
              value={
                selectedSimulators.size === 0
                  ? ''
                  : selectedSimulators.size
              }
              label={
                selectedSimulators.size > 0
                  ? `${selectedSimulators.size} cargo${
                      selectedSimulators.size > 1 ? 's' : ''
                    } seleccionado${
                      selectedSimulators.size > 1 ? 's' : ''
                    }`
                  : ''
              }
              type="number"
              size="small"
              sx={{ flex: 1 }}
              InputProps={{ readOnly: true }}
              placeholder="Sin simuladores"
              disabled
            />

            <Button
              variant="outlined"
              onClick={handleSimulatorMenu}
              size="small"
              sx={{
                flex: 1,
                whiteSpace: 'nowrap',
                borderStyle: 'dashed',
                height: 40,
              }}
            >
              <i
                className="fa-solid fa-laptop"
                style={{
                  marginRight: 8,
                  fontSize: 12,
                }}
              />

              Simuladores / Microcred.
            </Button>
          </Box>
        )}

        <FormControlLabel
          control={<Checkbox size="small" />}
          value={techResource}
          onChange={handleChange}
          label={
            <Typography variant="body2">
              Recursos Tecnológicos
            </Typography>
          }
          sx={{ mt: 0.5 }}
        />

        <Divider sx={{ my: 2.5 }} />

        <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Método de pago
        </Typography>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Método de pago</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Método de pago"
            MenuProps={{ disableScrollLock: true }}
          >
            <MenuItem value="Contado">
              <Box>
                <Typography variant="body2" fontWeight={500}>Pago de contado</Typography>
                <Typography variant="caption" color="success.main" fontWeight={600}>10% de descuento</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="Anticipo del 30">Pago anticipado del 30%</MenuItem>
            <MenuItem value="Anticipo del 20">Pago anticipado del 20%</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreditsMultiplier}
          fullWidth
          size="large"
          sx={{ mt: 2.5, py: 1.4, fontSize: '1rem' }}
        >
          <i className="fa-solid fa-calculator" style={{ marginRight: 10 }} />
          Calcular colegiatura
        </Button>
      </Box>

      {showMenu && <SelectLabs />}
      {showSimulatorMenu && ( <SelectSimulators /> )}
    </Paper>
  );
}

export default LandingPage;
