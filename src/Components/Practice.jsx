import React from 'react'

function Practice() {

  const cre = 17
  const creCost = 1955
  const totalCreCol = cre * creCost

  const frontPayment = totalCreCol * 0.30
  const creditoDiferido = totalCreCol * 0.70
  const cargoAdmvo = creditoDiferido * 0.10
  const diferido = creditoDiferido / 3
  const cargoAdmvoPorMes = cargoAdmvo / 3
  const rec = 3025
  const lab = 2670
  const car = 370

  console.log(frontPayment + rec + lab + car)
  console.log(((cargoAdmvoPorMes + diferido) * 3) + frontPayment + rec + lab + car )

  return (
    <div></div>
  )
}

export default Practice