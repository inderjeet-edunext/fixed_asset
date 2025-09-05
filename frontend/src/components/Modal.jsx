import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { X } from 'lucide-react';
import { closeModal } from '../redux/slices/uiSlice';
import AssetFormModal from './modals/AssetFormModal';
import ConfirmationModal from './modals/ConfirmationModal';
import BulkImportModal from './modals/BulkImportModal';
import QuickActionsModal from './modals/QuickActionsModal';

const ModalWrapper = ({ isOpen, onClose, title, children, size = 'default', className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4',
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className={`
        relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} 
        max-h-[90vh] overflow-hidden flex flex-col ${className}
      `}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const Modal = () => {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  const handleCloseModal = (modalName) => {
    dispatch(closeModal(modalName));
  };

  return (
    <>
      {/* Asset Form Modal */}
      <ModalWrapper
        isOpen={modals.assetForm.isOpen}
        onClose={() => handleCloseModal('assetForm')}
        title={
          modals.assetForm.mode === 'create' ? 'Add New Asset' :
          modals.assetForm.mode === 'edit' ? 'Edit Asset' : 'View Asset'
        }
        size="lg"
      >
        <AssetFormModal
          mode={modals.assetForm.mode}
          data={modals.assetForm.data}
          onClose={() => handleCloseModal('assetForm')}
        />
      </ModalWrapper>

      {/* Confirmation Modal */}
      <ModalWrapper
        isOpen={modals.confirmation.isOpen}
        onClose={() => handleCloseModal('confirmation')}
        title={modals.confirmation.title}
        size="sm"
      >
        <ConfirmationModal
          message={modals.confirmation.message}
          onConfirm={modals.confirmation.onConfirm}
          onCancel={() => handleCloseModal('confirmation')}
        />
      </ModalWrapper>

      {/* Bulk Import Modal */}
      <ModalWrapper
        isOpen={modals.bulkImport.isOpen}
        onClose={() => handleCloseModal('bulkImport')}
        title="Bulk Import Assets"
        size="lg"
      >
        <BulkImportModal
          onClose={() => handleCloseModal('bulkImport')}
        />
      </ModalWrapper>

      {/* Quick Actions Modal */}
      <ModalWrapper
        isOpen={modals.quickActions?.isOpen}
        onClose={() => handleCloseModal('quickActions')}
        title="Quick Actions"
        size="default"
      >
        <QuickActionsModal
          onClose={() => handleCloseModal('quickActions')}
        />
      </ModalWrapper>
    </>
  );
};

export default Modal;
export { ModalWrapper };