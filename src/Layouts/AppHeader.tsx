import React, { useCallback } from "react";
import { Avatar, Button, Dropdown, Layout, Row } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { getNameInitials } from "Utils/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "Utils/routes";
import constants from "Utils/constants";
import { ProfileUserObject } from "authContainer/duck/auth.interface";

const { ACTION_TYPES } = constants;

interface AppHeaderProps {
  toggleSidebar: () => void;
  collapsed: boolean;
}

const AppHeader = ({ toggleSidebar, collapsed }: AppHeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser: ProfileUserObject = useSelector(
    ({ loggedInUser }: any) => loggedInUser?.data?.user,
  );

  const onLogout = useCallback(() => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
    navigate(routes.ROOT);
  }, [dispatch, navigate]);

  return (
    <Layout.Header className="appHeader">
      <Row align="middle" justify="space-between" wrap={false}>
        <Row align="middle" wrap={false}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined className="text-white" />
              ) : (
                <MenuFoldOutlined className="text-white" />
              )
            }
            onClick={toggleSidebar}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Row>

        <Row
          align="middle"
          justify="space-between"
          style={{ paddingLeft: "auto" }}
          className="pointer mr20"
          wrap={false}
        >
          <span className="mr-2 text-ellipsis overflow-hidden whitespace-nowrap">
            {loggedInUser?.name}
          </span>
          <Dropdown
            rootClassName="profile-dropdown "
            menu={{
              items: [
                {
                  key: "logout",
                  label: "Logout",
                  icon: <PoweroffOutlined />,
                  onClick: onLogout,
                },
              ],
            }}
            trigger={["click"]}
            arrow
          >
            <Row className="pointer" align={"middle"} wrap={false}>
              <Avatar
                style={{
                  backgroundColor: "grey",
                }}
                size={"large"}
              >
                {getNameInitials(loggedInUser?.name ?? "")}
              </Avatar>
              <CaretDownOutlined className="text-[25px] ml-1 text-white" />
            </Row>
          </Dropdown>
        </Row>
      </Row>
    </Layout.Header>
  );
};

export default AppHeader;
