import { createContext } from "react";
import { useState } from "react";

export const GradeAndPeriodContext = createContext();

export default function GradeAndPeriodProvider({ children }) {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [totalCredits, setTotalCredits] = useState(0);
  const [tuition, setTuition] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('')
  const [tenPercent, setTenPercent] = useState(0)


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
        tenPercent,
        setTenPercent
      }}>
        {children}
      </GradeAndPeriodContext.Provider>
  )
}
