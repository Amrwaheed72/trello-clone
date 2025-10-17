import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('./ui/card').then((mod) => mod.Card));
const CardContent = dynamic(() =>
  import('./ui/card').then((mod) => mod.CardContent),
);
interface ReusableCardProps {
  icon: ReactNode;
  cardLabel: string;
  content: string | number;
  contentClasses: string;
}

const ReusableCardComponent = ({
  icon,
  cardLabel,
  content,
  contentClasses,
}: ReusableCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600 sm:text-sm dark:text-gray-300">
              {cardLabel}
            </p>
            <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-50">
              {content}
            </p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${contentClasses} sm:h-12 sm:w-12`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReusableCardComponent;
