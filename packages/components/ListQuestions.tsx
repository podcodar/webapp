import { useState } from 'react';
import {
  Spinner,
  Text,
  Alert,
  AlertIcon,
  Box,
  Grid,
  Button,
  IconButton,
  Checkbox,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

import {
  useQuestionView,
  useQuestionActions,
} from '@packages/features/questions-context';

export default function ListQuestions() {
  const { questions, error, loading } = useQuestionView();
  const { upVote, check } = useQuestionActions();
  const { query } = useRouter();
  const [showAnswered, setShowAnswered] = useState(false);

  const selectedQuestions = showAnswered
    ? questions ?? []
    : questions?.filter(({ answered }) => !answered) ?? [];

  return error ? (
    <Alert status="error">
      <AlertIcon /> {error}
    </Alert>
  ) : loading ? (
    <Spinner size="xl" m="1rem auto" />
  ) : (
    <Grid gap="1rem">
      <Checkbox
        onChange={() => setShowAnswered((s) => !s)}
        isChecked={showAnswered}
      >
        Show answered questions
      </Checkbox>

      {selectedQuestions.map((question) => (
        <Grid gap="1rem" gridTemplateColumns="auto 3rem" key={question.id!}>
          <Box flex="1">
            <Text
              textDecoration={question.answered ? 'line-through' : 'none'}
              color={question.answered ? 'grey' : 'none'}
              fontSize="1.2rem"
            >
              {question.text}
            </Text>

            <Text fontSize="0.9rem" color="grey">
              {question.votes} votes
              <Button
                disabled={!question.canVote}
                onClick={() => upVote(question.id!)}
                variant="link"
              >
                +1
              </Button>
            </Text>
          </Box>

          {Object.keys(query).includes('edit') && !question.answered && (
            <IconButton
              colorScheme="green"
              aria-label="Mask as answered"
              icon={<CheckIcon />}
              onClick={() => check(question.id!)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
