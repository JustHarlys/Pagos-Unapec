import './HelpContainer.css'
import { useContext } from 'react';
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext';
import { Button } from '@mui/material';


function HelpContainer() {

    const {handleHelpMenu} = useContext(GradeAndPeriodContext)

  return (
   <div className="overlay">
      <div className="overlay-content">


        <h2>Guía en 7 pasos</h2>
        <ol className="steps">
          <li><strong>Paso 1:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li><strong>Paso 2:</strong> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          <li><strong>Paso 3:</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
          <li><strong>Paso 4:</strong> Duis aute irure dolor in reprehenderit in voluptate velit esse.</li>
          <li><strong>Paso 5:</strong> Cillum dolore eu fugiat nulla pariatur.</li>
          <li><strong>Paso 6:</strong> Excepteur sint occaecat cupidatat non proident.</li>
          <li><strong>Paso 7:</strong> Sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        </ol>

                <div className="overlay-header">
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