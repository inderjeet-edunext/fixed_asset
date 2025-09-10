import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Filter, 
  Search, 
  Plus, 
  Upload, 
  Download, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight,
  Laptop,
  Printer,
  Building,
  MonitorSpeaker
} from 'lucide-react';
import { 
  fetchAssets,
  setFilters,
  toggleAssetSelection,
  selectAllAssets,
  clearSelection,
  setPagination
} from '../redux/slices/assetSlice';
import { openModal } from '../redux/slices/uiSlice';
import { getStatusColor, debounce } from '../lib/utils';

const AssetRow = ({ asset, isSelected, onSelect }) => {
  const dispatch = useDispatch();
  
  const getIcon = (iconName) => {
    const icons = {
      Laptop,
      Printer,
      Building,
      MonitorSpeaker,
    };
    return icons[iconName] || Laptop;
  };

  const Icon = getIcon(asset.icon);

  const handleEdit = () => {
    dispatch(openModal({
      modalName: 'assetForm',
      config: { mode: 'edit', data: asset }
    }));
  };

  const handleView = () => {
    dispatch(openModal({
      modalName: 'assetForm',
      config: { mode: 'view', data: asset }
    }));
  };

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <td className="py-4 px-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          aria-label={`Select ${asset.name}`}
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{asset.name}</p>
            <p className="text-sm text-slate-500">{asset.assetTag}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-slate-900">{asset.category}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-slate-900">{asset.location}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-slate-900">{asset.assignedTo}</span>
      </td>
      <td className="py-4 px-4">
        <div>
          <p className="text-sm text-slate-900">{asset.purchaseDate}</p>
          <p className="text-xs text-slate-500">{asset.purchaseTime}</p>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm font-medium text-slate-900">{asset.cost}</span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-slate-900">{asset.depreciationValue}</span>
      </td>
      <td className="py-4 px-4">
       
      </td>
      <td className="py-4 px-4">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          {/* Dropdown menu would be implemented here */}
        </div>
      </td>
    </tr>
  );
};

const AssetMaster = () => {
  const dispatch = useDispatch();
  const { 
    assets, 
    loading, 
    filters, 
    pagination, 
    selectedAssets 
  } = useSelector((state) => state.assets);

  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    // Only fetch if assets array is empty (for real API integration)
    if (assets.length === 0) {
      dispatch(fetchAssets()).catch(() => {
        // If API fails, we'll use the mock data already in the store
        console.log('Using mock data - API endpoints not available');
      });
    }
  }, [dispatch, assets.length]);

  // Debounced search
  const debouncedSearch = debounce((term) => {
    dispatch(setFilters({ search: term }));
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleAddAsset = () => {
    dispatch(openModal({
      modalName: 'assetForm',
      config: { mode: 'create', data: null }
    }));
  };

  const handleBulkImport = () => {
    dispatch(openModal({
      modalName: 'bulkImport',
      config: {}
    }));
  };

  const handleExport = () => {
    // Handle export logic
    console.log('Export assets');
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      dispatch(selectAllAssets());
    } else {
      dispatch(clearSelection());
    }
  };

  const handleAssetSelect = (assetId) => {
    dispatch(toggleAssetSelection(assetId));
  };

  const handlePageChange = (page) => {
    dispatch(setPagination({ currentPage: page }));
  };

  const isAllSelected = selectedAssets.length === assets.length && assets.length > 0;
  const isPartiallySelected = selectedAssets.length > 0 && selectedAssets.length < assets.length;

  return (
    <div className="p-4 space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Asset Master</h1>
        <p className="text-slate-600">Manage and track all your organization's assets</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
           
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleBulkImport}>
            <Upload className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleAddAsset}>
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>
              {pagination.currentPage * pagination.itemsPerPage - pagination.itemsPerPage + 1}-
              {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems}
            </span>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading assets...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-left">
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isPartiallySelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all assets"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Asset Details
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Assigned To
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Purchase Date
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Cost
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Depreciation Value
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <AssetRow
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAssets.includes(asset.id)}
                    onSelect={() => handleAssetSelect(asset.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && assets.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No assets found</h3>
            <p className="text-slate-600 mb-4">
              {filters.search ? 'No assets match your search criteria.' : 'Get started by adding your first asset.'}
            </p>
            <Button onClick={handleAddAsset}>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        )}
      </div>

      {/* Selected Items Actions */}
      {selectedAssets.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4">
          <span className="text-sm">
            {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              Export
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
              Delete
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-slate-700"
              onClick={() => dispatch(clearSelection())}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetMaster;