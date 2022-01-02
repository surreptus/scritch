const ROOT_URL = 'http://localhost:5001/scritch-4e385/us-central1/api'

export const createGame = async (playerName: string) => {
  const res = await fetch(`${ROOT_URL}/games`,
    {
      method: 'POST',
      body: JSON.stringify({playerName}),
      headers: {'Content-Type': 'application/json'}
    }
  )
  const json = await res.json()
  console.log(json)
  return json.gameId;
}

export const joinGame = async (gameId: string, playerName: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/join`,
    {
      method: 'POST',
      body: JSON.stringify({playerName}),
      headers: {'Content-Type': 'application/json'}
    }
  )
  console.log(res.json())
}

export const startGame = async (gameId: string) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/start`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
  )
  console.log(res.json())
}

export const bid = async (gameId: string, roundId: string, playerId: string, bid: number) => {
  const res = await fetch(`${ROOT_URL}/games/${gameId}/rounds/${roundId}/bid`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({playerId, bid})
    }
  )
  console.log(res.json())
}
