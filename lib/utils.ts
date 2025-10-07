import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const addTaskFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'a Task must have a Title' })
    .max(50, { message: 'Task Title is Too long' }),
  description: z.string().optional(),
  assignee: z.string().optional(),
  due_date: z
    .date()
    .optional()
    .refine(
      (date) => !date || date >= new Date(new Date().setHours(0, 0, 0, 0)),
      {
        message: 'Due date cannot be in the past',
      },
    ),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});
