import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Field, FieldProps, Formik } from 'formik'
import { Container, Heading, Input, Button } from '@chakra-ui/react'

interface FormValues {
  code: string;
}

const INITIAL_VALUES: FormValues = {
  code: ''
}

export default function Join () {
  const history = useHistory()

  const handleSubmit = ({ code }: FormValues) => {
    history.push(`${code}`)
  }

  return (
    <Container>
      <Heading>
        Join Game
      </Heading>

      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}> 
        <Form>
          <Field name='code'>
            {({ field }: FieldProps) => <Input {...field} />}
          </Field>

          <Button type='submit'>
            Submit
          </Button>
        </Form>
      </Formik>
    </Container>
  )
}
