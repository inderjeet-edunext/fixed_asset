import React from 'react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Shield, Plus } from 'lucide-react';

const AuditModule = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Audit Module</h1>
        <p className="text-slate-600">Conduct asset audits and maintain compliance records</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Audit & Compliance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Audit Module</h3>
            <p className="text-slate-600 mb-4">
              This module will handle asset audits, compliance checks, and audit trail management.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Start Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditModule;