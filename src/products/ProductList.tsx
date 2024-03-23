import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { ProductListRow, productColumns } from "./components/productColumns";
import { useLazyProductListQuery } from "./duck/productApi";
import { showNotification } from "Utils/commonFunction";
import { ProductObject } from "Interfaces/product.interface";
import AddProductModal from "./components/AddProductModal";

const ProductList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, selectProduct] = useState<ProductObject | null>(null);

  const [getAllProducts, { isFetching, isError, error, data }] =
    useLazyProductListQuery();

  useEffect(() => {
    if (isError) {
      showNotification("error", error);
    }
  }, [error, isError]);

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
            <Button
              onClick={() => handleModal(true, item)}
              icon={<EditOutlined />}
            />
          ),
        });
      });
    }
    return products;
  }, [data?.data, handleModal, isError, isFetching]);

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
            x: 600,
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
