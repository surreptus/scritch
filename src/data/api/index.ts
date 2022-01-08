const ROOT_URL = 'http://localhost:5001/scritch-4e385/us-central1/api'

type CreateGameResp = {gameId: string, playerId: string}
export const createGame = async (playerName: string): Promise<CreateGameResp> => {
  const res = await fetch(`${ROOT_URL}/games`,
    {
      method: 'POST',
      body: JSON.stringify({playerName}),
      headers: {'Content-Type': 'application/json'}
    }
  )
  const json = await res.json()
  console.log(json)
  return {gameId: json.gameId, playerId: json.player};
}

type JoinGameResp = {playerId: string}
export const joinGame = async (gameId: string, playerName: string): Promise<JoinGameResp> => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/join`,
    {
      method: 'POST',
      body: JSON.stringify({playerName}),
      headers: {'Content-Type': 'application/json'}
    }
  )
  const response = await res.json()
  console.log(response)
  return response
}

export const startGame = async (gameId: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/start`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
  )
  const response = await res.json()
  console.log(response)
}

export const bid = async (gameId: string, roundId: string, playerId: string, bid: number) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/${roundId}/bid`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({playerId, bid})
    }
  )
  const response = await res.json()
  console.log(response)
}

export const startTrick = async (gameId: string, roundId: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/${roundId}/tricks/create`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
  )
  const response = await res.json()
  console.log(response)
}

export const play = async (gameId: string, roundId: string, trickId: string, playerId: string, card: number) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/${roundId}/tricks/${trickId}/play`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({playerId, card})
    }
  )
  const response = await res.json()
  console.log(response)
}

export const scoreTrick = async (gameId: string, roundId: string, trickId: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/${roundId}/tricks/${trickId}/score`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
  )
  const response = await res.json()
  console.log(response)
}

export const scoreRound = async (gameId: string, roundId: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/${roundId}/score`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
  )
  const response = await res.json()
  console.log(response)
}

export const startNextRound = async (gameId: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/create`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
  )
  const response = await res.json()
  console.log(response)
}
