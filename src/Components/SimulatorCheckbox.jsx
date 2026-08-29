import { useContext, useMemo } from 'react'
import {
  Checkbox,
  FormControlLabel,
  Chip,
  Box,
} from '@mui/material'

import { SelectSimulatorsContext } from '../Context/SelectSimulatorsContext'

function SimulatorCheckbox({ materia }) {
  const {
    selectedSimulators,
    toggleSimulatorSelection,
  } = useContext(SelectSimulatorsContext)

  const isChecked = useMemo(
    () => selectedSimulators.has(materia.codigo),
    [selectedSimulators, materia.codigo]
  )

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={() => toggleSimulatorSelection(materia.codigo)}
        />
      }
      label={
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <span>
              <strong>{materia.codigo}</strong> - {materia.nombre}
            </span>

            <Chip
              label={materia.tipo}
              size="small"
              variant="outlined"
              sx={{
                height: 20,
                fontSize: '0.65rem',
              }}
            />
          </Box>

          <span style={{ color: '#777' }}>
            RD$ {materia.costo.toLocaleString()}.00
          </span>
        </Box>
      }
      sx={{
        width: '100%',
        margin: 0,
        padding: '6px 10px 6px 0',

        '& .MuiFormControlLabel-label': {
          width: '100%',
          fontSize: {
            xs: '0.71rem',
            sm: '0.85rem',
            md: '1rem',
          },
        },
      }}
    />
  )
}

export default SimulatorCheckbox