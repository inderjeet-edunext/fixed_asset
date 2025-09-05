import React from 'react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRightLeft, Plus } from 'lucide-react';

const AssetTransfer = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Asset Transfer</h1>
        <p className="text-slate-600">Transfer assets between departments, locations, or users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span>Asset Transfer Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <ArrowRightLeft className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Asset Transfer Module</h3>
            <p className="text-slate-600 mb-4">
              This module will handle asset transfers between departments, locations, and users.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Transfer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetTransfer;