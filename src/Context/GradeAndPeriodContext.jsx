import { createContext } from "react";
import { useState } from "react";

export const GradeAndPeriodContext = createContext();

export default function GradeAndPeriodProvider({ children }) {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [totalCredits, setTotalCredits] = useState(0);
  const [tuition, setTuition] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('')
  const [noDiscount, setNoDiscount] = useState(0)
  const [creditReference, setCreditReference] = useState(0)
  const [techResource, setTechResource] = useState(false);

  const handleChange = (e) => {
    setTechResource(e.target.checked)

  }

  return (
      <GradeAndPeriodContext.Provider value={{
        selectedCategory,
        setSelectedCategory,
        selectedGrade,
        setSelectedGrade,
        totalCredits,
        setTotalCredits,
        tuition,
        setTuition,
        setPaymentMethod,
        paymentMethod,
        noDiscount,
        setNoDiscount,
        creditReference,
        setCreditReference,
        techResource,
        handleChange,
      }}>
        {children}
      </GradeAndPeriodContext.Provider>
  )
}
