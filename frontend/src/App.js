import React, { useState, useMemo } from 'react';
import './App.css';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { 
  Building2, 
  Package, 
  MapPin, 
  Users, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Settings,
  Bell,
  BarChart3,
  PieChart,
  Calendar,
  FileText,
  Wrench,
  DollarSign
} from 'lucide-react';

// Mock data for the dashboard
const mockData = {
  summary: {
    totalAssets: 1247,
    totalValue: 2850000,
    categories: 12,
    locations: 8,
    activeAssignments: 892,
    maintenanceTickets: 23
  },
  assetsByStatus: [
    { status: 'Active', count: 892, color: 'bg-emerald-500' },
    { status: 'Maintenance', count: 23, color: 'bg-amber-500' },
    { status: 'Retired', count: 156, color: 'bg-slate-500' },
    { status: 'Disposed', count: 176, color: 'bg-red-500' }
  ],
  assetsByCategory: [
    { category: 'IT Equipment', count: 456, value: 890000 },
    { category: 'Office Furniture', count: 234, value: 156000 },
    { category: 'Machinery', count: 189, value: 1200000 },
    { category: 'Vehicles', count: 98, value: 445000 },
    { category: 'Building', count: 23, value: 159000 }
  ],
  recentActivities: [
    { id: 1, type: 'assignment', message: 'Laptop Dell-5490 assigned to John Smith', time: '2 hours ago', icon: Package },
    { id: 2, type: 'maintenance', message: 'Printer HP-2021 maintenance completed', time: '4 hours ago', icon: Wrench },
    { id: 3, type: 'alert', message: 'Asset AMC-001 depreciation alert', time: '6 hours ago', icon: AlertTriangle },
    { id: 4, type: 'assignment', message: 'Office Chair OFC-234 returned from Jane Doe', time: '1 day ago', icon: Package }
  ],
  upcomingMaintenance: [
    { id: 1, asset: 'Server HP-DL380', dueDate: '2025-01-15', priority: 'High' },
    { id: 2, asset: 'AC Unit LG-001', dueDate: '2025-01-18', priority: 'Medium' },
    { id: 3, asset: 'Projector EP-001', dueDate: '2025-01-22', priority: 'Low' }
  ]
};

const StatCard = ({ title, value, icon: Icon, trend, color = 'text-slate-600' }) => (
  <Card className="hover:shadow-md transition-shadow duration-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-slate-50 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ activity }) => {
  const Icon = activity.icon;
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
      <div className="p-2 bg-slate-100 rounded-full">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-900">{activity.message}</p>
        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-slate-700" />
              <h1 className="text-2xl font-bold text-slate-900">AssetMaster</h1>
            </div>
            <nav className="hidden md:flex space-x-6 ml-10">
              <a href="#" className="text-slate-900 font-medium border-b-2 border-slate-900 pb-2">Dashboard</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">Assets</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">Maintenance</a>
              <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">Reports</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4 mr-2" />
              Search Assets
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h2>
          <p className="text-slate-600">Monitor your asset portfolio and track key metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Assets"
            value={mockData.summary.totalAssets.toLocaleString()}
            icon={Package}
            trend={5.2}
            color="text-emerald-600"
          />
          <StatCard
            title="Total Value"
            value={formatCurrency(mockData.summary.totalValue)}
            icon={DollarSign}
            trend={3.1}
            color="text-blue-600"
          />
          <StatCard
            title="Active Assignments"
            value={mockData.summary.activeAssignments.toLocaleString()}
            icon={Users}
            trend={-1.2}
            color="text-purple-600"
          />
          <StatCard
            title="Maintenance Tickets"
            value={mockData.summary.maintenanceTickets}
            icon={Wrench}
            trend={-8.5}
            color="text-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Asset Status Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Asset Status Distribution
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.assetsByStatus.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                      <span className="font-medium text-slate-900">{status.status}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-600">{status.count}</span>
                      <div className="w-24">
                        <Progress 
                          value={(status.count / mockData.summary.totalAssets) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add New Asset
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Bulk Import
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Wrench className="h-4 w-4 mr-2" />
                Schedule Maintenance
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Activities
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {mockData.recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Asset Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Assets by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.assetsByCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-slate-900">{category.category}</p>
                      <p className="text-sm text-slate-600">{category.count} assets</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{formatCurrency(category.value)}</p>
                      <div className="w-20 mt-1">
                        <Progress 
                          value={(category.value / mockData.summary.totalValue) * 100} 
                          className="h-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Maintenance */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upcoming Maintenance
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockData.upcomingMaintenance.map((item) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900">{item.asset}</h4>
                    <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'default' : 'secondary'}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Due: {item.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;