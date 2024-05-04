import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLazyOrderListQuery,
  useUploadInvoiceMutation,
} from "./duck/orderApi";
import { beforeUpload, showNotification } from "Utils/commonFunction";
import { Button, Col, Row, Table, Tooltip, Upload } from "antd";
import {
  EyeOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { orderColumns, OrderListRow } from "./components/orderColums";
import { useNavigate } from "react-router-dom";
import routes from "Utils/routes";
import { OrderObject } from "Interfaces/order.interface";
import dayjs from "dayjs";
import "./components/Orders.scss";

const OrderList = () => {
  const navigate = useNavigate();

  const [selectedOrder, selectOrder] = useState<string>("");

  const [getAllOrders, { isFetching, isError, error, data }] =
    useLazyOrderListQuery();

  const [
    uploadInvoice,
    { isLoading, isError: isUploadError, error: uploadError, isSuccess },
  ] = useUploadInvoiceMutation();

  useEffect(() => {
    if (error) {
      showNotification("error", error);
    }
  }, [error]);

  useEffect(() => {
    if (isUploadError) {
      showNotification("error", uploadError);
    }
  }, [uploadError, isUploadError]);

  useEffect(() => {
    if (isSuccess) {
      showNotification("success", "Invoice Uploaded");
      selectOrder("");
    }
  }, [isSuccess]);

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

  const handleUpload = useCallback(
    async ({ file }: any, orderId: string) => {
      if (file) {
        const formData = new FormData();
        formData.append("invoice", file);

        const payload: any = {
          id: orderId,
          data: formData,
        };

        await uploadInvoice(payload);
      }
    },
    [uploadInvoice],
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
            <Row wrap={false} className="gap-4">
              <Button
                onClick={() => navigateToEditPage(item?._id)}
                icon={<EyeOutlined />}
              />
              {!item?.invoice && (
                <Tooltip title="Upload Invoice">
                  <Upload
                    accept={".jpeg, .jpg, .png, .pdf"}
                    beforeUpload={beforeUpload}
                    customRequest={(e) => handleUpload(e, item._id)}
                    showUploadList={false}
                    maxCount={1}
                    disabled={isLoading}
                  >
                    <Button
                      loading={isLoading && selectedOrder === item._id}
                      icon={<UploadOutlined />}
                    />
                  </Upload>
                </Tooltip>
              )}
            </Row>
          ),
        });
      });
    }
    return orders;
  }, [
    data?.data,
    handleUpload,
    isError,
    isFetching,
    isLoading,
    navigateToEditPage,
    selectedOrder,
  ]);

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
            y: "calc(70vh - 70px)",
          }}
        />
      </Col>
    </Col>
  );
};

export default OrderList;
