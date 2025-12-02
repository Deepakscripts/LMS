import React from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/common/components/ui/field';
import { InputGroupTextarea } from '@/common/components/ui/input-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/common/components/ui/card';

export const CourseCapstoneProjectCard = ({
  project,
  projectIndex,
  canDelete,
  onDelete,
  onUpdate,
  requirementHandlers,
  deliverableHandlers,
}) => {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-zinc-100">
          Capstone Project {projectIndex + 1}
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
            Delete Project
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel className="text-zinc-300 font-medium">Project Title</FieldLabel>
            <Input
              value={project.title}
              onChange={e => onUpdate('title', e.target.value)}
              placeholder="e.g., Build a Personal Portfolio Website"
              className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </Field>

          <Field>
            <FieldLabel className="text-zinc-300 font-medium">Project Description</FieldLabel>
            <InputGroupTextarea
              value={project.description}
              onChange={e => onUpdate('description', e.target.value)}
              placeholder="What students will create in this project..."
              rows={4}
              className="resize-none bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
            />
          </Field>

          {/* Requirements */}
          <div>
            <FieldLabel className="text-zinc-300 font-medium mb-3">Requirements</FieldLabel>
            <div className="space-y-2">
              {project.requirements.map((req, reqIndex) => (
                <div key={reqIndex} className="flex items-center gap-3">
                  <Input
                    value={req}
                    onChange={e => requirementHandlers.update(reqIndex, e.target.value)}
                    placeholder="e.g., Use React for frontend"
                    className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                  {project.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => requirementHandlers.remove(reqIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={requirementHandlers.add}
              className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Requirement
            </Button>
          </div>

          {/* Deliverables */}
          <div>
            <FieldLabel className="text-zinc-300 font-medium mb-3">Deliverables</FieldLabel>
            <div className="space-y-2">
              {project.deliverables.map((del, delIndex) => (
                <div key={delIndex} className="flex items-center gap-3">
                  <Input
                    value={del}
                    onChange={e => deliverableHandlers.update(delIndex, e.target.value)}
                    placeholder="e.g., Deployed website URL"
                    className="flex-1 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                  />
                  {project.deliverables.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deliverableHandlers.remove(delIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={deliverableHandlers.add}
              className="mt-3 text-blue-400 hover:text-white hover:bg-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Deliverable
            </Button>
          </div>

          {/* Is Locked */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`locked-${project.id}`}
              checked={project.isLocked}
              onChange={e => onUpdate('isLocked', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-zinc-900 border-zinc-700 rounded"
            />
            <label htmlFor={`locked-${project.id}`} className="text-sm text-zinc-300">
              Lock this project (students must complete prerequisites)
            </label>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};
