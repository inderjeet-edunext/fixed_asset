import App from "../App";
import Dashboard from "../pages/Dashboard";
import AssetMaster from "../pages/AssetMaster";
import { Navigate } from "react-router-dom";
import Configuration from "../pages/Configuration";

const AppRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "asset-management/asset-master", element: <AssetMaster /> },
      {
        path: "asset-management/asset-transfer",
        element: <h1>Asset Transfer</h1>,
      },
      {
        path: "asset-management/asset-disposal",
        element: <h1>Asset Disposal</h1>,
      },
      {
        path: "asset-management/depreciation-calculation",
        element: <h1>Depreciation Calculation</h1>,
      },
      {
        path: "maintenance-management/tickets",
        element: <h1>Maintenance Tickets</h1>,
      },
      {
        path: "maintenance-management/scheduled",
        element: <h1>Scheduled Maintenance</h1>,
      },
      {
        path: "audit-module/reports",
        element: <h1>Audit Reports</h1>,
      },
      {
        path: "audit-module/compliance",
        element: <h1>Compliance Check</h1>,
      },
      {
        path: "users",
        element: <h1>Users</h1>,
      },
      {
        path: "configuration",
        element: <Configuration />,
      },
      {
        path: "reports",
        element: <h1>Report</h1>,
      },
    ],
  },
];

export default AppRoutes;
