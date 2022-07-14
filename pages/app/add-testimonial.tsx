import {
  Input,
  Textarea,
  Button,
  Heading,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import Section from '@packages/components/Section';
import { getTestimonialInstance } from '@packages/services/testimonials';
import { useI18n } from '@packages/features/i18n-context';

interface testimonialProps {
  name: string;
  testimonial: string;
  gitUsername: string;
}

export default function AddTestimonialPage() {
  const { t } = useI18n('testimonials');
  const [testimonial, setTestimonial] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [gitUsername, setGitUsername] = useState('');
  const maxInputLength: number = 300;
  const toast = useToast();

  function validateSubmit() {
    if (name.length < 5 || testimonial.length < 20) {
      toast({
        description: 'Por favor preencha os campos',
        status: 'error',
        isClosable: true,
      });
      return false;
    } else return true;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateSubmit()) {
      addTestimonial({
        name,
        testimonial,
        gitUsername,
      });
    }
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
        approved: false,
      });
    } catch (e) {
      toast({
        description: `invalid github user`,
        status: 'error',
        isClosable: true,
      });
      return;
    }

    toast({ description: 'success', status: 'success', isClosable: true });
    setTestimonial('');
    setName('');
    setGitUsername('');
  }

  return (
    <Section py="5rem">
      <Heading>{t('add-testimonial-title')}</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>{t('label.name')}</FormLabel>
          <Input
            type="text"
            maxLength={maxInputLength}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
          />
        </FormControl>
        <FormLabel>{t('label.github')}</FormLabel>
        <Input
          type="text"
          maxLength={maxInputLength}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setGitUsername(e.target.value)
          }
          value={gitUsername}
        />
        <FormControl>
          <FormLabel>{t('label.testimonial')}</FormLabel>
          <Textarea
            maxLength={maxInputLength}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setTestimonial(e.target.value)
            }
            value={testimonial}
          />
        </FormControl>

        <Button mt="1rem" type="submit">
          {t('submit')}
        </Button>
      </form>
    </Section>
  );
}
