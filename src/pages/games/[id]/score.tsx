import React from 'react'
import {
  Heading,
  Container,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td
} from '@chakra-ui/react'

export default function Score() {
  const players = [
    {
      name: 'tony', 
      score: 10,
      id: 1
    },
    {
      name: 'john', 
      score: 210,
      id: 22 
    },
  ]

  return (
    <Container>
      <Heading>
        Scores
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Place</Th>
            <Th>Name</Th>
            <Th isNumeric>Score</Th>
          </Tr>
        </Thead>

        <Tbody>
          {players.map((player, index) => (
            <Tr>
              <Td>
                {index}
              </Td>

              <Td>
                {player.name}
              </Td>

              <Td isNumeric>
                {player.score}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  )
}
