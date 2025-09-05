import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../Button';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X
} from 'lucide-react';
import { addNotification } from '../../redux/slices/uiSlice';
import { assetAPI } from '../../services/api';

const BulkImportModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [step, setStep] = useState(1); // 1: Upload, 2: Mapping, 3: Preview, 4: Complete
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importResult, setImportResult] = useState(null);

  const supportedFormats = [
    { ext: '.xlsx', desc: 'Excel files' },
    { ext: '.csv', desc: 'CSV files' },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/csv'
      ];
      
      if (!validTypes.includes(file.type)) {
        dispatch(addNotification({
          type: 'error',
          title: 'Invalid File Type',
          message: 'Please select a valid Excel (.xlsx) or CSV file.'
        }));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        dispatch(addNotification({
          type: 'error',
          title: 'File Too Large',
          message: 'File size must be less than 10MB.'
        }));
        return;
      }

      setSelectedFile(file);
      setStep(2);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await assetAPI.bulkImportAssets(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setImportResult(response.data);
      setStep(4);
      
      dispatch(addNotification({
        type: 'success',
        title: 'Import Successful',
        message: `Successfully imported ${response.data.successCount} assets.`
      }));

    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        title: 'Import Failed',
        message: error.response?.data?.message || 'An error occurred during import.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create sample CSV template
    const csvContent = `Asset Tag,Asset Name,Category,Location,Assigned To,Purchase Date,Cost,Status
L-001,Dell Laptop,Office Equipment,HQ - IT Dept,John Doe,2023-12-03,85000,Active
OC-001,Office Chair,Furniture,Office 2,Jane Smith,2023-12-03,5500,Active`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'asset_import_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Asset File
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a CSV or Excel file containing your asset data
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mb-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              
              <p className="text-sm text-gray-500">
                or drag and drop your file here
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Supported Formats:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {supportedFormats.map((format, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span><strong>{format.ext}</strong> - {format.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadTemplate}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                File Selected
              </h3>
              <p className="text-sm text-gray-600">
                {selectedFile?.name} ({(selectedFile?.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Import Preview
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">File type:</span>
                  <span className="font-medium">
                    {selectedFile?.type.includes('excel') || selectedFile?.name.endsWith('.xlsx') ? 'Excel' : 'CSV'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">File size:</span>
                  <span className="font-medium">
                    {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">
                    Important Notes:
                  </h4>
                  <ul className="text-sm text-amber-700 mt-1 space-y-1">
                    <li>• Ensure all required fields are present</li>
                    <li>• Asset tags must be unique</li>
                    <li>• Dates should be in YYYY-MM-DD format</li>
                    <li>• Cost values should be numeric (without currency symbols)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSelectedFile(null);
                  setStep(1);
                }}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleUpload}
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start Import
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Import Complete
              </h3>
              <p className="text-sm text-gray-600">
                Your assets have been successfully imported
              </p>
            </div>

            {importResult && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Records:</span>
                    <span className="font-medium ml-2">{importResult.totalRecords || 0}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Successful:</span>
                    <span className="font-medium ml-2 text-green-600">
                      {importResult.successCount || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Failed:</span>
                    <span className="font-medium ml-2 text-red-600">
                      {importResult.failureCount || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Duplicates:</span>
                    <span className="font-medium ml-2 text-amber-600">
                      {importResult.duplicateCount || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Done
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= stepNum 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`
                  h-0.5 w-16 
                  ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Upload</span>
          <span>Validate</span>
          <span>Import</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Loading Progress */}
      {loading && (
        <div className="mt-6">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Importing assets... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default BulkImportModal;