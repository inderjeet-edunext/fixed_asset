import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Select = ({ 
  children, 
  value, 
  onValueChange, 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            isOpen,
            onClick: () => !disabled && setIsOpen(!isOpen),
            disabled
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            value,
            onValueChange: (newValue) => {
              onValueChange(newValue);
              setIsOpen(false);
            },
            onClose: () => setIsOpen(false)
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(({ 
  className, 
  children, 
  isOpen, 
  onClick, 
  disabled,
  ...props 
}, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      !disabled && 'hover:border-slate-400',
      className
    )}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
    <ChevronDown className={cn(
      'h-4 w-4 transition-transform',
      isOpen && 'rotate-180'
    )} />
  </button>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder, value, children }) => {
  if (value && children) {
    const selectedChild = React.Children.toArray(children).find(
      child => child.props?.value === value
    );
    if (selectedChild) {
      return selectedChild.props.children;
    }
  }
  
  return (
    <span className={cn(
      'text-sm',
      !value && 'text-slate-500'
    )}>
      {value || placeholder}
    </span>
  );
};

const SelectContent = ({ 
  className, 
  children, 
  isOpen, 
  value, 
  onValueChange,
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute top-full left-0 z-50 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg',
        'max-h-60 overflow-auto',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, {
            isSelected: child.props.value === value,
            onSelect: () => onValueChange(child.props.value)
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = React.forwardRef(({ 
  className, 
  children, 
  value, 
  isSelected, 
  onSelect,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center px-3 py-2 text-sm cursor-pointer',
      'hover:bg-slate-100 focus:bg-slate-100',
      isSelected && 'bg-blue-50 text-blue-600',
      className
    )}
    onClick={onSelect}
    {...props}
  >
    <span className="flex-1">{children}</span>
    {isSelected && (
      <Check className="h-4 w-4" />
    )}
  </div>
));
SelectItem.displayName = 'SelectItem';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};