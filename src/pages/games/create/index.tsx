import React from 'react'
import { Form, Field, FieldProps, Formik } from 'formik'
import { Stack, Text, Container, Heading, Input, Button } from '@chakra-ui/react'
import * as data from '../../../data'

interface FormValues {
  name: string;
}

const INITIAL_VALUES: FormValues = {
  name: ''
}

export default function Create () {
  const handleSubmit = ({name}: {name: string}) => { data.createGame(name) }

  return (
    <Container>
      <Stack direction='column' height='100vh' justifyContent='center'>
        <Heading>
          Create Game
        </Heading>

        <Text>
          Enter your name and we'll create a new game room for you to invite
          your friends.
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
