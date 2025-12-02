import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { FieldLabel } from '@/common/components/ui/field';

export const CourseQuestionItem = ({
  question,
  questionIndex,
  moduleId,
  quizId,
  canDelete,
  onDelete,
  onUpdateQuestion,
  onUpdateOption,
  onAddOption,
}) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">Question {questionIndex + 1}</span>
        {canDelete && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Question Text */}
      <Input
        value={question.questionText}
        onChange={e => onUpdateQuestion('questionText', e.target.value)}
        placeholder="What is a variable?"
        className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500"
      />

      {/* Options */}
      <div>
        <FieldLabel className="text-zinc-300 font-medium text-sm mb-2">
          Options (select correct answer)
        </FieldLabel>
        <div className="space-y-2">
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center gap-3">
              <input
                type="radio"
                name={`quiz-${moduleId}-${quizId}-${questionIndex}`}
                checked={question.correctAnswer === optionIndex}
                onChange={() => onUpdateQuestion('correctAnswer', optionIndex)}
                className="w-4 h-4 text-blue-600 bg-zinc-900 border-zinc-700"
              />
              <Input
                value={option}
                onChange={e => onUpdateOption(optionIndex, e.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
                className="flex-1 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAddOption}
          className="mt-2 text-blue-400 hover:text-white hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>
    </div>
  );
};
