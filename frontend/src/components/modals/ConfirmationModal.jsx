import React from 'react';
import { Button } from '../Button';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

const ConfirmationModal = ({ 
  message, 
  type = 'warning', 
  onConfirm, 
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'destructive'
}) => {
  const icons = {
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
    error: XCircle,
  };

  const colors = {
    warning: 'text-amber-600',
    info: 'text-blue-600',
    success: 'text-green-600',
    error: 'text-red-600',
  };

  const bgColors = {
    warning: 'bg-amber-100',
    info: 'bg-blue-100',
    success: 'bg-green-100',
    error: 'bg-red-100',
  };

  const Icon = icons[type];

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-full ${bgColors[type]}`}>
          <Icon className={`h-6 w-6 ${colors[type]}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
        >
          {cancelText}
        </Button>
        <Button
          type="button"
          variant={confirmVariant}
          onClick={handleConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;