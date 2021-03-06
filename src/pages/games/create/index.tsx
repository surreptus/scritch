import React, {useState} from 'react'
import { Form, Field, FieldProps, Formik } from 'formik'
import { Stack, Text, Container, Heading, Input, Button } from '@chakra-ui/react'
import * as data from '../../../data/api'
import {useHistory} from 'react-router-dom'
import {useJoin} from 'contexts/application'

interface FormValues {
  name: string;
}

const INITIAL_VALUES: FormValues = {
  name: ''
}

export default function Create () {
  const history = useHistory()

  const onJoin = useJoin()
  const handleSubmit = async ({name}: {name: string}) => {
    const {gameId, playerId} = await data.createGame(name)

    onJoin(playerId)
    history.push(`${gameId}/lobby`)
  }

  return (
    <Container>
      <Stack direction='column' height='100vh' justifyContent='center'>

        <Heading>
          Create Game
        </Heading>

        <Text>
          Enter your name and we'll create a new game room for you to invite your friends.
        </Text>

        <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}> 
          <Form>
            <Stack>
              <Field name='name'>
                {({ field }: FieldProps) => <Input {...field} />}
              </Field>

              <Button type='submit'>
                Submit
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
    </Container>
  )
}
