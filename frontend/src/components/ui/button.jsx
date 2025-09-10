import React, { memo } from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = {
  variant: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  },
  size: {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  },
};

const Button = memo(React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
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

  const isDisabled = loading || disabled;

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'btn',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="spinner w-4 h-4 mr-2" />
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
      )}
      
      {children}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-4 h-4 ml-2" aria-hidden="true" />
      )}
    </button>
  );
}));

Button.displayName = 'Button';

export default Button;