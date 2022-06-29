import {
  Input,
  Textarea,
  Button,
  Heading,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import Section from '@packages/components/Section';

export default function AddTestimonialPage() {
  const [testimonial, setTestimonial] = useState<string>('');
  const [name, setName] = useState<string>('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Section py="5rem">
      <Heading>Add Testimonial</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Testimonial</FormLabel>
          <Textarea
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setTestimonial(e.target.value)
            }
            value={testimonial}
          />
        </FormControl>
        <Button mt="1rem" type="submit">
          Submit
        </Button>
      </form>
    </Section>
  );
}
