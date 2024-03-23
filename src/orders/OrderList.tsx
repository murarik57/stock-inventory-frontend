import React, { useCallback, useEffect, useMemo } from "react";
import { useLazyOrderListQuery } from "./duck/orderApi";
import { showNotification } from "Utils/commonFunction";
import { Button, Col, Row, Table } from "antd";
import { EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { orderColumns, OrderListRow } from "./components/orderColums";
import { useNavigate } from "react-router-dom";
import routes from "Utils/routes";
import { OrderObject } from "Interfaces/order.interface";
import dayjs from "dayjs";
import "./components/Orders.scss";

const OrderList = () => {
  const navigate = useNavigate();

  const [getAllOrders, { isFetching, isError, error, data }] =
    useLazyOrderListQuery();

  useEffect(() => {
    if (error) {
      showNotification("error", error);
    }
  }, [error]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const navigateToEditPage = useCallback(
    (orderId: string) => {
      const path = routes.VIEW_ORDER.replace(":id", orderId);
      navigate(path);
    },
    [navigate],
  );

  const orders = useMemo(() => {
    const orders: OrderListRow[] = [];

    if (!isError && !isFetching) {
      data?.data?.forEach((item: OrderObject, index: number) => {
        orders.push({
          key: index.toString(),
          sn: index + 1,
          companyName: item?.companyName,
          date: dayjs(item?.createdAt).format("DD MMM YYYY"),
          action: (
            <Button
              onClick={() => navigateToEditPage(item?._id)}
              icon={<EyeOutlined />}
            />
          ),
        });
      });
    }
    return orders;
  }, [data?.data, isError, isFetching, navigateToEditPage]);

  return (
    <Col>
      <Row justify={"space-between"}>
        <span className="font-medium text-[20px]">Order Listing</span>

        <Button
          onClick={() => navigate(routes.NEW_ORDER)}
          size="large"
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          Create Order
        </Button>
      </Row>
      <Col span={24} className="mt-4  overflow-y-scroll">
        <Table
          loading={isFetching}
          dataSource={orders}
          columns={orderColumns()}
          pagination={{
            total: data?.data?.length || 0,
            pageSize: 20,
            showSizeChanger: false,
          }}
          scroll={{
            x: 600,
            y: "calc(70vh - 70px)",
          }}
        />
      </Col>
    </Col>
  );
};

export default OrderList;
