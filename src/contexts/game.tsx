import { useContext, createContext } from 'react'
import { Trump } from 'types'

interface ContextValue {
  currentPlayer: string,
  trump: Trump,
  round: number;
  scores: {
    [key: string]: number
  }
}

const DEFAULT_VALUE: ContextValue = {
  currentPlayer: 'none',
  trump: 'none',
  round: 1,
  scores: {
    tony: 10,
    john: 210,
  }
}

const GameContext = createContext(DEFAULT_VALUE)

interface Props {
  children: JSX.Element
}

function GameManager ({ children }: Props) {
  return (
    <GameContext.Provider value={DEFAULT_VALUE}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame () {
  const value = useContext(GameContext)

  return value
}

export function useScores () {
  const { scores } = useContext(GameContext)

  return Object.entries(scores).sort(([,first],[,second])  => first >= second ? 1 : 0)
}

export default GameManager 

