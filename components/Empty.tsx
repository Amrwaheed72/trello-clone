'use client';

import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
}

function Empty({
  title = 'No Results Found',
  message = 'Try adjusting your filters or search query to see more results.',
  icon: Icon = Inbox,
  action,
}: EmptyProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 py-12 text-center">
      <Icon className="h-12 w-12 text-gray-400" strokeWidth={1.5} />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="max-w-sm text-gray-500">{message}</p>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export default Empty;
