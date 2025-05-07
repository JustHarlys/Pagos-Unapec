import { useState } from "react"
import './LandingPage.css'

function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [totalCredits, setTotalCredits] = useState(0)

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
      </div>


      <div className="credits-div">
        <label style={{color: 'white'}}>Total de créditos seleccionados: </label>
        <input type="number" name="credits" value={totalCredits}/>
      </div>

    </section>
    </>
  )
}

export default LandingPage
