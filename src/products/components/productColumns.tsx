import React from "react";
import { ColumnsType } from "antd/es/table";

export interface ProductListRow {
  key: string;
  sn: number;
  name: string;
  description: string;
  quantity: number;
  action: React.ReactNode;
}

export const productColumns = () => {
  const columns: ColumnsType<ProductListRow> = [
    {
      title: "S.no",
      dataIndex: "sn",
      key: "sn",
      width: 100,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      align: "center",
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
