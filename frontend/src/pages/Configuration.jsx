import { Link } from "react-router-dom";
import Images from "../assets/Images";
import React from "react";
const configurationSections = [
  {
    heading: "Organization Settings",
    image: Images.configration.OrganizationSettings,
    items: [
      {
        label: "Organization Details",
        path: "/configuration/organization-details",
      },
      { label: "Fiscal Year", path: "/configuration/fiscal-year" },
      { label: "Appearance", path: "/configuration/appearance" },
      { label: "User Role", path: "/configuration/user-role" },
      { label: "Alerts", path: "/configuration/alerts" },
    ],
  },
  {
    heading: "Asset Classification",
    image: Images.configration.AssetClassification,
    items: [
      { label: "Asset Category", path: "/configuration/asset-category" },
      {
        label: "Asset Sub-category",
        path: "/configuration/asset-sub-category",
      },
      { label: "Asset ID", path: "/configuration/asset-id" },
      { label: "Transfer ID", path: "/configuration/transfer-id" },
      { label: "Disposal ID", path: "/configuration/disposal-id" },
      {
        label: "Asset Disposal Category",
        path: "/configuration/asset-disposal-category",
      },
    ],
  },
  {
    heading: "Asset Operations",
    image: Images.configration.AssetOperations,
    items: [
      { label: "Location", path: "/configuration/location" },
      { label: "Department", path: "/configuration/department" },
    ],
  },
  {
    heading: "API Integration",
    image: Images.configration.APIIntegration,
    items: [
      { label: "Email", path: "/configuration/api-integration/email" },
      { label: "SMS", path: "/configuration/api-integration/sms" },
      { label: "WhatsApp", path: "/configuration/api-integration/whatsapp" },
    ],
  },
  {
    heading: "Depreciation",
    image: Images.configration.Depreciation,
    items: [
      {
        label: "Depreciation Setting",
        path: "/configuration/depreciation-setting",
      },
      {
        label: "Depreciation Frequency",
        path: "/configuration/depreciation-frequency",
      },
      {
        label: "Global Depreciation Configuration",
        path: "/configuration/global-depreciation-configuration",
      },
      {
        label: "Category-wise Depreciation Rules",
        path: "/configuration/category-wise-depreciation-rules",
      },
    ],
  },
  {
    heading: "Disposal Module",
    image: Images.configration.DisposalModule,
    items: [
      {
        label: "Enable/Disable Disposal Types",
        path: "/configuration/enable-disable-disposal-types",
      },
      {
        label: "Define Disposal Approvers",
        path: "/configuration/define-disposal-approvers",
      },
      {
        label: "Disposal Notification Setup",
        path: "/configuration/disposal-notification-setup",
      },
      {
        label: "Residual Value Policy",
        path: "/configuration/residual-value-policy",
      },
    ],
  },
];

function Configuration() {
  return (
    <div className="p-4">
      <h4 className="text-lg font-semibold">Configration</h4>
      <div className="mt-4 bg-white p-4 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {configurationSections.length > 0 &&
            configurationSections.map(
              ({ image = "--", heading = "--", items = [] }, index) => (
                <div
                  className="border border-[#E0E0E0] rounded-md px-4 pt-4 pb-20 bg-[#FDFDFE]"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <img src={image} loading="lazy" alt="" />
                    </div>
                    <h5 className="text-sm font-semibold">{heading}</h5>
                  </div>
                  {items?.length > 0 && (
                    <div
                      className="mt-5 flex space-y-3 items-start"
                      style={{ flexDirection: "column" }}
                    >
                      {items.map(({ label = "--", path = "/" }, index) => (
                        <Link
                          className="inline-block text-xs font-medium text-[#212529] hover:text-black"
                          key={index}
                          to={path}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default Configuration;
