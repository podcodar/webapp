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
import { getTestimonialInstance } from '@packages/services/testimonials';

interface testimonialProps {
  name: string;
  testimonial: string;
  gitUsername: string;
}

export default function AddTestimonialPage() {
  const [testimonial, setTestimonial] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [gitUsername, setGitUsername] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (testimonial.length < 10 || testimonial.length > 300) {
      return;
    }
    addTestimonial({
      name,
      testimonial,
      gitUsername,
    });
  }

  async function addTestimonial({
    name,
    testimonial,
    gitUsername,
  }: testimonialProps) {
    const testimonialsService = getTestimonialInstance();

    const member = await fetch(
      `https://api.github.com/users/${gitUsername}`,
    ).then((r) => r.json());

    try {
      await testimonialsService.add({
        name: name,
        text: testimonial,
        profileUrl: member.html_url,
        avatarUrl: member.avatar_url,
      });
    } catch (e) {
      alert(`invalid input ${e}`);
    }

    setTestimonial('');
    setName('');
    setGitUsername('');
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
        <FormLabel>Github username</FormLabel>
        <Input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGitUsername(e.target.value)
          }
          value={gitUsername}
        />
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
