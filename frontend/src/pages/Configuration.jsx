import React from 'react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Settings, Plus } from 'lucide-react';

const Configuration = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Configuration</h1>
        <p className="text-slate-600">Configure system settings, categories, locations, and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Configuration Module</h3>
            <p className="text-slate-600 mb-4">
              This module will handle system configuration, categories, locations, and global settings.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuration;