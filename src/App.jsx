import './App.css'
import React, { useState, useEffect } from 'react'

function App () {
  const [randomAdvice, setRandomAdvice] = useState(false)
  // const [clicked, setClicked] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  const changeAdvice = async () => {
    await fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => setRandomAdvice(data.slip))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    changeAdvice()
  }, [])

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth)
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth())
  }, [])

  return (
    <div className='advice'>
      <h4>ADVICE #{randomAdvice.id}</h4>
      <h1>"{randomAdvice.advice}"</h1>
      <img src={width > 365 ? './images/pattern-divider-desktop.svg' : './public/images/pattern-divider-mobile.svg'} />
      <button onClick={e => {
        e.preventDefault()
        changeAdvice()
      }}><img className="dado" src="./images/icon-dice.svg"/></button>
    </div>
  )
}

export default App
