import React, { memo, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { useToggle } from '@/hooks/useToggle';

const Tooltip = memo(({
  children,
  content,
  position = 'top',
  delay = 200,
  className = '',
  disabled = false,
}) => {
  const [isVisible, , showTooltip, hideTooltip] = useToggle(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    const id = setTimeout(() => {
      showTooltip();
    }, delay);
    
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    hideTooltip();
  };

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-background',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-background',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-background',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-background',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && content && createPortal(
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg fade-in pointer-events-none',
            positionClasses[position],
            className
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              arrowClasses[position]
            )}
          />
        </div>,
        document.body
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;