import React from "react";
import { Row } from "antd";

const Spinner: React.FC = () => {
  return (
    <Row className="spinner">
      <div className="loader" />
    </Row>
  );
};

export default Spinner;
