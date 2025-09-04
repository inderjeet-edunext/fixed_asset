import React, { useState } from 'react';
import './App.css';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Progress } from './components/ui/progress';
import { Input } from './components/ui/input';
import { 
  BarChart3,
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
  PieChart,
  Calendar,
  FileText,
  Wrench,
  DollarSign,
  Menu,
  Home,
  Archive,
  Tool,
  FileBarChart,
  User,
  LogOut,
  ChevronDown,
  Activity,
  Zap,
  Shield,
  AlertCircle
} from 'lucide-react';

// Enhanced mock data for the dashboard
const mockData = {
  summary: {
    totalAssets: 2158,
    activeAssets: 1402,
    maintenanceDue: 756,
    totalValue: 18200000,
    categories: 5,
    locations: 12,
    users: 89
  },
  assetDistribution: [
    { category: 'IT Equipment', percentage: 38, count: 820, color: '#3B82F6' },
    { category: 'Furniture', percentage: 26, count: 561, color: '#F59E0B' },
    { category: 'Vehicles', percentage: 14, count: 302, color: '#10B981' },
    { category: 'Buildings', percentage: 12, count: 259, color: '#6B7280' },
    { category: 'Others', percentage: 10, count: 216, color: '#8B5CF6' }
  ],
  assetStatusOverview: [
    { status: 'In Use', count: 1613, percentage: 74.8 },
    { status: 'Available', count: 437, percentage: 20.3 },
    { status: 'Under Maintenance', count: 65, percentage: 3.0 },
    { status: 'Needs Repair', count: 43, percentage: 1.9 }
  ],
  recentActivities: [
    { 
      id: 1, 
      type: 'transferred',
      title: 'Asset #A1023 Transferred',
      description: 'From IT Department → Finance Department',
      location: 'Location Change: Floor 3 → Floor 5',
      time: 'Today, 10:23 AM',
      icon: Package
    },
    { 
      id: 2, 
      type: 'added',
      title: 'New Asset Added',
      description: 'Laptop Dell XPS 15 - #A1024',
      details: 'Purchase Date: May 25, 2025 | Purchase Value: ₹1350',
      time: 'Yesterday, 2:45 PM',
      icon: Plus
    },
    { 
      id: 3, 
      type: 'disposed',
      title: 'Asset Disposed',
      description: 'Printer HP LaserJet - #A0872',
      details: 'Disposal Date: May 24, 2025 | Purchase Value: ₹1300',
      time: 'Yesterday, 12:25 PM',
      icon: Archive
    }
  ],
  importantAlerts: [
    {
      id: 1,
      type: 'expiring',
      title: 'AMC Expiring in 7 Days',
      description: 'Server Infrastructure - #A0123',
      severity: 'high',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Maintenance Due in 5 Days',
      description: 'Air Conditioner - #A0190',
      info: 'Service Window: 09-12-2025 - 09-12-2025',
      severity: 'medium',
      icon: Wrench,
      color: 'text-amber-600'
    },
    {
      id: 3,
      type: 'warranty',
      title: 'Asset End-Of-Life Approaching',
      description: 'Assets Will Reach EOL Next Month',
      info: 'Total Book Value: ₹1,200',
      severity: 'low',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'warranty',
      title: 'Warranty Expiring in 10 Days',
      description: 'Projector - #P0712',
      info: 'Warranty End Date: 03-12-2025',
      severity: 'medium',
      icon: Shield,
      color: 'text-purple-600'
    }
  ],
  complianceData: [
    { rule: 'Warranty Expired', assets: 3210, actionBy: 'IT Department', percentage: 74 },
    { rule: 'Overdue Audits', assets: 756, actionBy: 'Compliance Officer', percentage: 18 },
    { rule: 'No Image Proof Uploaded', assets: 102, actionBy: 'Store Incharge', percentage: 2 }
  ],
  assetValueTrend: [
    { month: 'Jan', assetValue: 16500, depreciationValue: 15800 },
    { month: 'Feb', assetValue: 16800, depreciationValue: 15900 },
    { month: 'Mar', assetValue: 17200, depreciationValue: 16100 },
    { month: 'Apr', assetValue: 17800, depreciationValue: 16300 },
    { month: 'May', assetValue: 18200, depreciationValue: 16500 },
    { month: 'Jun', assetValue: 18100, depreciationValue: 16800 },
    { month: 'Jul', assetValue: 18500, depreciationValue: 17000 },
    { month: 'Aug', assetValue: 18800, depreciationValue: 17200 },
    { month: 'Sep', assetValue: 18600, depreciationValue: 17400 },
    { month: 'Oct', assetValue: 18900, depreciationValue: 17600 },
    { month: 'Nov', assetValue: 19200, depreciationValue: 17800 },
    { month: 'Dec', assetValue: 19500, depreciationValue: 18000 }
  ]
};

const SidebarItem = ({ icon: Icon, label, isActive, hasSubmenu, onClick }) => (
  <div
    className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </div>
    {hasSubmenu && <ChevronDown className="h-4 w-4" />}
  </div>
);

const StatCard = ({ title, value, icon: Icon, bgColor, textColor, subtitle }) => (
  <Card className="relative overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-4 rounded-xl ${bgColor}`}>
          <Icon className={`h-8 w-8 ${textColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ActivityItem = ({ activity }) => {
  const Icon = activity.icon;
  return (
    <div className="flex items-start space-x-4 p-4 border-b border-slate-100 last:border-b-0">
      <div className="p-2 bg-slate-100 rounded-lg">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900">{activity.title}</h4>
        <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
        {activity.location && (
          <p className="text-xs text-slate-500 mt-1 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {activity.location}
          </p>
        )}
        {activity.details && (
          <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {activity.details.split('|')[0]}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              {activity.details.split('|')[1]}
            </span>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-2">{activity.time}</p>
      </div>
    </div>
  );
};

const AlertItem = ({ alert }) => {
  const Icon = alert.icon;
  return (
    <div className="flex items-start space-x-3 p-4 border-l-4 border-l-red-500 bg-red-50 rounded-lg">
      <Icon className={`h-5 w-5 mt-0.5 ${alert.color}`} />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900">{alert.title}</h4>
        <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
        {alert.info && <p className="text-xs text-slate-500 mt-1">{alert.info}</p>}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  const formatCurrency = (amount) => {
    return `₹${(amount / 100000).toFixed(1)} Cr`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={`bg-slate-800 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">AssetsTrack</h1>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search here..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            isActive={activeMenuItem === 'Dashboard'}
            onClick={() => setActiveMenuItem('Dashboard')}
          />
          <SidebarItem
            icon={Package}
            label="Asset Management"
            hasSubmenu
            isActive={activeMenuItem === 'Asset Management'}
            onClick={() => setActiveMenuItem('Asset Management')}
          />
          <SidebarItem
            icon={Wrench}
            label="Maintenance Manag."
            hasSubmenu
            isActive={activeMenuItem === 'Maintenance'}
            onClick={() => setActiveMenuItem('Maintenance')}
          />
          <SidebarItem
            icon={Shield}
            label="Audit Module"
            hasSubmenu
            isActive={activeMenuItem === 'Audit'}
            onClick={() => setActiveMenuItem('Audit')}
          />
          <SidebarItem
            icon={Users}
            label="Users"
            isActive={activeMenuItem === 'Users'}
            onClick={() => setActiveMenuItem('Users')}
          />
          <SidebarItem
            icon={Settings}
            label="Configuration"
            isActive={activeMenuItem === 'Configuration'}
            onClick={() => setActiveMenuItem('Configuration')}
          />
          <SidebarItem
            icon={FileBarChart}
            label="Report"
            isActive={activeMenuItem === 'Report'}
            onClick={() => setActiveMenuItem('Report')}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Filter</span>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Search...</span>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Quick Actions
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Assets"
              value={formatNumber(mockData.summary.totalAssets)}
              icon={Package}
              bgColor="bg-blue-100"
              textColor="text-blue-600"
            />
            <StatCard
              title="Active Assets"
              value={formatNumber(mockData.summary.activeAssets)}
              icon={CheckCircle}
              bgColor="bg-emerald-100"
              textColor="text-emerald-600"
            />
            <StatCard
              title="Maintenance Due/AMC Due"
              value={formatNumber(mockData.summary.maintenanceDue)}
              icon={Wrench}
              bgColor="bg-amber-100"
              textColor="text-amber-600"
            />
            <StatCard
              title="Total Asset Value"
              value={formatCurrency(mockData.summary.totalValue)}
              icon={DollarSign}
              bgColor="bg-purple-100"
              textColor="text-purple-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Asset Distribution Chart */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Asset Distribution by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.assetDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-slate-500">- {item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Simulated Pie Chart Visual */}
                <div className="mt-6 flex justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{
                      background: `conic-gradient(
                        #3B82F6 0deg ${38 * 3.6}deg,
                        #F59E0B ${38 * 3.6}deg ${(38 + 26) * 3.6}deg,
                        #10B981 ${(38 + 26) * 3.6}deg ${(38 + 26 + 14) * 3.6}deg,
                        #6B7280 ${(38 + 26 + 14) * 3.6}deg ${(38 + 26 + 14 + 12) * 3.6}deg,
                        #8B5CF6 ${(38 + 26 + 14 + 12) * 3.6}deg 360deg
                      )`
                    }}></div>
                    <div className="absolute inset-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Value Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Asset Value Trend
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Assets Value</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Depreciation Value</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-50 rounded-lg flex items-end justify-center p-4">
                  <div className="text-center text-slate-500">
                    <BarChart3 className="h-16 w-16 mx-auto mb-2 text-slate-400" />
                    <p>Asset Value Trend Chart</p>
                    <p className="text-sm">Current Value: {formatCurrency(mockData.summary.totalValue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {mockData.recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </CardContent>
            </Card>

            {/* Important Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Important Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.importantAlerts.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
                <Button variant="link" className="w-full text-blue-600 p-0">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Asset Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Status Overview</CardTitle>
                <p className="text-sm text-slate-500">Last Service: 09-12-2025</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.assetStatusOverview.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-emerald-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-amber-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium">{status.status}</span>
                        <span className="text-sm text-slate-500">{status.count} ({status.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Status Distribution Visual */}
                <div className="mt-6 flex justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full" style={{
                      background: `conic-gradient(
                        #10B981 0deg ${74.8 * 3.6}deg,
                        #3B82F6 ${74.8 * 3.6}deg ${(74.8 + 20.3) * 3.6}deg,
                        #F59E0B ${(74.8 + 20.3) * 3.6}deg ${(74.8 + 20.3 + 3.0) * 3.6}deg,
                        #EF4444 ${(74.8 + 20.3 + 3.0) * 3.6}deg 360deg
                      )`
                    }}></div>
                    <div className="absolute inset-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Alerts Table */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Alerts Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Rule Triggered</th>
                        <th className="text-left py-2">No. Of Assets</th>
                        <th className="text-left py-2">Action Required By</th>
                        <th className="text-left py-2">% Of Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.complianceData.map((rule, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{rule.rule}</td>
                          <td className="py-3">{formatNumber(rule.assets)}</td>
                          <td className="py-3">{rule.actionBy}</td>
                          <td className="py-3">{rule.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Calendar Widget
                  <span className="text-sm font-normal text-slate-500">July 2024</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simplified Calendar */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm mb-4">
                  <div className="font-semibold py-2">S</div>
                  <div className="font-semibold py-2">M</div>
                  <div className="font-semibold py-2">T</div>
                  <div className="font-semibold py-2">W</div>
                  <div className="font-semibold py-2">T</div>
                  <div className="font-semibold py-2">F</div>
                  <div className="font-semibold py-2">S</div>
                  
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className={`py-2 rounded ${
                      i + 1 === 10 ? 'bg-amber-500 text-white' :
                      i + 1 === 17 ? 'bg-blue-500 text-white' : 
                      'hover:bg-slate-100'
                    }`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Events */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-amber-500 rounded"></div>
                    <span>Upcoming Maintenance - 10 May 2025</span>
                  </div>
                  <div className="text-xs text-slate-500 ml-5">
                    Department: Facilities | Category: HVAC Equipment
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Assets - 17 May 2025</span>
                  </div>
                  <div className="text-xs text-slate-500 ml-5">
                    Department: IT | Category: Laptops, Servers
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
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