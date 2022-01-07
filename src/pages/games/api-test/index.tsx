import React, { useState, ChangeEvent} from 'react'
import * as data from '../../../data/api'
import * as listeners from '../../../data/db'
import * as util from '../../../shared/util'

type ScorePoints = {[key:string]: number}

export default function ApiTest () {
  const [playerName, setPlayerName] = useState('')
  const [bid, setBid] = useState<number | undefined>()
  const [players, setPlayers] = useState<listeners.Player[]>([])
  const [gameId, setGameId] = useState('')
  const [rounds, setRounds] = useState<listeners.Round[]>([])

  const currentRound = rounds[rounds.length - 1] || {}
  const hands = currentRound.hands || {}
  const bids = currentRound.bids || {}

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

  const handleScoreTrick = async() => {
    const currentTrick = currentRound.tricks[currentRound.tricks.length - 1]
    const currentMovesLen = currentTrick.moves.length
    if (currentMovesLen !== players.length) {
      console.error('The trick has not finished until all players have played')
      return
    }

    return await data.scoreTrick(gameId, currentRound.key, currentTrick.key)
  }

  const handleScoreRound = async() => {
    const finishedTricks = currentRound.tricks.filter((round) => !!round.winner)
    if (finishedTricks.length !== currentRound.numCards) {
      console.error('The round is not finished until each trick has been scored')
      return
    }
    return await data.scoreRound(gameId, currentRound.key)
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

    const biddingPlayer = currentRound.playerOrder[currentBidsLen]
    await data.bid(gameId, currentRound.key, biddingPlayer, bid)
  }

  const handleCreateTrick = async() => {
    await data.startTrick(gameId, currentRound.key)
  }

  const handlePlayCard = async(player: string, card: number) => {
    if (!currentRound.tricks.length) {
      console.error("No tricks, must start trick")
    }

    const currentTrick = currentRound.tricks[currentRound.tricks.length - 1]
    await data.play(gameId, currentRound.key, currentTrick.key, player, card)
  }

  const handleStartNextRound = async() => {
    await data.startNextRound(gameId)
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

  const tricksWithWinner = currentRound.tricks ? currentRound.tricks.filter((trick) => !!trick.winner) : []
  const currentRoundFinished = tricksWithWinner.length === currentRound.numCards

  const userPoints = rounds.reduce((totalPoints: ScorePoints, round) => {
    const totalledRoundPoints: ScorePoints = {}
    const points = round.points || {}
    Object.keys(points).forEach((userId) => {
      const roundPoints = round.points[userId]
      const currentPoints = totalledRoundPoints[userId]
      totalledRoundPoints[userId] = currentPoints
        ? currentPoints + roundPoints
        : roundPoints
    })
    return totalledRoundPoints
  }, {})

  console.log(rounds)

  return (
    <div>
      {
        currentRound.bids && Object.keys(currentRound.bids).length === players.length && (
          <button onClick={handleCreateTrick}>Start Trick</button>
        )
      }
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
              <div>Points: {userPoints && userPoints[player.key]}</div>
              <div>
                Cards: {hands[player.key] && hands[player.key].map((card) => {
                  const {suit, value} = util.identifyCard(card)
                  return (
                    <div>
                      <div>{`${value} of ${suit}s`}</div>
                      <button onClick={() => handlePlayCard(player.key, card)}>PlayCard</button>
                    </div>
                  )
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
              {
                !round.points && currentRoundFinished && (
                  <button onClick={handleScoreRound}>Score Round</button>
                )
              }
              {
                round.points && currentRoundFinished && (
                  <button onClick={handleStartNextRound}>Start Next Round</button>
                )
              }
              <div>ID: {round.key}</div>
              <div>NumCards: {round.numCards}</div>
              <div>Trump: {round.trump}</div>
              <div>PlayerOrder: {round.playerOrder}</div>
              {
                round.tricks && round.tricks.map(trick => (
                  <div>
                    {
                      trick.moves && trick.moves.map(move => {
                        const {suit, value} = util.identifyCard(move.card)
                        return(
                          <div>{`player: ${move.playerId}, card: ${value} of ${suit}s`}</div>
                        )
                      })
                    }
                    {
                      trick.moves && trick.moves.length === players.length && !trick.winner && (
                        <button onClick={handleScoreTrick}>Score Trick</button>
                      )
                    }
                    {
                      trick.winner && <div>winner: {trick.winner}</div>
                    }
                  </div>
                ))
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
