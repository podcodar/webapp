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
import { useI18n } from '@packages/features/i18n-context';

export default function ListQuestions() {
  const [showAnswered, setShowAnswered] = useState(false);
  const { questions, error, loading } = useQuestionView();
  const { upVote, check } = useQuestionActions();
  const { query } = useRouter();
  const { t } = useI18n('ask-us-page');

  const isEditing = Object.keys(query).includes('edit');

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
        {t('checkbox-label')}
      </Checkbox>

      {selectedQuestions.map((question) => (
        <Grid
          gap="1rem"
          key={question.id!}
          gridTemplateColumns={isEditing ? 'auto 3rem' : '1fr'}
        >
          <Box
            flex="1"
            width={!isEditing ? 'calc(100vw - 3rem)' : 'auto'}
            overflowWrap="break-word"
          >
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
                // make API to vote
                onClick={() => upVote(question.id!, question.votes + 1)}
                variant="link"
              >
                +1
              </Button>
            </Text>
          </Box>

          {isEditing && !question.answered && (
            <IconButton
              colorScheme="green"
              aria-label={t('checkbox-label')}
              icon={<CheckIcon />}
              onClick={() => check(question.id!)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
