import React, { memo } from 'react';
import { cn } from '@/utils/cn';

const Card = memo(({ className, children, ...props }) => (
  <div
    className={cn('card', className)}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

const CardHeader = memo(({ className, children, ...props }) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

const CardTitle = memo(({ className, children, ...props }) => (
  <h3
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

const CardDescription = memo(({ className, children, ...props }) => (
  <p
    className={cn('text-sm text-text-muted', className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

const CardContent = memo(({ className, children, ...props }) => (
  <div className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

const CardFooter = memo(({ className, children, ...props }) => (
  <div
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };