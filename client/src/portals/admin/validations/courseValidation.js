import * as z from 'zod';

export const courseFormSchema = z.object({
  title: z.string().min(5, 'Course title must be at least 5 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(500, 'Description must be at most 500 characters'),
  stream: z.string().min(1, 'Please select a stream'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  price: z.string().min(1, 'Price is required'),
  discountedPrice: z.string().optional(),
  instructor: z.string().min(1, 'Please select an instructor'),
  totalDuration: z.string().optional(),
  tags: z.string().optional(),
  difficultyIndex: z.string().optional(),
});

export const moduleSchema = z.object({
  title: z.string().min(3, 'Module title required'),
  maxTimelineInDays: z.number().min(1, 'Timeline must be at least 1 day'),
  description: z.string().min(10, 'Module description required'),
  textLinks: z.array(z.string().url('Invalid URL')).optional(),
  videoLinks: z.array(z.string().url('Invalid URL')).optional(),
  tasks: z.array(
    z.object({
      title: z.string().min(3, 'Task title required'),
      description: z.string().min(10, 'Task description required'),
    }),
  ),
  quizzes: z.array(
    z.object({
      title: z.string().min(3, 'Quiz title required'),
      questions: z
        .array(
          z.object({
            questionText: z.string().min(5, 'Question text required'),
            options: z.array(z.string()).min(2, 'At least 2 options required'),
            correctAnswer: z.number().min(0, 'Select correct answer'),
          }),
        )
        .min(1, 'At least 1 question required'),
    }),
  ),
  order: z.number(),
});

export const capstoneProjectSchema = z.object({
  title: z.string().min(5, 'Project title required'),
  description: z.string().min(20, 'Project description required'),
  requirements: z.array(z.string()).optional(),
  deliverables: z.array(z.string()).optional(),
  isLocked: z.boolean().default(false),
});
