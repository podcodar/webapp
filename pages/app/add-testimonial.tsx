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
import { useI18n } from '@packages/features/i18n-context';
import { addTestimonial } from '@packages/services/testimonials';

export default function AddTestimonialPage() {
  const { t } = useI18n('testimonials');
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    gitUsername: '',
    testimonial: '',
  });
  const { name, gitUsername, testimonial } = formState;
  const maxInputLength: number = 300;
  const toast = useToast();

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  }

  function clearForm() {
    setFormState({ name: '', gitUsername: '', testimonial: '' });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isSubmitInvalid = name.length < 5 || testimonial.length < 20;

    if (isSubmitInvalid)
      toast({
        description: t('toast.inputError'),
        status: 'error',
        isClosable: true,
      });
    else {
      setIsLoading(true);
      const error = await addTestimonial({
        name,
        testimonial,
        gitUsername,
      });
      setIsLoading(false);

      if (error) {
        toast({
          description: t('toast.invalidUserError'),
          status: 'error',
          isClosable: true,
        });
      } else {
        toast({
          description: t('toast.success'),
          status: 'success',
          isClosable: true,
        });
        clearForm();
      }
    }
  }

  return (
    <Section py="5rem">
      <Heading py="1rem">{t('add-testimonial-title')}</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>{t('label.name')}</FormLabel>
          <Input
            name="name"
            type="text"
            maxLength={maxInputLength}
            onChange={onChange}
            value={name}
          />
        </FormControl>
        <FormLabel>{t('label.github')}</FormLabel>
        <Input
          name="gitUsername"
          type="text"
          maxLength={maxInputLength}
          onChange={onChange}
          value={gitUsername}
        />
        <FormControl>
          <FormLabel>{t('label.testimonial')}</FormLabel>
          <Textarea
            name="testimonial"
            maxLength={maxInputLength}
            onChange={onChange}
            value={testimonial}
          />
        </FormControl>

        <Button mt="1rem" type="submit" isLoading={isLoading}>
          {t('submit')}
        </Button>
      </form>
    </Section>
  );
}
