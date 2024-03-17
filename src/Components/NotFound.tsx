import React, { useCallback } from "react";
import { Button, Result, Row } from "antd";
import { useNavigate } from "react-router-dom";

import routes from "Utils/routes";

const NotFound = () => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(routes.DASHBOARD);
  }, [navigate]);

  return (
    <Row className="fh" justify="center" align="middle">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button size="large" onClick={onClick} type="primary">
            Go To Dashboard
          </Button>
        }
      />
    </Row>
  );
};

export default React.memo(NotFound);
