import './LandingPage.css';
import { GradeAndPeriodContext } from '../Context/GradeAndPeriodContext';
import { useContext } from 'react';

function LandingPage() {

  const {selectedCategory, setSelectedCategory, selectedGrade, setSelectedGrade, totalCredits, setTotalCredits} = useContext(GradeAndPeriodContext)

  function handleOnChange(e) {
    setTotalCredits(parseInt(e.target.value))
    console.log(typeof(totalCredits))
  }

  return (
    <>
    <section className="landing-page-section">
      <div className="select-div">
        <p>Selecciona una categoría:</p>
        <select 
          name="selectedCategory" 
          id="select-period" 
          value={selectedCategory} 
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {selectedCategory === '' && (
            <option value="">-- Selecciona una categoría --</option>
          )}
          <option value="Admitido a partir de sept-dic 2024">Admitido a partir de sept-dic 2024</option>
          <option value="Admitido hasta mayo-ago 2024">Admitido hasta mayo-ago 2024</option>
        </select>
      </div>

      <div className="select-div">
       <p> Selecciona un grado: </p>
        <select 
          name="selectedGrade" 
          id="selected-grade" 
          value={selectedGrade} 
          onChange={e => setSelectedGrade(e.target.value)}
          >
          {selectedGrade === '' && (
            <option value="">-- Selecciona un grado --</option>
          )}
          <option value="Grado">Grado</option>
          <option value="Posgrado">Posgrado</option>
        </select>

        <label style={{color: 'white'}} className="label-credits">Total de créditos seleccionados: </label>
        <input type="number" name="totalCredits" value={totalCredits} onChange={handleOnChange}/>
      </div>
    </section>
    </>
  )
}

export default LandingPage
