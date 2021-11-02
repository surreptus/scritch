import React from 'react'
import { Link } from 'react-router-dom'
import { Container,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup
} from '@chakra-ui/react'

export default function Home () {
  return (
    <Container>
      <Stack direction='column' height='100vh' justifyContent='center'>
        <Heading>
          Welcome to Scritch
        </Heading>

        <Text>
          Bet against your friends for how many hands you can win.
        </Text>

        <ButtonGroup>
          <Button as={Link} to='/games/create' colorScheme='green' size='lg'>
            Create Game
          </Button>

          <Button as={Link} to='games/join' size='lg'>
            Join Game
          </Button>
        </ButtonGroup>
      </Stack>
    </Container>
  )
}
