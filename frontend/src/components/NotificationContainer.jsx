import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { removeNotification } from '../redux/slices/uiSlice';

const NotificationItem = ({ notification, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
  };

  const Icon = icons[notification.type] || Info;

  useEffect(() => {
    if (notification.autoClose !== false) {
      const timer = setTimeout(() => {
        onClose();
      }, notification.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  return (
    <div className={`
      max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border
      ${colors[notification.type]} animate-in slide-in-from-right
    `}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${iconColors[notification.type]}`} />
          </div>
          <div className="ml-3 w-0 flex-1">
            {notification.title && (
              <p className="text-sm font-medium">
                {notification.title}
              </p>
            )}
            <p className={`text-sm ${notification.title ? 'mt-1' : ''}`}>
              {notification.message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`
                inline-flex rounded-md p-1.5 transition-colors
                ${iconColors[notification.type]} hover:bg-black hover:bg-opacity-10
              `}
              onClick={onClose}
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ui);

  const handleRemoveNotification = (id) => {
    dispatch(removeNotification(id));
  };

  if (notifications.length === 0) {
    return null;
  }

  const notificationContainer = (
    <div
      className="fixed inset-0 flex items-end justify-end px-4 py-6 pointer-events-none sm:p-6 z-50"
      role="region"
      aria-label="Notifications"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => handleRemoveNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );

  return createPortal(notificationContainer, document.body);
};

export default NotificationContainer;