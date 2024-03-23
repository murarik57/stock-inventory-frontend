import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProductObject } from "Interfaces/product.interface";
import PrimaryModal from "Components/Modals/PrimaryModal";
import { Button, Col, Input, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ErrorObject } from "Interfaces/global.interface";
import {
  useUpdateOneProductMutation,
  useCreateProductMutation,
} from "products/duck/productApi";
import { showNotification } from "Utils/commonFunction";

interface AddProductModalProps {
  showModal: boolean;
  selectedProduct: ProductObject | null;
  handleModal: (params: any) => any;
}

const AddProductModal = ({
  showModal,
  handleModal,
  selectedProduct,
}: AddProductModalProps) => {
  const [error, setError] = useState<ErrorObject>({});
  const [{ name, description, quantity }, setState] = useState({
    name: "",
    description: "",
    quantity: "",
  });

  const productMutation: any = useMemo(
    () =>
      selectedProduct ? useUpdateOneProductMutation : useCreateProductMutation,
    [selectedProduct],
  );

  const [
    handleProduct,
    { isError, error: mutationError, isSuccess, isLoading, data },
  ] = productMutation();

  useEffect(() => {
    if (isError) {
      showNotification("error", mutationError);
    }

    if (isSuccess) {
      showNotification("success", data?.message ?? data?.meta?.message);
      handleModal(false);
    }
  }, [data, handleModal, isError, isSuccess, mutationError]);

  useEffect(() => {
    if (selectedProduct) {
      setState({
        name: selectedProduct.name,
        description: selectedProduct.description,
        quantity: selectedProduct.quantity.toString(),
      });
    }
  }, [selectedProduct]);

  const handleChange = useCallback(
    (name: string) => (e: React.ChangeEvent<HTMLInputElement> | any) => {
      let value: any = e?.target?.value ?? e;

      if (name === "quantity") {
        value = value.replace(/[^0-9/]/g, "");
      }

      setState((prevState) => ({ ...prevState, metadata: [], [name]: value }));
      setError({});
    },
    [],
  );

  const hasError = useCallback(() => {
    const error: ErrorObject = {};

    if (!name?.trim()) {
      error.name = "Product Name cannot be blank";
    }
    if (!quantity || Number(quantity) <= 0) {
      error.quantity = "Minimun quantity can 1";
    }

    setError(error);

    return !!Object.keys(error)?.length;
  }, [name, quantity]);

  const onSubmit = useCallback(() => {
    if (!hasError()) {
      const productObject = {
        name,
        description,
        quantity: Number(quantity),
      };
      if (selectedProduct) {
        const updatePayload = {
          id: selectedProduct._id,
          payload: productObject,
        };
        handleProduct(updatePayload);
      } else {
        handleProduct(productObject);
      }
    }
  }, [description, handleProduct, hasError, name, quantity, selectedProduct]);

  const modalTitle = useMemo(
    () => (selectedProduct ? "Edit Product" : "Add Product"),
    [selectedProduct],
  );
  const footer = useMemo(
    () => (
      <Row wrap={false} justify={"space-between"} className="w-full">
        <Button
          onClick={handleModal}
          disabled={isLoading}
          icon={<CloseOutlined />}
        >
          Cancel
        </Button>
        <Button type="primary" loading={isLoading} onClick={onSubmit}>
          Submit
        </Button>
      </Row>
    ),
    [handleModal, isLoading, onSubmit],
  );

  return (
    <PrimaryModal
      open={showModal}
      onCancel={handleModal}
      footer={footer}
      title={modalTitle}
    >
      <Col className="mb-3">
        <label>Product Name</label>
        <Input
          name="name"
          placeholder="Product Name"
          size="large"
          value={name}
          onChange={handleChange("name")}
        />
        {error?.name && <Row className="error">{error?.name}</Row>}
      </Col>
      <Col className="mb-3">
        <label>Product description</label>
        <Input.TextArea
          name="description"
          placeholder="Product description"
          size="large"
          value={description}
          onChange={handleChange("description")}
        />
      </Col>
      <Col className="mb-3">
        <label>Quantity</label>
        <Input
          name="quantity"
          placeholder="Quantity"
          size="large"
          value={quantity}
          onChange={handleChange("quantity")}
        />
        {error?.quantity && <Row className="error">{error?.quantity}</Row>}
      </Col>
    </PrimaryModal>
  );
};

export default AddProductModal;
