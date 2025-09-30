import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
