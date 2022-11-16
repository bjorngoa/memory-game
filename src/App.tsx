import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

type TCell =  {
  row: number,
  col: number
}


function App() {

  const [grid, setGrid] = useState([
    [0, 1, 3, 2],
    [4, 5, 4, 1],
    [2, 3, 0, 5]
  ])
  

  const [revealed, setRevelead] = useState(
    new Array(grid.length)
    .fill("")
    .map(() => new Array(grid[0].length).fill(false))
  )
  
  
  const [previousClick, setPreviousClick] = useState<TCell | undefined>()
  
  const resetGame = () => {
    console.log(revealed)
    setRevelead(new Array(grid.length)
    .fill("")
    .map(() => new Array(grid[0].length).fill(false)))
  }
  const handleCardClicked = (rowIndex: number, colIndex: number) => {
    if (revealed[rowIndex][colIndex]) return
    const numberClicked = grid[rowIndex][colIndex]
    const newRevealedGrid = [...revealed]
    newRevealedGrid[rowIndex][colIndex] = true
    setRevelead(newRevealedGrid)
    
    if (previousClick) {
      const previousClickNumber = grid[previousClick?.row][previousClick?.col]
      if (previousClickNumber !== numberClicked) {
        setTimeout(() => {
          newRevealedGrid[rowIndex][colIndex] = false
          newRevealedGrid[previousClick.row][previousClick.col] = false
          setRevelead([...newRevealedGrid])
        }, 1000)
      } else {
        const hasWon =  revealed.flat().every(isRevelead => isRevelead)
        if (hasWon) {
          setTimeout(() => {
            alert("YOU WON!")
            resetGame()
          });
        }
      }
      setPreviousClick(undefined)
    } else {
      setPreviousClick({
        row: rowIndex,
        col: colIndex
      })
    }
  }

  

  return (
    <div className="App">
      <div className='grid'>
        {grid.map((row, rowIndex) => {
          return <div className='row' key={rowIndex}>
            {row.map((number, colIndex) => {
              return <div
                onClick={() => handleCardClicked(rowIndex, colIndex)} 
                key={colIndex} 
                className={"card " + (revealed[rowIndex][colIndex] ? 'revealed' : "")}
                >
                  {revealed[rowIndex][colIndex] ? number : ""}
                </div>
            })}
          </div>
        })}
      </div>
    </div>
  )
}

export default App
