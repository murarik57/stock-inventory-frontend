import {
  CheckCircleOutlined,
  DeleteOutlined,
  // MinusCircleOutlined,
  // PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Row,
  TreeSelect,
  Upload,
  SelectProps,
  // Tooltip,
  InputNumber,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ErrorObject } from "Interfaces/global.interface";
import { ProductObject } from "Interfaces/product.interface";
import { useCreateOrderMutation } from "orders/duck/orderApi";
import { useLazyProductListQuery } from "products/duck/productApi";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { beforeUpload, showNotification } from "Utils/commonFunction";
import routes from "Utils/routes";

const CreateOrder = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<ErrorObject>({});
  const [fileList, setFileList] = useState<any>();
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [{ companyName, products }, setState] = useState<any>({
    companyName: "",
    products: [],
  });

  const [
    getAllProducts,
    { isFetching, isError: isProductError, error: productError, data },
  ] = useLazyProductListQuery();

  const [createOrder, { isError, error: mutationError, isSuccess, isLoading }] =
    useCreateOrderMutation();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  useEffect(() => {
    if (isProductError) {
      showNotification("error", productError);
    }
  }, [isProductError, productError]);

  useEffect(() => {
    if (isError) {
      showNotification("error", mutationError);
    }

    if (isSuccess) {
      showNotification("success", "Order Created");

      navigate(routes.ORDER);
    }
  }, [isError, isSuccess, mutationError, navigate]);

  const productOptions = useMemo(() => {
    const options: SelectProps["options"] = [];

    if (data?.data?.length) {
      data?.data?.forEach((product) => {
        options.push({
          label: product.name,
          value: product._id,
        });
      });
    }

    return options;
  }, [data?.data]);

  const allIds = useMemo(
    () => productOptions?.map((option) => option.value),
    [productOptions],
  );

  const handleChange = useCallback(
    (name: string) => (e: React.ChangeEvent<HTMLInputElement> | any) => {
      const value: any = e?.target?.value ?? e;

      setState((prevState: any) => ({
        ...prevState,
        metadata: [],
        [name]: value,
      }));
      setError({});
    },
    [],
  );

  const hasError = useCallback(() => {
    const error: ErrorObject = {};

    if (!companyName?.trim()) {
      error.companyName = "Company Name cannot be blank";
    }
    if (!products?.length) {
      error.products = "Please add atleast one product";
    }

    setError(error);

    return !!Object.keys(error)?.length;
  }, [companyName, products?.length]);

  const handleUpload = useCallback(({ file }: any) => {
    setFileList(file);
  }, []);

  const filterOption: any = useCallback(
    (inputValue: string, treeNode: DefaultOptionType) =>
      treeNode?.label
        ?.toString()
        .toLowerCase()
        .includes(inputValue.toLowerCase()),
    [],
  );
  const handleInput = useCallback(
    (value: number | string | null, product: ProductObject) => {
      const newProducts: any[] = [...products.slice()];

      const matchedIndex = newProducts?.findIndex(
        (pvProd: ProductObject) => pvProd._id === product._id,
      );

      if (matchedIndex >= 0) {
        newProducts[matchedIndex] = {
          _id: product?._id,
          name: product.name,
          quantity: value,
        };
      } else {
        newProducts.push({
          _id: product?._id,
          name: product.name,
          quantity: value,
        } as const);
      }

      setState((preState: any) => ({
        ...preState,
        products: newProducts,
      }));
    },
    [products],
  );

  const onSubmit = useCallback(async () => {
    if (!hasError()) {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("products", JSON.stringify(products));

      if (fileList) formData.append("invoice", fileList);

      await createOrder(formData);
    }
  }, [companyName, createOrder, fileList, hasError, products]);

  return (
    <Col>
      <span className="font-medium text-[20px]">New Order</span>
      <Row className="mt-3 gap-3" align={"middle"}>
        <Col className="whitespace-nowrap text-16">Company Name:</Col>
        <Col>
          <Input
            name="companyName"
            placeholder="Company Name"
            size="large"
            value={companyName}
            onChange={handleChange("companyName")}
          />
          {error?.companyName && (
            <Row className="error">{error?.companyName}</Row>
          )}
        </Col>
      </Row>
      <Row className="mt-5 gap-3" align={"middle"}>
        <Col className="whitespace-nowrap text-16">Upload Invoice:</Col>
        <Col>
          {!fileList ? (
            <Upload
              accept={".jpeg, .jpg, .png, .pdf"}
              beforeUpload={beforeUpload}
              customRequest={handleUpload}
              showUploadList={false}
              maxCount={1}
              disabled={isLoading}
            >
              <Button icon={<UploadOutlined />}> Upload (Optional)</Button>
            </Upload>
          ) : (
            <Row align={"middle"}>
              {fileList?.name} &nbsp;
              <Button
                icon={<DeleteOutlined />}
                onClick={() => setFileList(null)}
              />
            </Row>
          )}
        </Col>
      </Row>
      <Row className="mt-5 gap-3" align={"middle"}>
        <Col className="whitespace-nowrap text-16">Products</Col>
        <Col sm={24} xs={24} md={18} lg={12} xl={12}>
          <TreeSelect
            size="large"
            placeholder="Search By Product Name"
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            disabled={isLoading}
            loading={isFetching}
            treeCheckable={true}
            style={{ width: "100%" }}
            onChange={(ids) => {
              setError({});
              setSelectedValues(ids);
            }}
            value={selectedValues}
            dropdownStyle={{ maxHeight: "300px" }}
            maxTagCount={3}
            maxTagPlaceholder={(omittedValues) =>
              `+ ${omittedValues.length} Product ...`
            }
            filterTreeNode={filterOption}
            treeData={
              data?.data?.length
                ? [
                    {
                      title:
                        selectedValues.length > 0 ? (
                          <span
                            onClick={() => setSelectedValues([])}
                            style={{
                              display: "inline-block",
                              color: "#286FBE",
                              cursor: "pointer",
                            }}
                          >
                            Unselect all
                          </span>
                        ) : (
                          <span
                            onClick={() => setSelectedValues(allIds)}
                            style={{
                              display: "inline-block",
                              color: "#286FBE",
                              cursor: "pointer",
                            }}
                          >
                            Select all
                          </span>
                        ),
                      value: "",
                      disabled: true,
                      checkable: false,
                    },
                    ...productOptions,
                  ]
                : []
            }
            allowClear
          />
          {error?.products && <Row className="error">{error?.products}</Row>}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="text-16">
          <table className="product-order">
            <tbody>
              <tr>
                <td>S. No.</td>
                <td>Product</td>
                <td>Stock Count</td>
                <td>Action</td>
              </tr>
              {selectedValues?.map((id: string, index: number) => {
                const foundProduct = data?.data?.find(
                  (product: ProductObject) => product._id === id,
                );
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{foundProduct?.name}</td>
                    <td className="text-center">{foundProduct?.quantity}</td>
                    <td>
                      <InputNumber
                        max={foundProduct?.quantity}
                        min={1}
                        size="large"
                        controls
                        defaultValue={0}
                        style={{
                          width: 150,
                        }}
                        disabled={isLoading || !foundProduct?.quantity}
                        onChange={(e) =>
                          handleInput(e, foundProduct as ProductObject)
                        }
                        // addonBefore={
                        //   <Tooltip title="Decrease">
                        //     <Button icon={<MinusCircleOutlined />} />
                        //   </Tooltip>
                        // }
                        // addonAfter={
                        //   <Tooltip title="Increase">
                        //     <Button icon={<PlusCircleOutlined />} />
                        //   </Tooltip>
                        // }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="mt-5">
        <Button
          size="large"
          type="primary"
          onClick={onSubmit}
          loading={isLoading}
          icon={<CheckCircleOutlined />}
        >
          Create Order
        </Button>
      </Row>
    </Col>
  );
};

export default CreateOrder;
