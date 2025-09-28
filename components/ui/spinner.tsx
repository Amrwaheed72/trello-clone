import { cn } from '@/lib/utils';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'dots' | 'pulse' | 'bars' | 'ring';
    className?: string;
}

const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
};

export function Spinner({
    size = 'md',
    variant = 'default',
    className,
}: SpinnerProps) {
    const baseClasses = cn(sizeClasses[size], className);

    if (variant === 'dots') {
        return (
            <div className={cn('flex space-x-1', className)}>
                <div
                    className={cn(
                        'bg-primary animate-bounce rounded-full',
                        size === 'sm'
                            ? 'h-2 w-2'
                            : size === 'md'
                              ? 'h-3 w-3'
                              : size === 'lg'
                                ? 'h-4 w-4'
                                : 'h-5 w-5'
                    )}
                    style={{ animationDelay: '0ms' }}
                />
                <div
                    className={cn(
                        'bg-primary animate-bounce rounded-full',
                        size === 'sm'
                            ? 'h-2 w-2'
                            : size === 'md'
                              ? 'h-3 w-3'
                              : size === 'lg'
                                ? 'h-4 w-4'
                                : 'h-5 w-5'
                    )}
                    style={{ animationDelay: '150ms' }}
                />
                <div
                    className={cn(
                        'bg-primary animate-bounce rounded-full',
                        size === 'sm'
                            ? 'h-2 w-2'
                            : size === 'md'
                              ? 'h-3 w-3'
                              : size === 'lg'
                                ? 'h-4 w-4'
                                : 'h-5 w-5'
                    )}
                    style={{ animationDelay: '300ms' }}
                />
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <div
                className={cn(
                    baseClasses,
                    'bg-primary animate-pulse rounded-full'
                )}
            />
        );
    }

    if (variant === 'bars') {
        return (
            <div className={cn('flex space-x-1', className)}>
                <div
                    className={cn(
                        'bg-primary animate-pulse',
                        size === 'sm'
                            ? 'h-4 w-1'
                            : size === 'md'
                              ? 'h-6 w-1'
                              : size === 'lg'
                                ? 'h-8 w-2'
                                : 'h-12 w-2'
                    )}
                    style={{ animationDelay: '0ms' }}
                />
                <div
                    className={cn(
                        'bg-primary animate-pulse',
                        size === 'sm'
                            ? 'h-4 w-1'
                            : size === 'md'
                              ? 'h-6 w-1'
                              : size === 'lg'
                                ? 'h-8 w-2'
                                : 'h-12 w-2'
                    )}
                    style={{ animationDelay: '150ms' }}
                />
                <div
                    className={cn(
                        'bg-primary animate-pulse',
                        size === 'sm'
                            ? 'h-4 w-1'
                            : size === 'md'
                              ? 'h-6 w-1'
                              : size === 'lg'
                                ? 'h-8 w-2'
                                : 'h-12 w-2'
                    )}
                    style={{ animationDelay: '300ms' }}
                />
                <div
                    className={cn(
                        'bg-primary animate-pulse',
                        size === 'sm'
                            ? 'h-4 w-1'
                            : size === 'md'
                              ? 'h-6 w-1'
                              : size === 'lg'
                                ? 'h-8 w-2'
                                : 'h-12 w-2'
                    )}
                    style={{ animationDelay: '450ms' }}
                />
            </div>
        );
    }

    if (variant === 'ring') {
        return (
            <div
                className={cn(
                    baseClasses,
                    'border-muted border-t-primary animate-spin rounded-full border-2'
                )}
            />
        );
    }

    // Default spinner
    return (
        <svg
            className={cn(baseClasses, 'text-primary animate-spin')}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}
