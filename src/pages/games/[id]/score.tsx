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
import { useScores } from 'contexts/game'

export default function Score() {
  const scores = useScores()

  console.log(scores)

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
          {scores.map(([name, score], index) => (
            <Tr>
              <Td>
                {index}
              </Td>

              <Td>
                {name}
              </Td>

              <Td isNumeric>
                {score}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  )
}
