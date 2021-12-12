import { Dispatch, SetStateAction, useState } from 'react';
import { increment } from '@firebase/firestore';

import { ChildrenProps, useEffectOnce } from '@packages/utils/react';
import createCtx from '@packages/utils/createCtx';
import { Question } from '@packages/entities/questions';
import { FirestoreDAO } from '@packages/repositories/firestore';
import { getQuestionInstance } from '@packages/services/questions';

const questionService = getQuestionInstance();
export function QuestionsProvider({ children }: ChildrenProps) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffectOnce(() => {
    questionService
      .list()
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  });

  if (questionService == null) return <div>{children}</div>;

  const actions = createActions(
    questionService,
    setQuestions,
    setError,
    setLoading,
  );
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
  questions: FirestoreDAO<Question>,
  setQuestions: Dispatch<SetStateAction<Question[] | null>>,
  setError: Dispatch<SetStateAction<Error | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const addQuestion = (question: Question) => {
    setLoading(true);
    questions
      .add(question)
      .then(questions.list)
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  const upVote = (id: string) => {
    questions
      .update(id, { votes: increment(1) })
      .then(() => {
        localVotes.vote(id);
        return questions.list();
      })
      .then(setQuestions)
      .catch(setError);
  };
  return { addQuestion, upVote };
};

const createView = (
  questions: Question[] | null,
  error: Error | null,
  loading: boolean,
) => ({
  questions: questions
    ?.sort(sortByVotes)
    .map((q) => ({ ...q, canVote: localVotes.canVote(q.id!) })),
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
  canVote: (id: string) => {
    const votes = localStorage.getItem(STORE_VOTES) ?? '';
    return !votes.includes(id);
  },
};
