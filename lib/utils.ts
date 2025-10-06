import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BoardColors = [
  { id: 1, color: 'bg-blue-500' },
  { id: 2, color: 'bg-green-500' },
  { id: 3, color: 'bg-yellow-500' },
  { id: 4, color: 'bg-red-500' },
  { id: 5, color: 'bg-purple-500' },
  { id: 6, color: 'bg-pink-500' },
  { id: 7, color: 'bg-indigo-500' },
  { id: 8, color: 'bg-gray-500' },
  { id: 9, color: 'bg-orange-500' },
  { id: 10, color: 'bg-teal-500' },
  { id: 11, color: 'bg-cyan-500' },
  { id: 12, color: 'bg-emerald-500' },
];

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
