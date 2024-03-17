import { Layout, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useGetProfileQuery } from "../authContainer/duck/authAPI";
import Spinner from "Components/Spinner";
import { useDispatch } from "react-redux";
import { loggedInUserActions } from "authContainer/duck/loogedInUserSlice";
import { removeAppTokens, showNotification } from "Utils/commonFunction";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayoutContainer: React.FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { data, isFetching, isError, error } = useGetProfileQuery();

  useEffect(() => {
    if (!isError && data) {
      dispatch(loggedInUserActions.setLoggedInUserData(data));
    } else if (isError) {
      showNotification("error", error);
      removeAppTokens();
    }
  }, [data, dispatch, error, isError]);

  const toggleSidebar = useCallback(
    (bool = null) => {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    },
    [isSidebarCollapsed],
  );

  if (isFetching) {
    return (
      <Row className="w-full h-screen bg-white">
        <Spinner />
      </Row>
    );
  }

  return (
    <Layout className="h-screen --main-container">
      <AppSidebar
        toggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <Layout className="!bg-gray-300">
        <AppHeader
          collapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <Layout.Content
          style={{
            margin: "12px 12px",
            padding: 24,
            minHeight: 280,
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayoutContainer;
