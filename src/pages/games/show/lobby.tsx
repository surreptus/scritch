import React, {useEffect} from 'react'
import {
  Container,
  Input,
  Heading,
  Text,
  List,
  ListItem,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  InputGroup,
  Stack,
  InputRightElement,
  useToast,
}  from '@chakra-ui/react'
import {useGame} from 'contexts/game'
import {useParams, useHistory} from 'react-router-dom'
import * as api from 'data/api'
import {useCurrentUserId} from 'contexts/application'

const CAN_SHARE = typeof navigator.share !== 'undefined'

export default function Lobby() {
  const userId = useCurrentUserId()
  console.log(userId)

  const toast = useToast()
  const history = useHistory()

  const {id: gameId} = useParams<{id: string}>()

  const game = useGame()
  const players = game.players

  const hasGameStarted = game.rounds.length > 0
  useEffect(() => {
    if (hasGameStarted) {
      history.push(`/games/${gameId}`)
    }
  }, [hasGameStarted])

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.toString())

    toast({
      title: 'Link Copied!',
      description: 'You can now paste and share with friends'
    })
  }

  const handleShare = () => {
    navigator.share({
      title: 'Join my Scritch game',
      url: window.location.toString()
    })
  }

  const handleStartGame = async () => {
    await api.startGame(gameId)
  }

  const renderAction = () => {
    const action = CAN_SHARE
      ? handleShare
      : handleCopy

      const label = CAN_SHARE
        ? 'Share'
        : 'Copy'
      return (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={action}>
                {label}
              </Button>
            </InputRightElement>
      )
  }

  const joinLink = `${window.location.hostname}/games/join?code=${gameId}`
  const canStartGame = players.length >= 3

  return (
    <Container>
      <Stack height='100vh' pt='12'>
        <Heading>
          Lobby
        </Heading>
        <FormControl>
          <FormLabel>
            Game URL:
          </FormLabel>

          <InputGroup>
            <Input
              value={joinLink}
              disablead
              pr="4.5rem"
            />

            {renderAction()}
          </InputGroup>

          <FormHelperText>
            Copy and share the above URL to allow others to join
          </FormHelperText>
        </FormControl>

        <Text>
          Players
        </Text>

        <List>
          {players.map((player) => (
            <ListItem key={player.id}>
              {player.name}
            </ListItem>
          ))}
        </List>

        <Button onClick={handleStartGame} disabled={!canStartGame}>Start Game</Button>
      </Stack>
    </Container>
  )
}
