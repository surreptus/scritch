import React from 'react'
import { Form, Field, FieldProps, Formik } from 'formik'
import { Stack, Container, Heading, Input, Button } from '@chakra-ui/react'

interface FormValues {
  code: string;
  name: string;
}

const INITIAL_VALUES: FormValues = {
  code: '',
  name: ''
}

export default function Join () {
  const handleSubmit = ({ code }: FormValues) => {
  }

  return (
    <Container>
      <Stack direction='column' height='100vh' justifyContent='center'>
        <Heading>
          Join Game
        </Heading>

        <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}> 
          <Form>
            <Stack>
              <Field name='name'>
                {({ field }: FieldProps) => <Input required placeholder='Your Name' {...field} />}
              </Field>

              <Field name='code'>
                {({ field }: FieldProps) => <Input required placeholder='Game Code' {...field} />}
              </Field>

              <Button colorScheme='green' type='submit'>
                Submit
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Stack>
    </Container>
  )
}
