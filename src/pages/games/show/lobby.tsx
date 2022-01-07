import React from 'react'
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

const CAN_SHARE = typeof navigator.share !== 'undefined'

export default function Lobby() {
  const toast = useToast()

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
              value={window.location.toString()}
              disabled
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
      </Stack>
    </Container>
  )
}
