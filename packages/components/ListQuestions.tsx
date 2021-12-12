import {
  Spinner,
  Text,
  Alert,
  AlertIcon,
  Box,
  Grid,
  Button,
} from '@chakra-ui/react';

import {
  useQuestionView,
  useQuestionActions,
} from '@packages/features/questions-context';

export default function ListQuestions() {
  const { questions, error, loading } = useQuestionView();
  const { upVote } = useQuestionActions();

  return error ? (
    <Alert status="error">
      <AlertIcon /> {error}
    </Alert>
  ) : loading ? (
    <Spinner size="xl" m="1rem auto" />
  ) : (
    <Grid gap="1rem">
      {questions!.map((question) => (
        <Box key={question.id!}>
          <Text
            textDecoration={question.answered ? 'line-through' : 'none'}
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
      ))}
    </Grid>
  );
}
