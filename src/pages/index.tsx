import React from 'react'
import { Form, Field, FieldProps, Formik } from 'formik'
import { Container, Heading, Input, Button } from '@chakra-ui/react'

interface FormValues {
  name: string;
}

const INITIAL_VALUES: FormValues = {
  name: ''
}

export default function Home () {
  const handleSubmit = () => {}

  return (
    <Container>
      <Heading>
        Scritch
      </Heading>

      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}> 
        <Form>
          <Field name='name'>
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
