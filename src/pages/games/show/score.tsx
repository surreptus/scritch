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
  //const scores = []//useScores()

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
          {/*scores.map(([name, score], index) => (
            <Tr>
              <Td>
                {index + 1}
              </Td>

              <Td>
                {name}
              </Td>

              <Td isNumeric>
                {score}
              </Td>
            </Tr>
            ))*/}
        </Tbody>
      </Table>
    </Container>
  )
}
