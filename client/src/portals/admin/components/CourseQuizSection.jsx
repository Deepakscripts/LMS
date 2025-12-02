import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Field, FieldLabel } from '@/common/components/ui/field';
import { CourseQuestionItem } from './CourseQuestionItem';

export const CourseQuizSection = ({
  module,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  addOption,
  updateOption,
}) => {
  return (
    <div className="bg-zinc-950 rounded-lg p-6 space-y-6 border border-zinc-800">
      <h3 className="text-lg font-semibold text-zinc-100">Quizzes</h3>

      {module.quizzes.map((quiz, quizIndex) => (
        <div key={quiz.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-zinc-100">Quiz {quizIndex + 1}</h4>
            {module.quizzes.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => deleteQuiz(module.id, quiz.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-950"
              >
                Delete Quiz
              </Button>
            )}
          </div>

          {/* Quiz Title */}
          <Field>
            <FieldLabel className="text-zinc-300 font-medium">Quiz Title</FieldLabel>
            <Input
              value={quiz.title}
              onChange={e => updateQuiz(module.id, quiz.id, 'title', e.target.value)}
              placeholder="e.g., Module 1 Assessment"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </Field>

          {/* Questions */}
          <div className="space-y-4">
            {quiz.questions.map((question, questionIndex) => (
              <CourseQuestionItem
                key={questionIndex}
                question={question}
                questionIndex={questionIndex}
                moduleId={module.id}
                quizId={quiz.id}
                canDelete={quiz.questions.length > 1}
                onDelete={() => deleteQuestion(module.id, quiz.id, questionIndex)}
                onUpdateQuestion={(field, value) =>
                  updateQuestion(module.id, quiz.id, questionIndex, field, value)
                }
                onUpdateOption={(optionIndex, value) =>
                  updateOption(module.id, quiz.id, questionIndex, optionIndex, value)
                }
                onAddOption={() => addOption(module.id, quiz.id, questionIndex)}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addQuestion(module.id, quiz.id)}
            className="text-blue-400 hover:text-white hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>
      ))}

      <Button
        type="button"
        size="sm"
        onClick={() => addQuiz(module.id)}
        className="text-white bg-blue-500 hover:bg-blue-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Quiz
      </Button>
    </div>
  );
};
