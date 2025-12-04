import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

import { useQuizQuestions, useSubmitQuiz } from '../hooks';

// Anti-copy styles constant - defined outside to prevent recreation
const ANTI_COPY_STYLES = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  WebkitTouchCallout: 'none',
};

// Memoized question option component
const QuestionOption = memo(({ option, index, isSelected, questionId, onSelect }) => {
  const handleChange = useCallback(() => {
    onSelect(index);
  }, [onSelect, index]);

  const optionClass = useMemo(
    () =>
      `flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-900/20' : 'border-zinc-700 hover:bg-zinc-800'
      }`,
    [isSelected]
  );

  return (
    <label className={optionClass}>
      <input
        type="radio"
        name={`q${questionId}`}
        value={index}
        checked={isSelected}
        onChange={handleChange}
        className="mr-4 accent-blue-600 w-5 h-5"
      />
      <span>{option}</span>
    </label>
  );
});

QuestionOption.displayName = 'QuestionOption';

// Memoized result item component
const ResultItem = memo(({ result, question, index }) => {
  const borderClass = result.isCorrect
    ? 'border-green-500/30 bg-green-900/10'
    : 'border-red-500/30 bg-red-900/10';

  return (
    <div className={`p-4 rounded-lg border ${borderClass}`}>
      <div className="flex items-start gap-3">
        {result.isCorrect ? (
          <CheckCircle size={20} className="text-green-500 mt-0.5 shrink-0" />
        ) : (
          <XCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
        )}
        <div>
          <p className="font-medium mb-2">
            Q{index + 1}: {question?.question}
          </p>
          <p className="text-sm text-zinc-400">
            Your answer:{' '}
            <span className={result.isCorrect ? 'text-green-400' : 'text-red-400'}>
              {question?.options[result.userAnswer]}
            </span>
          </p>
          {!result.isCorrect && (
            <p className="text-sm text-zinc-400">
              Correct answer:{' '}
              <span className="text-green-400">{question?.options[result.correctAnswer]}</span>
            </p>
          )}
          {result.explanation && (
            <p className="text-sm text-zinc-500 mt-2 italic">{result.explanation}</p>
          )}
        </div>
      </div>
    </div>
  );
});

ResultItem.displayName = 'ResultItem';

// Loading component
const QuizLoading = memo(() => (
  <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
));

QuizLoading.displayName = 'QuizLoading';

// Error component
const QuizError = memo(({ error }) => (
  <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
    <AlertCircle size={48} className="text-red-400" />
    <p className="text-red-400">{error || 'Failed to load quiz'}</p>
  </div>
));

QuizError.displayName = 'QuizError';

const QuizCard = ({
  courseSlug,
  quizId,
  courseId,
  moduleId,
  onComplete,
  isSubmitted: initialIsSubmitted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(initialIsSubmitted || false);
  const [quizResults, setQuizResults] = useState(null);

  // Time tracking for XP calculation (internal - not shown to user)
  const [answerTimes, setAnswerTimes] = useState({});
  const questionStartTimeRef = useRef(null);

  const { quiz, loading: loadingQuiz, error: quizError } = useQuizQuestions(courseSlug, quizId);
  const { submit, loading: submitting, error: submitError } = useSubmitQuiz();

  // Memoized anti-copy handlers
  const preventCopy = useCallback(e => {
    e.preventDefault();
    return false;
  }, []);

  const preventKeyboardCopy = useCallback(e => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'x' || e.key === 'X')
    ) {
      e.preventDefault();
      return false;
    }
  }, []);

  const handleContextMenu = useCallback(e => e.preventDefault(), []);
  const handleDragStart = useCallback(e => e.preventDefault(), []);

  // Set up anti-copy event listeners
  useEffect(() => {
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('keydown', preventKeyboardCopy);

    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('keydown', preventKeyboardCopy);
    };
  }, [preventCopy, preventKeyboardCopy]);

  // Reset state when quiz changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setAnswerTimes({});
    questionStartTimeRef.current = null;

    if (initialIsSubmitted) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
    setQuizResults(null);
  }, [quizId, initialIsSubmitted]);

  // Start timer when question changes or quiz loads
  useEffect(() => {
    if (quiz && !showResults && !initialIsSubmitted) {
      questionStartTimeRef.current = Date.now();
    }
  }, [currentQuestionIndex, quiz, showResults, initialIsSubmitted]);

  // When quiz data loads and it's submitted, build results from the quiz data
  useEffect(() => {
    if (quiz && quiz.isSubmitted && quiz.submissionDetails) {
      const results = quiz.questions.map(q => ({
        questionId: q.id,
        correctAnswer: q.correctAnswer,
        isCorrect: null,
      }));

      setQuizResults({
        score: quiz.submissionDetails.quizScore,
        totalQuestions: quiz.submissionDetails.totalQuestions,
        percentage: quiz.submissionDetails.percentage,
        results: results,
        isViewOnly: true,
      });
      setShowResults(true);
    }
  }, [quiz]);

  // Memoized option select handler
  const handleOptionSelect = useCallback(index => {
    setSelectedOption(index);
  }, []);

  // Memoized computed values
  const currentQuestion = useMemo(
    () => quiz?.questions?.[currentQuestionIndex],
    [quiz?.questions, currentQuestionIndex]
  );

  const totalQuestions = useMemo(() => quiz?.questions?.length || 0, [quiz?.questions?.length]);
  const attempted = currentQuestionIndex + 1;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const progressWidth = useMemo(
    () => `${(attempted / totalQuestions) * 100}%`,
    [attempted, totalQuestions]
  );

  const handleNext = useCallback(async () => {
    if (selectedOption === null) return;

    const timeTaken = questionStartTimeRef.current
      ? Math.floor((Date.now() - questionStartTimeRef.current) / 1000)
      : 60;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    const newAnswerTimes = { ...answerTimes, [currentQuestion.id]: timeTaken };
    setAnswers(newAnswers);
    setAnswerTimes(newAnswerTimes);

    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      questionStartTimeRef.current = Date.now();
    } else {
      try {
        const response = await submit({
          courseId,
          moduleId,
          quizId,
          answers: newAnswers,
          answerTimes: newAnswerTimes,
        });

        if (response.success) {
          setQuizResults(response.data);
          setShowResults(true);
          onComplete?.();
        }
      } catch (err) {
        console.error('Quiz submission failed:', err);
      }
    }
  }, [
    selectedOption,
    answers,
    answerTimes,
    currentQuestion?.id,
    isLastQuestion,
    submit,
    courseId,
    moduleId,
    quizId,
    onComplete,
  ]);

  // Memoized button disabled state
  const isButtonDisabled = selectedOption === null || submitting;

  const buttonClass = useMemo(
    () =>
      `px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-colors flex items-center gap-2 ${
        !isButtonDisabled ? 'bg-green-600 hover:bg-green-700' : 'bg-zinc-700 cursor-not-allowed'
      }`,
    [isButtonDisabled]
  );

  if (loadingQuiz) {
    return <QuizLoading />;
  }

  if (quizError || !quiz) {
    return <QuizError error={quizError} />;
  }

  // Results Screen
  if (showResults && quizResults) {
    const resultIcon =
      quizResults.percentage >= 70 ? (
        <CheckCircle size={40} className="text-green-500" />
      ) : (
        <AlertCircle size={40} className="text-yellow-500" />
      );

    const resultBgClass =
      quizResults.percentage >= 70 ? 'bg-green-900/30' : 'bg-yellow-900/30';

    return (
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${resultBgClass}`}>
            {resultIcon}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            {quizResults.isViewOnly ? 'Quiz Results' : 'Quiz Complete!'}
          </h2>
          <p className="text-zinc-400">
            You scored{' '}
            <span className="text-white font-bold">
              {quizResults.score}/{quizResults.totalQuestions}
            </span>{' '}
            ({quizResults.percentage}%)
          </p>
        </div>

        {/* Question Results - Only show if we have detailed results (not view-only) */}
        {!quizResults.isViewOnly && quizResults.results && (
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-lg border-b border-zinc-800 pb-2">Review Answers</h3>
            {quizResults.results.map((result, index) => {
              const question = quiz.questions.find(q => q.id === result.questionId);
              return (
                <ResultItem key={result.questionId} result={result} question={question} index={index} />
              );
            })}
          </div>
        )}

        {/* View-only mode - show questions with correct answers */}
        {quizResults.isViewOnly && quiz && (
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-lg border-b border-zinc-800 pb-2">Correct Answers</h3>
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="p-4 rounded-lg border border-zinc-700 bg-zinc-800/50">
                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium mb-2">
                      Q{index + 1}: {question.question}
                    </p>
                    <p className="text-sm text-zinc-400">
                      Correct answer:{' '}
                      <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
      style={ANTI_COPY_STYLES}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold">{quiz.title}</h2>
          {quiz.moduleTitle && <p className="text-sm text-zinc-500 mt-1">{quiz.moduleTitle}</p>}
        </div>
        <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded text-sm font-bold">
          Question {attempted} of {totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-800 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Current Question */}
      <div className="space-y-6 mb-8">
        <div>
          <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => (
              <QuestionOption
                key={i}
                option={opt}
                index={i}
                isSelected={selectedOption === i}
                questionId={currentQuestion.id}
                onSelect={handleOptionSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {submitError && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {submitError}
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={handleNext} disabled={isButtonDisabled} className={buttonClass}>
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLastQuestion ? (submitting ? 'Submitting...' : 'Submit Quiz') : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default memo(QuizCard);
