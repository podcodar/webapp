import { Heading } from '@chakra-ui/react';

import AddMemberForm from '@packages/components/AddMemberForm';
import Section from '@packages/components/Section';
import { AddMemberFormProvider } from '@packages/features/add-member-form-context';

export default function AddMemberPage() {
  return (
    <Section py="5rem">
      <Heading py="1rem">Add new member</Heading>

      <AddMemberFormProvider>
        <AddMemberForm />
      </AddMemberFormProvider>
    </Section>
  );
}
