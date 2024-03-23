import React, { useMemo } from "react";
import routes from "Utils/routes";
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  DatabaseOutlined,
  ProductOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const { DASHBOARD, ORDER, PRODUCT, NEW_ORDER } = routes;

const getItem = ({
  label,
  pathname,
  icon,
  children,
}: {
  label: React.ReactNode;
  pathname?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}): MenuItem => {
  return {
    key: pathname,
    icon,
    label:
      typeof label === "string" && pathname ? (
        <NavLink to={pathname}>{label}</NavLink>
      ) : (
        label
      ),
    children,
  } as MenuItem;
};

const useSidebarMenuItems = () => {
  return useMemo(() => {
    const menuItems = [];

    menuItems.push({
      pathname: DASHBOARD,
      label: "Dashboard",
      icon: <DashboardOutlined />,
    });
    menuItems.push({
      pathname: PRODUCT,
      label: "Products",
      icon: <ProductOutlined />,
    });
    menuItems.push({
      label: "Orders",
      icon: <DatabaseOutlined />,
      children: [
        {
          pathname: ORDER,
          label: "Order List",
        },
        {
          label: "Create order",
          pathname: NEW_ORDER,
        },
      ].map((item) => getItem(item)),
    });

    return menuItems.map((item) => getItem(item));
  }, []);
};

export default useSidebarMenuItems;
