import React, { useState, ChangeEvent} from 'react'
import * as data from '../../../data/api'
import * as listeners from '../../../data/db'
import * as util from '../../../shared/util'

export default function ApiTest () {
  const [playerName, setPlayerName] = useState('')
  const [bid, setBid] = useState<number | undefined>()
  const [players, setPlayers] = useState<listeners.Player[]>([])
  const [gameId, setGameId] = useState('')
  const [rounds, setRounds] = useState<listeners.Round[]>([])

  const currentRound = rounds[rounds.length - 1] || {}
  const hands = currentRound.hands || {}
  const bids = currentRound.bids || {}

  const getPlayerOrder = () => {
    const indexOfStartPlayer = players.findIndex((player) => player.key === currentRound.startPlayer)

    return [...players.slice(indexOfStartPlayer), ...players.slice(0, indexOfStartPlayer)]
  }

  const playerUpdateCallback = (resp: listeners.Player[]) => {
    setPlayers(resp)
  }
  const roundUpdateCallback = (resp: listeners.Round[]) => {
    setRounds(resp)
  }

  const handleCreateGame = async() => {
    if (playerName.trim()) {
      const gameId = await data.createGame(playerName)
      setGameId(gameId)
      listeners.readPlayerUpdates(gameId, playerUpdateCallback)
      listeners.readRoundUpdates(gameId, roundUpdateCallback)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.currentTarget.value)
  }

  const handleSetBid = (e: ChangeEvent<HTMLInputElement>) => {
    const bidInt = parseInt(e.currentTarget.value)
    setBid(bidInt)
  }

  const handleBid = async() => {
    const currentBidsLen = currentRound.bids ? Object.keys(currentRound.bids).length : 0
    if (players.length === currentBidsLen) {
      console.error("All players have bid")
      return
    }
    if (bid === undefined) {
      console.error("Must specify amount to bid")
      return
    }

    const orderedPlayers = getPlayerOrder();

    const biddingPlayer = orderedPlayers[currentBidsLen]
    await data.bid(gameId, currentRound.key, biddingPlayer.key, bid)
  }

  const handleJoinGame = async() => {
    if (playerName.trim()) {
      await data.joinGame(gameId, playerName)
    }
  }

  const handleStartGame = async() => {
    if (Object.keys(players).length > 2) {
      await data.startGame(gameId)
    }
  }

  return (
    <div>
      <div>
        <input type='text' onChange={handleInputChange}/>
      </div>
      <div>
        <button onClick={handleCreateGame}>Create Game</button>
      </div>
      <div>
        <button onClick={handleJoinGame}>Join Game</button>
      </div>
      <div>
        <button onClick={handleStartGame}>Start Game</button>
      </div>

      <div>
        <div><input type='number' onChange={handleSetBid} /></div>
        <div><button onClick={handleBid}>Bid</button></div>
      </div>

      <div>
        <h1>Players</h1>
        <ul>
          {players.map(player => (
            <li key={player.key}>
              <div>ID: {player.key}</div>
              <div>Name: {player.name}</div>
              <div>Points: {player.points}</div>
              <div>
                Cards: {hands[player.key] && hands[player.key].map((card) => {
                  const {suit, value} = util.identifyCard(card)
                  return `${value} of ${suit}s`
                })}
              </div>
              <div>
                Bid: {bids[player.key]}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Rounds</h1>
        <ul>
          {rounds.map(round => (
            <li>
              <div>ID: {round.key}</div>
              <div>NumCards: {round.numCards}</div>
              <div>Trump: {round.trump}</div>
              <div>StartPlayer: {round.startPlayer}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
