import React from "react";
import { Layout, Menu, Row } from "antd";
import appIcon from "../Assets/images/appIcon.jpeg";
import { useLocation } from "react-router-dom";
import "./AppSidebar.scss";
import useSidebarMenuItems from "Components/useSidebarMenuItems";

interface AppSidebarProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

const AppSidebar = (props: AppSidebarProps) => {
  const location = useLocation();
  const appMenuItems = useSidebarMenuItems();

  return (
    <Layout.Sider
      className="app-sidebar"
      width={240}
      trigger={null}
      collapsible
      collapsed={props?.isSidebarCollapsed}
      theme="dark"
      breakpoint="md"
      onBreakpoint={(broken) => {
        if (broken && !props?.isSidebarCollapsed) props?.toggleSidebar();
      }}
    >
      <Row className="logo-container">
        <div className="logo">
          <img alt="app logo" className="w-full max-h-[60px]" src={appIcon} />
        </div>
      </Row>

      <Menu
        theme="dark"
        mode="inline"
        className="app-sidebar-menu"
        selectedKeys={[location?.pathname]}
        items={appMenuItems}
      />
    </Layout.Sider>
  );
};

export default React.memo(AppSidebar);
