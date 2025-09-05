import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-amber-600 text-white hover:bg-amber-700",
        info: "bg-blue-600 text-white hover:bg-blue-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-7 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  loading = false,
  disabled = false,
  children,
  onClick,
  type = "button",
  ...props 
}, ref) => {
  const handleClick = (e) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant, size, className }),
        (loading || disabled) && "opacity-50 cursor-not-allowed"
      )}
      ref={ref}
      onClick={handleClick}
      disabled={loading || disabled}
      type={type}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
});

Button.displayName = "Button";

// Specialized button components
export const PrimaryButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="default" {...props} />
));
PrimaryButton.displayName = "PrimaryButton";

export const SecondaryButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="outline" {...props} />
));
SecondaryButton.displayName = "SecondaryButton";

export const DangerButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="destructive" {...props} />
));
DangerButton.displayName = "DangerButton";

export const SuccessButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="success" {...props} />
));
SuccessButton.displayName = "SuccessButton";

export const WarningButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="warning" {...props} />
));
WarningButton.displayName = "WarningButton";

export const IconButton = React.forwardRef((props, ref) => (
  <Button ref={ref} variant="ghost" size="icon" {...props} />
));
IconButton.displayName = "IconButton";

export const LoadingButton = React.forwardRef(({ loading, children, ...props }, ref) => (
  <Button ref={ref} loading={loading} {...props}>
    {loading ? 'Loading...' : children}
  </Button>
));
LoadingButton.displayName = "LoadingButton";

export { Button, buttonVariants };