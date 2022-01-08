import { useContext, createContext, useEffect, useState } from 'react'
import { Card, Round, Player, CurrentRoundInfo, Action, CurrentRound } from 'types'

import * as listeners from '../data/db'
import {identifyCard} from 'shared/util'

interface ContextValue {
  players: Player[],
  rounds: Round[],
}

type Hand = Card[]

const GameContext = createContext<ContextValue>({players: [], rounds: []})

interface Props {
  children: JSX.Element,
  gameId: string,
}

function GameManager ({ children, gameId }: Props) {
  const [players, setPlayers] = useState<Player[]>([])
  const [rounds, setRounds] = useState<Round[]>([])

  useEffect(() => {
    listeners.readPlayerUpdates(gameId, (resp) => setPlayers(resp))
    listeners.readRoundUpdates(gameId, (resp) => setRounds(resp))
  }, [gameId])

  return (
    <GameContext.Provider value={{players, rounds}}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame (): ContextValue {
  const {rounds, players} = useContext(GameContext)

  return {rounds, players}
}

export function useCurrentRound (): CurrentRound {
  const {rounds} = useContext(GameContext)
  const currentRound = rounds[rounds.length - 1]

  const {action: nextAction, playerId: nextPlayerId}= getNextAction(currentRound)

  const currentRoundInfo = {
    idx: rounds.length - 1,
    waitingOnPlayer: nextPlayerId,
    nextAction: nextAction
  }

  return { ...currentRound, ...currentRoundInfo }
}

export function useCurrentHand (playerId: string): Hand {
  const currentRound = useCurrentRound()
  const currentHand = currentRound.hands ? currentRound.hands[playerId] : []

  return currentHand.map((cardIdx) => identifyCard(cardIdx))
}

export function useScores () {
  // const { scores } = useContext(GameContext)

  // return Object.entries(scores).sort(([,first],[,second])  => first >= second ? 1 : 0)
}

function getNextAction (round: Round): ({action: Action, playerId: string}) {
  const tricks = round.tricks || []
  const currentTrick = tricks[tricks.length - 1]
  const players = round.playerOrder

  if (!currentTrick) {
    return {action: 'deal', playerId: players[0]}
  }

  const bids = round.bids ? Object.keys(round.bids) : []
  const moves = currentTrick.moves || []
  // go through moves in trick to see who takes the trick
  // when all tricks are played, check bids vs. tricks to score points
  if (bids.length < round.playerOrder.length) {
    // First check that all players have bid
    return {action: 'bid', playerId: players[bids.length]}
  }
  if (moves.length < round.playerOrder.length) {
    // Next check that all players have played in the current trick
    return {action: 'play', playerId: players[moves.length]}
  }
  if (tricks.length === round.numCards) {
    // Next check whether the current trick has been scored
    return {action: 'deal', playerId: players[1]}
  }
  throw new Error("Could not determine next move")
}

export default GameManager
