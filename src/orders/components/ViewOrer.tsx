import React, { useEffect, useMemo } from "react";
import { Button, Col, Row } from "antd";
import Spinner from "Components/Spinner";
import { useLazyGetOneOrderQuery } from "orders/duck/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "Utils/commonFunction";
import routes from "Utils/routes";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";

const ViewOrer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [getOneOrder, { isError, error, isFetching, isSuccess, data }] =
    useLazyGetOneOrderQuery();

  useEffect(() => {
    if (isError) {
      showNotification("error", error);
      navigate(routes.ORDER);
    }
  }, [error, isError, navigate]);

  const order = useMemo(() => {
    if (data && isSuccess) {
      return {
        ...data?.data,
      };
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (id) getOneOrder(id);
  }, [getOneOrder, id]);

  if (isFetching) {
    return (
      <Row className="h-full">
        <Spinner />
      </Row>
    );
  }

  return (
    <Col>
      <span className="font-medium text-[20px]">Order Details</span>
      <Row className="mt-3 gap-3">
        <Col className="whitespace-nowrap text-16">Company Name:</Col>
        <Col className="text-16">{order?.companyName}</Col>
      </Row>
      <Row className="mt-5 gap-3">
        <Col className="whitespace-nowrap text-16">Order Date:</Col>
        <Col className="text-16">
          {dayjs(order?.createdAt).format("DD MMM YYYY")}
        </Col>
      </Row>
      <Row className="mt-5 gap-3" align={"middle"}>
        <Col className="whitespace-nowrap text-16">Invoice:</Col>
        <Col className="text-16">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => window.open(order?.invoice?.path, "_blank")}
          >
            View Invoice
          </Button>
        </Col>
      </Row>
      <Row className="mt-5 gap-3">
        <Col className="whitespace-nowrap text-16">Products</Col>
        <Col className="text-16">
          <table className="product-order">
            <tbody>
              <tr>
                <td>Product</td>
                <td>Quantity</td>
              </tr>
              {order?.products?.map((product) => (
                <tr key={product?._id}>
                  <td>{product?.name}</td>
                  <td>{product?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Col>
  );
};

export default ViewOrer;
