const game = {
  key: '-Ms7tQc_GRYXp-vzJ_9k',
  players: [
    {
      key: '-Mrj5gi8Scx7xSw59-ui',
      name: 'Player 1',
      points: 0,
    },
    {
      key: '-Mtk5gi8Scx7xSw56_kp',
      name: 'Player 2',
      points: 0,
    }
  ],
  rounds: [
    {
      dealer: player1.key,
      hands: {
        player1.key: [34],
        player2.key: [4],
      },
      bids: {
        player1.key: 0,
        player2.key: 0,
      },
      tricks: [
        {
          trump: 'clubs',
          moves: [
            {player: player1.key, card: 34},
            {player: player2.key, card: 4}
          ],
          winner: player1.key
        }
      ],
      numCards: 1
    },
    {
      hands: {
        player1.key: [22, 18],
        player2.key: [46, 9],
      },
      bids: [
        player1.key: 1,
        player2.key: 2,
      ],
      tricks: [
        {
          startPlayer: player1.key,
          trump: 'clubs',
          moves: [
            {player: player1.key, card: 34},
            {player: player2.key, card: 4}
          ],
        },
        {
          startPlayer: player1.key,
          trump: 'clubs',
          moves: [
            {player: player1.key, card: 34},
            {player: player2.key, card: 4}
          ],
        }
      ],
      numCards: 2
    },
  ]
}
