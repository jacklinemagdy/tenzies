import Die from "./Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import type { JSX } from "react"


export function App() {

  type DieType = {
    value: number,
    isHeld: boolean,
    id: string
  }

  const [dice, setDice] = useState<DieType[]>(() => generateAllNewDice())
  const buttonRef = useRef<HTMLButtonElement | null>(null) 

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)
  
  useEffect(() => {
    if (gameWon) {
      buttonRef.current?.focus()
    }
  },[gameWon])

  function generateAllNewDice(): DieType[] {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  function rollDice(): void {
    if(!gameWon) {
      setDice(oldDice => oldDice.map(die =>
      die.isHeld ? 
        die :
        { ...die, value: Math.ceil(Math.random() * 6) }
    ))
    } else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id: string): void {
    setDice(oldDice => {
      return oldDice.map(die => {
        return die.id === id ?
          { ...die, isHeld: !die.isHeld }
          : die
      })
    })
  }
  
  const diceElements: JSX.Element[] = dice.map(dieOpj =>
    <Die
      key={dieOpj.id}
      value={dieOpj.value}
      isHeld={dieOpj.isHeld}
      hold={() => hold(dieOpj.id)}
    />)
  

  return (
    <main>
      {gameWon && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" ref={buttonRef} onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}



