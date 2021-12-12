import { FormEvent, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Grid } from '@chakra-ui/layout';

import { useQuestionActions } from '@packages/features/questions-context';

export default function AddQuestionForm() {
  const actions = useQuestionActions();
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.addQuestion({
      text,
      votes: 0,
      answered: false,
    });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        gap="1rem"
        gridTemplateColumns={{ base: '1fr', sm: '3fr 1fr', md: '4fr 1fr' }}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a question here"
        />
        <Button type="submit">Send</Button>
      </Grid>
    </form>
  );
}
