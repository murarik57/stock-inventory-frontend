import React from "react";
import { ColumnsType } from "antd/es/table";
import { Row, Space, Grid } from "antd";

const { useBreakpoint } = Grid;
export interface OrderListRow {
  key: string;
  sn: number;
  companyName: string;
  date: string;
  action: React.ReactNode;
}

export const orderColumns = () => {
  const screens = useBreakpoint;
  const breakpoints = screens();

  const columns: ColumnsType<OrderListRow> = [
    {
      title: "S.no",
      dataIndex: "sn",
      key: "sn",
      width: 100,
      align: "center",
      responsive: ["md"],
    },
    {
      title: "Comapny Name",
      dataIndex: "companyName",
      key: "companyName",
      responsive: ["md"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      render: (record: OrderListRow) => {
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
                <span className="text-14 font-semibold">Comapny Name: </span>
                &nbsp;
                {record.companyName}
              </Row>
              <Row className="text-ellipsis overflow-hidden">
                <span className="text-14 font-semibold">Date: </span>
                &nbsp;
                {record.date}
              </Row>

              <Row>
                <span className="text-14 font-semibold">Action: </span>
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
