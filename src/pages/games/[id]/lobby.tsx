import React from 'react'
import {
  Container,
  Input,
  Text,
  List, 
  ListItem,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  Button,
  InputRightElement
}  from '@chakra-ui/react'

export default function Lobby() {
  const canShare = typeof navigator.share !== 'undefined'

  const players = [
    {
      name: 'tony',
      id: 1
    },
    {
      name: 'john',
      id: 2
    },
  ]

  const handleShare = () => {
    navigator.share({
      title: 'Join my Scritch game',
      url: window.location.toString()
    })
  }

  return (
    <Container>
      <FormControl> 
        <FormLabel> 
          Game URL:
        </FormLabel>
        <InputGroup>
          <Input
            value={window.location.toString()}
            disabled
            pr="4.5rem"
          />

          {canShare && (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShare}>
                Share
              </Button>
            </InputRightElement>
          )}
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
    </Container>
  )
}
