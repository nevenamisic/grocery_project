import React, { useEffect } from 'react'

function Alert({type, msg, removeAlert, list}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        },3000) 
        return () => clearTimeout(timeout)
    },[list]) 
    //svaki put kad se lista promeni poziva se clearTimeout i dobijem novi set timeout od 3s
    //da sam ostavila [], ako kliknem Submit i pre isteka 3s ClearItems, oba ce trajati sve ukupno 3s
  return (
    <p className={`alert alert-${type}`}>{msg}</p> // za css, da znam na koji tip se odnosi
    //svi ce imati alert + alerttype u zavisnosti koji koristim (success ili danger type)
  )
}

export default Alert

