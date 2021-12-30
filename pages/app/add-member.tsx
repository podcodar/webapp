import { Heading } from '@chakra-ui/react';

import AddMemberForm from '@packages/components/AddMemberForm';
import Section from '@packages/components/Section';

export default function AddMemberPage() {
  return (
    <Section py="5rem">
      <Heading py="1rem">Add new member</Heading>
      <AddMemberForm />
    </Section>
  );
}
