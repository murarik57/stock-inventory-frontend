import React from "react";
import { ColumnsType } from "antd/es/table";

export interface OrderListRow {
  key: string;
  sn: number;
  companyName: string;
  date: string;
  action: React.ReactNode;
}

export const orderColumns = () => {
  const columns: ColumnsType<OrderListRow> = [
    {
      title: "S.no",
      dataIndex: "sn",
      key: "sn",
      width: 100,
      align: "center",
    },
    {
      title: "Comapny Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 120,
    },
  ];

  return columns;
};
