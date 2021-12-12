import { Dispatch, SetStateAction, useState } from 'react';

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
  return { addQuestion };
};

const createView = (
  questions: Question[] | null,
  error: Error | null,
  loading: boolean,
) => ({
  questions,
  error,
  loading,
});
