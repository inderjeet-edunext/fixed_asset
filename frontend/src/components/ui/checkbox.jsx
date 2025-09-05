import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  ...props 
}, ref) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className="sr-only"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(
          'flex h-4 w-4 items-center justify-center rounded border border-slate-300 bg-white transition-colors',
          'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
          checked && 'bg-blue-600 border-blue-600 text-white',
          indeterminate && 'bg-blue-600 border-blue-600 text-white',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer hover:border-slate-400',
          className
        )}
        onClick={() => !disabled && onCheckedChange && onCheckedChange(!checked)}
      >
        {checked && !indeterminate && (
          <Check className="h-3 w-3 text-white" />
        )}
        {indeterminate && (
          <div className="h-0.5 w-2 bg-white rounded" />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };