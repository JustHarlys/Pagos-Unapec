import './HelpContainer.css'
import { useContext } from 'react';
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext';
import { Button } from '@mui/material';


function HelpContainer() {

    const {handleHelpMenu} = useContext(GradeAndPeriodContext)

  return (
   <div className="overlay">
      <div className="overlay-content">


        <h2 style={{marginBottom: 20}}>Como funciona esta herramienta</h2>
        <ol className="steps">
          <li><strong>Paso 1:</strong> Tener presente a cuál de las 2 categorías pertenece, ya que el costo por crédito varía.</li>
          <li><strong>Paso 2:</strong> Seleccionar el tipo de Grado correspondiente.</li>
          <li><strong>Paso 3:</strong> Seleccionar uno de los 3 métodos de pagos brindados por la universidad, puede ver como varían los montos una vez hecho el cálculo con solo cambiar la modalidad de pago.</li>
          <li><strong>Paso 4:</strong> Hay asignaturas que agregan un monto extra por Laboratorio, debe seleccionar cuales en el botón que dice "Seleccionar Labs", ahí puede verificar todas las asignaturas que llevan este costo agregado.</li>
          <li><strong>Paso 5:</strong> Si su carrera requiere de recursos de tecnología (ISO, ISC, etc...) marque la casilla de Recursos Tecnologicos.</li>
          <li><strong>Paso 6:</strong> Debe saber con exactitud la cantidad de créditos que preseleccionó para que el cálculo sea correcto. Vaya a BANNER {'>'} Inscripción, horario y planificación {'>'} Ver información de inscripción, seleccione su periodo y puede ver <strong>Inscritas: N</strong></li>
          <li><strong>Paso 7:</strong> Presione calcular colegiatura y esto dará como resultado cuánto pagará en el cuatrimestre entrante, una vez calculado puede cambiar el método de pago para ver cuanto pagaría y cuál sería la diferencia en cada uno de ellos.</li>
        </ol>

                <div className="overlay-header">

          <p style={{width: 300, fontSize: 12}}><strong>NOTA: ESTA HERRAMIENTA NO DA RESULTADOS RELACIONADOS A BECAS, DEBIDO A LA VARIABILIDAD DE LOS MONTOS.</strong></p>
          
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleHelpMenu}
          >
            Salir
          </Button>
        </div>

        
      </div>

      
    </div>
  );
}

export default HelpContainer