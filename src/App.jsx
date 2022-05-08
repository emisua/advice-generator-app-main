import './App.css'
import React, { useState, useEffect } from 'react'

function App () {
  const [randomAdvice, setRandomAdvice] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const changeAdvice = async () => { // Función asyncrona para recuperar los datos del fetch
      await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' })
        .then(response => response.json())
        .then(data => setRandomAdvice(data.slip))
        .catch(err => console.log(err))
    }

    changeAdvice() // Llamo a la funcion
  }, [clicked])

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth)
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth())
  }, [])

  return (
    <div className='advice'>
      <h4>ADVICE #{randomAdvice.id}</h4>
      <h1>"{randomAdvice.advice}"</h1>
      <img src={width > 365 ? './images/pattern-divider-desktop.svg' : './images/pattern-divider-mobile.svg'} />
      <button onClick={e => {
        e.preventDefault()
        changeAdvice()
      }}><img className="dado" src="./images/icon-dice.svg"/></button>
    </div>
  )
}

export default App
