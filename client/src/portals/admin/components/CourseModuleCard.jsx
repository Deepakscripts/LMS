import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/common/components/ui/field';
import { InputGroupTextarea } from '@/common/components/ui/input-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';
import { CourseLinkManager } from './CourseLinkManager';
import { CourseQuizSection } from './CourseQuizSection';

export const CourseModuleCard = ({
  module,
  moduleIndex,
  canDelete,
  onDelete,
  onUpdate,
  linkHandlers,
  quizHandlers,
}) => {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Module {moduleIndex + 1}
        </CardTitle>
        {canDelete && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-400 hover:text-red-300 hover:bg-red-950"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Module
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {/* Module Title and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel className="text-zinc-300 font-medium">Module Title</FieldLabel>
              <Input
                value={module.title}
                onChange={e => onUpdate('title', e.target.value)}
                placeholder="e.g., Variables and Data Types"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
              />
            </Field>

            <Field>
              <FieldLabel className="text-zinc-300 font-medium">Max Timeline (Days)</FieldLabel>
              <Input
                type="number"
                value={module.maxTimelineInDays}
                onChange={e => onUpdate('maxTimelineInDays', e.target.value)}
                placeholder="e.g., 7"
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
              />
            </Field>
          </div>

          {/* Module Description */}
          <Field>
            <FieldLabel className="text-zinc-300 font-medium">Module Description</FieldLabel>
            <InputGroupTextarea
              value={module.description}
              onChange={e => onUpdate('description', e.target.value)}
              placeholder="Describe what students will learn in this module..."
              rows={3}
              className="resize-none bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </Field>

          {/* Text Links */}
          <CourseLinkManager
            label="Text Content Links"
            links={module.textLinks}
            onAdd={linkHandlers.addTextLink}
            onUpdate={linkHandlers.updateTextLink}
            onRemove={linkHandlers.removeTextLink}
            placeholder="https://example.com/reading-material"
          />

          {/* Video Links */}
          <CourseLinkManager
            label="Video Content Links"
            links={module.videoLinks}
            onAdd={linkHandlers.addVideoLink}
            onUpdate={linkHandlers.updateVideoLink}
            onRemove={linkHandlers.removeVideoLink}
            placeholder="https://youtube.com/watch?v=..."
          />

          {/* Quizzes */}
          <CourseQuizSection module={module} {...quizHandlers} />
        </FieldGroup>
      </CardContent>
    </Card>
  );
};
