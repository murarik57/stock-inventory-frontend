import { MetaSuccess } from "./global.interface";

export interface ProductObjectInOrder {
  _id: string;
  name: string;
  quantity: number;
}

export interface InvoiceObject {
  fileName: string;
  mimeType: string;
  path: string;
  size: number;
  _id: string;
}

export interface OrderObject {
  _id: string;
  companyName: string;
  invoice: InvoiceObject;
  products: ProductObjectInOrder[];
  createdAt: Date;
}

export interface CompleteOrderObject extends OrderObject {
  invoice: InvoiceObject;
}

export interface GetOneOrderResponse extends MetaSuccess {
  data: CompleteOrderObject;
}

export interface OrderListRespnse extends MetaSuccess {
  data: OrderObject[];
}

export interface CreateOrderPayload {
  data: FormData;
}
export interface UploadInvoicePayload {
  id: string;
  data: FormData;
}
