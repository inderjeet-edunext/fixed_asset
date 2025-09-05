import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../Button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Upload,
  Calendar,
  DollarSign,
  Package,
  MapPin,
  User,
  Building,
  Hash
} from 'lucide-react';
import { createAsset, updateAsset } from '../../redux/slices/assetSlice';
import { addNotification } from '../../redux/slices/uiSlice';

const AssetFormModal = ({ mode = 'create', data = null, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetTag: '',
    name: '',
    category: '',
    location: '',
    assignedTo: '',
    purchaseDate: '',
    purchaseTime: '',
    cost: '',
    depreciationValue: '',
    status: 'Active',
    description: '',
    serialNumber: '',
    manufacturer: '',
    model: '',
    warrantyExpiry: '',
    supplier: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData({
        ...formData,
        ...data,
        purchaseDate: data.purchaseDate || '',
        cost: data.cost?.replace('₹', '').replace(',', '') || '',
        depreciationValue: data.depreciationValue?.replace('₹', '').replace(',', '') || '',
      });
    }
  }, [mode, data]);

  const categories = [
    'Office Equipment',
    'Furniture',
    'IT Equipment',
    'Machinery',
    'Vehicles',
    'Building',
    'Others'
  ];

  const locations = [
    'HQ - IT Dept',
    'Office 2',
    'Admin Room',
    'Meeting Room 1',
    'Meeting Room 2',
    'Warehouse',
    'Factory Floor'
  ];

  const statusOptions = [
    'Active',
    'Under Repair',
    'Disposed',
    'Lost',
    'Available',
    'Under Maintenance'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.assetTag.trim()) {
      newErrors.assetTag = 'Asset tag is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Asset name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    }
    if (!formData.cost) {
      newErrors.cost = 'Cost is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        cost: `₹${parseInt(formData.cost).toLocaleString('en-IN')}`,
        depreciationValue: formData.depreciationValue ? 
          `₹${parseInt(formData.depreciationValue).toLocaleString('en-IN')}` : '',
        purchaseTime: formData.purchaseTime || '12:00 PM',
      };

      if (mode === 'create') {
        await dispatch(createAsset(submitData)).unwrap();
        dispatch(addNotification({
          type: 'success',
          title: 'Asset Created',
          message: `Asset ${formData.name} has been created successfully.`
        }));
      } else {
        await dispatch(updateAsset({ id: data.id, data: submitData })).unwrap();
        dispatch(addNotification({
          type: 'success',
          title: 'Asset Updated',
          message: `Asset ${formData.name} has been updated successfully.`
        }));
      }

      onClose();
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        title: 'Error',
        message: error.message || 'An error occurred while saving the asset.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const isReadOnly = mode === 'view';

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Tag */}
        <div className="space-y-2">
          <Label htmlFor="assetTag" className="flex items-center space-x-2">
            <Hash className="h-4 w-4" />
            <span>Asset Tag *</span>
          </Label>
          <Input
            id="assetTag"
            value={formData.assetTag}
            onChange={(e) => handleInputChange('assetTag', e.target.value)}
            placeholder="e.g., L-L001A"
            disabled={isReadOnly}
            className={errors.assetTag ? 'border-red-500' : ''}
          />
          {errors.assetTag && (
            <p className="text-sm text-red-500">{errors.assetTag}</p>
          )}
        </div>

        {/* Asset Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Asset Name *</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., Dell Laptop"
            disabled={isReadOnly}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange('category', value)}
            disabled={isReadOnly}
          >
            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Location *</span>
          </Label>
          <Select
            value={formData.location}
            onValueChange={(value) => handleInputChange('location', value)}
            disabled={isReadOnly}
          >
            <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        {/* Assigned To */}
        <div className="space-y-2">
          <Label htmlFor="assignedTo" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Assigned To</span>
          </Label>
          <Input
            id="assignedTo"
            value={formData.assignedTo}
            onChange={(e) => handleInputChange('assignedTo', e.target.value)}
            placeholder="e.g., John Doe"
            disabled={isReadOnly}
          />
        </div>

        {/* Purchase Date */}
        <div className="space-y-2">
          <Label htmlFor="purchaseDate" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Purchase Date *</span>
          </Label>
          <Input
            id="purchaseDate"
            type="date"
            value={formData.purchaseDate}
            onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
            disabled={isReadOnly}
            className={errors.purchaseDate ? 'border-red-500' : ''}
          />
          {errors.purchaseDate && (
            <p className="text-sm text-red-500">{errors.purchaseDate}</p>
          )}
        </div>

        {/* Cost */}
        <div className="space-y-2">
          <Label htmlFor="cost" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Cost *</span>
          </Label>
          <Input
            id="cost"
            type="number"
            value={formData.cost}
            onChange={(e) => handleInputChange('cost', e.target.value)}
            placeholder="Enter cost without currency symbol"
            disabled={isReadOnly}
            className={errors.cost ? 'border-red-500' : ''}
          />
          {errors.cost && (
            <p className="text-sm text-red-500">{errors.cost}</p>
          )}
        </div>

        {/* Depreciation Value */}
        <div className="space-y-2">
          <Label htmlFor="depreciationValue">Depreciation Value</Label>
          <Input
            id="depreciationValue"
            type="number"
            value={formData.depreciationValue}
            onChange={(e) => handleInputChange('depreciationValue', e.target.value)}
            placeholder="Enter depreciation value"
            disabled={isReadOnly}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleInputChange('status', value)}
            disabled={isReadOnly}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{status}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Manufacturer */}
        <div className="space-y-2">
          <Label htmlFor="manufacturer" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Manufacturer</span>
          </Label>
          <Input
            id="manufacturer"
            value={formData.manufacturer}
            onChange={(e) => handleInputChange('manufacturer', e.target.value)}
            placeholder="e.g., Dell"
            disabled={isReadOnly}
          />
        </div>

        {/* Model */}
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            placeholder="e.g., XPS 15"
            disabled={isReadOnly}
          />
        </div>

        {/* Serial Number */}
        <div className="space-y-2">
          <Label htmlFor="serialNumber">Serial Number</Label>
          <Input
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => handleInputChange('serialNumber', e.target.value)}
            placeholder="Enter serial number"
            disabled={isReadOnly}
          />
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Additional notes or description"
          rows={3}
          disabled={isReadOnly}
        />
      </div>

      {/* Action Buttons */}
      {!isReadOnly && (
        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {mode === 'create' ? 'Create Asset' : 'Update Asset'}
          </Button>
        </div>
      )}

      {isReadOnly && (
        <div className="flex justify-end mt-6 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      )}
    </form>
  );
};

export default AssetFormModal;