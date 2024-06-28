import { type Dispatch, type SetStateAction, useState } from 'react';

import { type ChildrenProps, useEffectOnce } from '@packages/utils/react';
import createCtx from '@packages/utils/createCtx';
import { questionsApi } from '@packages/hooks/api';

import type { Question } from '@packages/entities/questions';

export function QuestionsProvider({ children }: ChildrenProps) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffectOnce(() => {
    questionsApi
      .list()
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  });

  const actions = createActions(setQuestions, setError, setLoading);
  const view = createView(questions, error, loading);

  return (
    <QuestionViewProvider value={view}>
      <QuestionActionsProvider value={actions}>
        {children}
      </QuestionActionsProvider>
    </QuestionViewProvider>
  );
}

export const [useQuestionView, QuestionViewProvider] =
  createCtx<ReturnType<typeof createView>>('questions-view');
export const [useQuestionActions, QuestionActionsProvider] =
  createCtx<ReturnType<typeof createActions>>('questions-actions');

const createActions = (
  setQuestions: Dispatch<SetStateAction<Question[] | null>>,
  setError: Dispatch<SetStateAction<Error | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const addQuestion = (question: Question) => {
    setLoading(true);
    questionsApi
      .create(question)
      .then(questionsApi.list)
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  const upVote = (id: string, votes: number) => {
    questionsApi
      .update({ id, votes })
      .then(() => {
        localVotes.vote(id);
        return questionsApi.list();
      })
      .then(setQuestions)
      .catch(setError);
  };
  const check = (id: string) => {
    questionsApi
      .update({ id, answered: true })
      .then(questionsApi.list)
      .then(setQuestions)
      .catch(setError);
  };

  return { addQuestion, upVote, check };
};

const createView = (
  questions: Question[] | null,
  error: Error | null,
  loading: boolean,
) => ({
  questions: questions
    ?.sort(sortByVotes)
    .map((q) => ({ ...q, canVote: localVotes.canVote(q.id) })),
  error,
  loading,
});

function sortByVotes(q1: Question, q2: Question) {
  return q2.votes - q1.votes;
}

const STORE_VOTES = 'podcodar:ama:vote-ids';
const localVotes = {
  vote: (id: string) => {
    const votes = JSON.parse(localStorage.getItem(STORE_VOTES) ?? '[]');
    localStorage.setItem(STORE_VOTES, JSON.stringify([...votes, id]));
  },
  canVote: (id?: string) => {
    if (!id) return false;
    const votes = localStorage.getItem(STORE_VOTES) ?? '';
    return !votes.includes(id);
  },
};
