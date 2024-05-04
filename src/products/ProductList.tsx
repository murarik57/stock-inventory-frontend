import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { ProductListRow, productColumns } from "./components/productColumns";
import {
  useDeleteProductMutation,
  useLazyProductListQuery,
} from "./duck/productApi";
import { showNotification } from "Utils/commonFunction";
import { ProductObject } from "Interfaces/product.interface";
import AddProductModal from "./components/AddProductModal";

const ProductList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, selectProduct] = useState<ProductObject | null>(null);
  const [deleteId, setDeleteId] = useState<string>("");

  const [getAllProducts, { isFetching, isError, error, data }] =
    useLazyProductListQuery();

  const [
    deleteProduct,
    { isLoading, isError: isDeleteError, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (isError) {
      showNotification("error", error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isDeleteError) {
      showNotification("error", deleteError);
    }
  }, [deleteError, isDeleteError]);

  useEffect(() => {
    if (isSuccess) {
      showNotification("success", "Product Deleted");
      setDeleteId("");
    }
  }, [isSuccess]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handleModal = useCallback(
    (show: boolean, product: ProductObject | null = null) => {
      show = typeof show === "boolean" && show;
      setShowModal(show);
      selectProduct(product);
    },
    [],
  );

  const products = useMemo(() => {
    const products: ProductListRow[] = [];

    if (!isError && !isFetching) {
      data?.data?.forEach((item: ProductObject, index: number) => {
        products.push({
          key: index.toString(),
          sn: index + 1,
          name: item?.name,
          description: item?.description,
          quantity: item?.quantity,
          action: (
            <Row className="gap-2" wrap={false}>
              <Button
                onClick={() => handleModal(true, item)}
                icon={<EditOutlined />}
              />
              <Button
                onClick={() => deleteProduct(item._id)}
                icon={<DeleteOutlined />}
                loading={deleteId === item._id && isLoading}
              />
            </Row>
          ),
        });
      });
    }
    return products;
  }, [
    data?.data,
    deleteId,
    deleteProduct,
    handleModal,
    isError,
    isFetching,
    isLoading,
  ]);

  return (
    <Col>
      <Row justify={"space-between"}>
        <span className="font-medium text-[20px]">Product Listing</span>

        <Button
          onClick={() => handleModal(true)}
          size="large"
          type="primary"
          icon={<PlusCircleOutlined />}
        >
          Add New
        </Button>
      </Row>
      <Col span={24} className="mt-4  overflow-y-scroll">
        <Table
          loading={isFetching}
          dataSource={products}
          columns={productColumns()}
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
      {showModal && (
        <AddProductModal
          showModal={showModal}
          handleModal={handleModal}
          selectedProduct={selectedProduct}
        />
      )}
    </Col>
  );
};

export default ProductList;
