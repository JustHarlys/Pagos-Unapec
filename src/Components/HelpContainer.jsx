import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from '@mui/material'
import { useContext } from 'react'
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext'

const steps = [
  'Tener presente a cuál de las 2 categorías pertenece, ya que el costo por crédito varía.',

  'Seleccionar el tipo de Grado correspondiente.',

  'Seleccionar uno de los 3 métodos de pago brindados por la universidad. Puede ver cómo varían los montos con solo cambiar la modalidad una vez hecho el cálculo.',

  'Hay asignaturas que agregan un monto extra por Laboratorio. Debe seleccionar cuáles en el botón "Seleccionar Labs", donde puede verificar todas las asignaturas con este costo adicional.',

  'Algunas asignaturas de grado incluyen costos adicionales por simuladores o microcredenciales. Si planea cursar alguna de ellas, selecciónela en "Simuladores / Microcred.".',

  'Si su carrera requiere recursos de tecnología (ISO, ISC, etc.) marque la casilla de Recursos Tecnológicos.',

  'Debe saber con exactitud la cantidad de créditos preseleccionados. Vaya a BANNER → Inscripción, horario y planificación → Ver información de inscripción, seleccione su periodo y vea Inscritas: N.',

  'Presione Calcular colegiatura para obtener el total del cuatrimestre. Una vez calculado, puede cambiar el método de pago para comparar opciones.',
]

function HelpContainer() {
  const { handleHelpMenu } = useContext(GradeAndPeriodContext)

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={handleHelpMenu} disableScrollLock>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Cómo funciona esta herramienta
        </Typography>
        <Typography variant="caption" color="error.main" fontWeight={700}>
          LEER ANTES DE USAR
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <ol style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {steps.map((step, i) => (
            <li key={i} style={{ marginBottom: '0.8rem', lineHeight: 1.6 }}>
              <strong>Paso {i + 1}:</strong> {step}
            </li>
          ))}
        </ol>

        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 1,
            bgcolor: 'warning.main',
            opacity: 0.9,
          }}
        >
          <Typography variant="caption" fontWeight={700} color="warning.contrastText">
            NOTA: ESTA HERRAMIENTA NO DA RESULTADOS RELACIONADOS A BECAS, DEBIDO A LA VARIABILIDAD DE LOS MONTOS.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="contained" color="error" onClick={handleHelpMenu}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HelpContainer
