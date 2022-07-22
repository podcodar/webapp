import {
  Input,
  Textarea,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import Section from '@packages/components/Section';
import { useI18n } from '@packages/features/i18n-context';
import { addTestimonial } from '@packages/services/testimonials';
import useCustomToast from '@packages/hooks/useCustomToast';

interface formState {
  name: { value: string; error: boolean };
  gitUsername: { value: string; error: boolean };
  testimonial: { value: string; error: boolean };
}

export default function AddTestimonialPage() {
  const { errorToast, successToast } = useCustomToast('testimonials');
  const { t } = useI18n('testimonials');
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<formState>({
    name: { value: '', error: false },
    gitUsername: { value: '', error: false },
    testimonial: { value: '', error: false },
  });
  const { name, gitUsername, testimonial } = formState;
  const maxInputLength: number = 300;

  function onChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormState({
      ...formState,
      [event.target.name]: { ...event.target, name: event.target.value },
    });
  }

  function clearForm() {
    setFormState({
      name: { value: '', error: false },
      gitUsername: { value: '', error: false },
      testimonial: { value: '', error: false },
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (checkInvalidInputs()) return errorToast('toast.inputError');

    setIsLoading(true);
    const error = await addTestimonial({
      name: name.value,
      testimonial: testimonial.value,
      gitUsername: gitUsername.value,
    });
    setIsLoading(false);

    if (error === 1) return errorToast('toast.invalidUserError');
    if (error === 2) return errorToast('toast.serverError');

    successToast('toast.success');
    clearForm();
  }

  function checkInvalidInputs() {
    const nameInvalid = name.value.length < 5 || name.value.length > 40;
    const gituserInvalid = gitUsername.value.length < 4;
    const testimonialInvalid =
      testimonial.value.length < 20 || testimonial.value.length > 300;

    setFormState({
      ...formState,
      name: { ...name, error: nameInvalid },
      gitUsername: { ...gitUsername, error: gituserInvalid },
      testimonial: { ...testimonial, error: testimonialInvalid },
    });

    return [nameInvalid, gituserInvalid, testimonialInvalid].includes(true);
  }

  return (
    <Section py="5rem">
      <Heading py="1rem">{t('add-testimonial-title')}</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={name.error} pt="1rem">
          <FormLabel pb="0.5rem">{t('label.name')}</FormLabel>
          <Input
            name="name"
            type="text"
            maxLength={maxInputLength}
            onChange={onChange}
            value={name.value}
          />
          {name.error && (
            <FormErrorMessage>
              {t('label.error', {
                label: t('label.name'),
                min: '5',
                max: '40',
              })}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl pt="2rem" isInvalid={gitUsername.error}>
          <FormLabel pb="0.5rem">{t('label.github')}</FormLabel>
          <Input
            name="gitUsername"
            type="text"
            maxLength={maxInputLength}
            onChange={onChange}
            value={gitUsername.value}
          />
          {gitUsername.error && (
            <FormErrorMessage>
              {t('label.error', {
                label: t('label.github'),
                min: '4',
                max: '20',
              })}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={testimonial.error} py="2rem">
          <FormLabel pb="0.5rem">{t('label.testimonial')}</FormLabel>
          <Textarea
            name="testimonial"
            maxLength={maxInputLength}
            onChange={onChange}
            value={testimonial.value}
          />
          {name.error && (
            <FormErrorMessage>
              {t('label.error', {
                label: t('label.testimonial'),
                min: '20',
                max: '300',
              })}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" isLoading={isLoading}>
          {t('submit')}
        </Button>
      </form>
    </Section>
  );
}
