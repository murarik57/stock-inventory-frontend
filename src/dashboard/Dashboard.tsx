import React from "react";
import { Col, Row } from "antd";
import { UserProfileApiResponse } from "authContainer/duck/auth.interface";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const loggedInUser: UserProfileApiResponse = useSelector(
    ({ loggedInUser }: any) => loggedInUser,
  );
  return (
    <Row className="w-full gap-7">
      <Col className="dash-card">
        Total Orders: {loggedInUser?.data?.ordersCount}{" "}
      </Col>
      <Col className="dash-card">
        Total Products: {loggedInUser?.data?.productsCount}{" "}
      </Col>
    </Row>
  );
};

export default Dashboard;
