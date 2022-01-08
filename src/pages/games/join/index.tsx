import React from 'react'
import { Form, Field, FieldProps, Formik } from 'formik'
import { Stack, Container, Heading, Input, Button } from '@chakra-ui/react'
import * as data from '../../../data/api'
import {useHistory, useLocation} from 'react-router-dom'
import {useJoin} from 'contexts/application'

interface FormValues {
  code: string;
  name: string;
}

export default function Join () {
  const {search} = useLocation()
  const params = new URLSearchParams(search)
  const code = params.get('code') || ''

  const history = useHistory()
  const onJoin = useJoin()
  const handleSubmit = async ({ name }: FormValues) => {
    if (!code) {
      console.error("missing code")
      return
    }
    const {playerId} = await data.joinGame(code, name)
    console.log(playerId)
    onJoin(playerId)

    history.push(`${code}/lobby`)
  }

  return (
    <Container>
      <Stack direction='column' height='100vh' justifyContent='center'>
        <Heading>
          Join Game
        </Heading>

        <Formik initialValues={{name: '', code: code}} onSubmit={handleSubmit}>
          <Form>
            <Stack>
              <Field name='name'>
                {({ field }: FieldProps) => <Input required placeholder='Your Name' {...field} />}
              </Field>

              <Field name='code'>
                {({ field }: FieldProps) => <Input required placeholder='Game Code' {...field} />}
              </Field>

              <Button colorScheme='green' type='submit'>
                Join
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
    </Container>
  )
}
