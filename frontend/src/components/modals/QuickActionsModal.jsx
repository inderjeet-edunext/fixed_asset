import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { 
  Plus, 
  Upload, 
  Download, 
  FileText, 
  Wrench, 
  Search,
  BarChart3,
  Settings,
  Users,
  Package
} from 'lucide-react';
import { openModal, closeModal } from '../../redux/slices/uiSlice';

const QuickActionsModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAction = (action) => {
    switch (action) {
      case 'add-asset':
        onClose();
        dispatch(openModal({
          modalName: 'assetForm',
          config: { mode: 'create', data: null }
        }));
        break;
      
      case 'bulk-import':
        onClose();
        dispatch(openModal({
          modalName: 'bulkImport',
          config: {}
        }));
        break;
      
      case 'export-assets':
        // Handle export logic
        onClose();
        break;
      
      case 'generate-report':
        onClose();
        navigate('/reports');
        break;
      
      case 'schedule-maintenance':
        onClose();
        navigate('/maintenance-management');
        break;
      
      case 'asset-search':
        onClose();
        navigate('/asset-management/asset-master');
        break;
      
      case 'manage-users':
        onClose();
        navigate('/users');
        break;
      
      case 'settings':
        onClose();
        navigate('/configuration');
        break;
      
      default:
        onClose();
    }
  };

  const quickActions = [
    {
      id: 'add-asset',
      title: 'Add New Asset',
      description: 'Create a new asset record',
      icon: Plus,
      color: 'bg-blue-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'bulk-import',
      title: 'Bulk Import',
      description: 'Import multiple assets from CSV/Excel',
      icon: Upload,
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50'
    },
    {
      id: 'export-assets',
      title: 'Export Assets',
      description: 'Download asset data as CSV/Excel',
      icon: Download,
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create asset reports and analytics',
      icon: BarChart3,
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'schedule-maintenance',
      title: 'Schedule Maintenance',
      description: 'Create maintenance tickets',
      icon: Wrench,
      color: 'bg-red-500',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50'
    },
    {
      id: 'asset-search',
      title: 'Search Assets',
      description: 'Find and filter assets',
      icon: Search,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'manage-users',
      title: 'Manage Users',
      description: 'User management and roles',
      icon: Users,
      color: 'bg-teal-500',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'System configuration',
      icon: Settings,
      color: 'bg-gray-500',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <div
              key={action.id}
              onClick={() => handleAction(action.id)}
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-200 
                hover:shadow-md border border-gray-200 hover:border-gray-300
                ${action.bgColor}
              `}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAction(action.id);
                }
              }}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${action.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                  <Icon className={`h-5 w-5 ${action.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${action.textColor}`}>
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsModal;