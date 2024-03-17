import React from "react";
import { Col, Result } from "antd";
import { useRouteError } from "react-router-dom";

const RootBoundary: React.FC = () => {
  const error = useRouteError();
  console.log("error boundary", error);

  return (
    <Col className="bg-white h-screen w-screen">
      <Result
        status="warning"
        title="Oops Something went wrong."
        subTitle="Please refresh this page or try again later."
      />
      ;
    </Col>
  );
};

export default RootBoundary;
