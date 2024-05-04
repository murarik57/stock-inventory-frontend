import React from "react";
import { ColumnsType } from "antd/es/table";
import { Row, Space, Grid } from "antd";

const { useBreakpoint } = Grid;

export interface ProductListRow {
  key: string;
  sn: number;
  name: string;
  description: string;
  quantity: number;
  action: React.ReactNode;
}

export const productColumns = () => {
  const screens = useBreakpoint;
  const breakpoints = screens();

  const columns: ColumnsType<ProductListRow> = [
    {
      title: "S.no",
      dataIndex: "sn",
      key: "sn",
      width: 100,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      responsive: ["md"],
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 120,
      responsive: ["md"],
    },
  ];

  if ((breakpoints.sm || breakpoints.xs) && !breakpoints.md)
    columns.unshift({
      title: "Details",
      render: (record: ProductListRow) => {
        const isEven = record.sn % 2 === 0;

        return (
          <>
            <Space
              className={`w-full p-4 rounded ${isEven ? "!bg-gray-100" : ""}`}
              direction="vertical"
            >
              <Row>
                <span className="text-14 font-semibold">S.no: </span>
                &nbsp;
                {record.sn}
              </Row>
              <Row>
                <span className="text-14 font-semibold">Name: </span>
                &nbsp;
                {record.name}
              </Row>
              <Row className="text-ellipsis overflow-hidden">
                <span className="text-14 font-semibold">Description: </span>
                &nbsp;
                {record.description}
              </Row>
              <Row>
                <span className="text-14 font-semibold">Quantity: </span>
                &nbsp;
                {record.quantity}
              </Row>
              <Row>
                <span className="text-14 font-semibold"> Action: </span>
                &nbsp; &nbsp;
                {record.action}
              </Row>
            </Space>
          </>
        );
      },
      responsive: ["xs", "sm"],
    });

  return columns;
};
