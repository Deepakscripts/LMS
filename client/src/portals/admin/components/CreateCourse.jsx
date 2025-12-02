'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/common/components/ui/button';
import { courseFormSchema } from '@/portals/admin/validations/courseValidation';
import { useModules } from '@//portals/admin/hooks/useModules';
import { useCapstoneProjects } from '@//portals/admin/hooks/useCapstoneProjects';
import { CourseDetailsForm } from './CourseDetailsForm';
import { CourseModuleCard } from './CourseModuleCard';
import { CourseCapstoneProjectCard } from './CourseCapstoneProjectCard';

const CreateCourse = ({ onBack }) => {
  const moduleHooks = useModules();
  const capstoneHooks = useCapstoneProjects();

  const form = useForm({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: '',
      description: '',
      stream: '',
      level: 'Beginner',
      price: '',
      discountedPrice: '',
      instructor: '',
      totalDuration: '',
      tags: '',
      difficultyIndex: '1',
    },
  });

  const onSubmit = values => {
    const courseData = {
      ...values,
      price: parseFloat(values.price),
      discountedPrice: values.discountedPrice ? parseFloat(values.discountedPrice) : undefined,
      tags: values.tags
        ? values.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean)
        : [],
      difficultyIndex: values.difficultyIndex ? parseInt(values.difficultyIndex) : 1,
      modules: moduleHooks.modules.map((module, index) => ({
        title: module.title,
        maxTimelineInDays: module.maxTimelineInDays ? parseInt(module.maxTimelineInDays) : 7,
        description: module.description,
        textLinks: module.textLinks.filter(link => link.trim() !== ''),
        videoLinks: module.videoLinks.filter(link => link.trim() !== ''),
        tasks: module.tasks.map(task => ({
          title: task.title,
          description: task.description,
        })),
        quizzes: module.quizzes.map(quiz => ({
          title: quiz.title,
          questions: quiz.questions.map(q => ({
            questionText: q.questionText,
            options: q.options.filter(opt => opt.trim() !== ''),
            correctAnswer: q.correctAnswer,
          })),
        })),
        order: index,
      })),
      capstoneProjects: capstoneHooks.capstoneProjects.map(project => ({
        title: project.title,
        description: project.description,
        requirements: project.requirements.filter(req => req.trim() !== ''),
        deliverables: project.deliverables.filter(del => del.trim() !== ''),
        isLocked: project.isLocked,
      })),
      isPublished: false,
      enrolledCount: 0,
    };

    console.log('Creating course:', courseData);
    toast('Course created successfully!', {
      description: 'Your course has been added to the platform.',
      position: 'bottom-right',
    });
    onBack();
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-full mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Courses</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Create a New Course</h1>
          <p className="text-zinc-400">
            Fill in the details below to add a new course to the platform.
          </p>
        </div>

        <form id="create-course-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Course Details */}
          <CourseDetailsForm control={form.control} />

          {/* Modules */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">Modules</h2>
            <div className="space-y-6">
              {moduleHooks.modules.map((module, moduleIndex) => (
                <CourseModuleCard
                  key={module.id}
                  module={module}
                  moduleIndex={moduleIndex}
                  canDelete={moduleHooks.modules.length > 1}
                  onDelete={() => moduleHooks.deleteModule(module.id)}
                  onUpdate={(field, value) => moduleHooks.updateModule(module.id, field, value)}
                  linkHandlers={{
                    addTextLink: () => moduleHooks.addTextLink(module.id),
                    updateTextLink: (linkIndex, value) =>
                      moduleHooks.updateTextLink(module.id, linkIndex, value),
                    removeTextLink: linkIndex => moduleHooks.removeTextLink(module.id, linkIndex),
                    addVideoLink: () => moduleHooks.addVideoLink(module.id),
                    updateVideoLink: (linkIndex, value) =>
                      moduleHooks.updateVideoLink(module.id, linkIndex, value),
                    removeVideoLink: linkIndex => moduleHooks.removeVideoLink(module.id, linkIndex),
                  }}
                  quizHandlers={{
                    addQuiz: moduleHooks.addQuiz,
                    deleteQuiz: moduleHooks.deleteQuiz,
                    updateQuiz: moduleHooks.updateQuiz,
                    addQuestion: moduleHooks.addQuestion,
                    deleteQuestion: moduleHooks.deleteQuestion,
                    updateQuestion: moduleHooks.updateQuestion,
                    addOption: moduleHooks.addOption,
                    updateOption: moduleHooks.updateOption,
                  }}
                />
              ))}

              <Button
                type="button"
                onClick={moduleHooks.addModule}
                className="w-full md:w-auto text-white bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>
          </div>

          {/* Capstone Projects */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">Capstone Projects</h2>
            <div className="space-y-6">
              {capstoneHooks.capstoneProjects.map((project, projectIndex) => (
                <CourseCapstoneProjectCard
                  key={project.id}
                  project={project}
                  projectIndex={projectIndex}
                  canDelete={capstoneHooks.capstoneProjects.length > 1}
                  onDelete={() => capstoneHooks.deleteCapstoneProject(project.id)}
                  onUpdate={(field, value) =>
                    capstoneHooks.updateCapstoneProject(project.id, field, value)
                  }
                  requirementHandlers={{
                    add: () => capstoneHooks.addRequirement(project.id),
                    update: (reqIndex, value) =>
                      capstoneHooks.updateRequirement(project.id, reqIndex, value),
                    remove: reqIndex => capstoneHooks.removeRequirement(project.id, reqIndex),
                  }}
                  deliverableHandlers={{
                    add: () => capstoneHooks.addDeliverable(project.id),
                    update: (delIndex, value) =>
                      capstoneHooks.updateDeliverable(project.id, delIndex, value),
                    remove: delIndex => capstoneHooks.removeDeliverable(project.id, delIndex),
                  }}
                />
              ))}

              <Button
                type="button"
                onClick={capstoneHooks.addCapstoneProject}
                className="w-full md:w-auto text-white bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Capstone Project
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <Button
              type="button"
              className="bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              form="create-course-form"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;

