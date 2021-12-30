const ROOT_URL = 'http://localhost:5001/scritch-4e385/us-central1/api'

export const createGame = async (playerName: string) => {
  const res = await fetch(`${ROOT_URL}/games`,
    {
      method: 'POST',
      body: JSON.stringify({playerName}),
      headers: {'Content-Type': 'application/json'}
    }
  )
  console.log(res.json())
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
