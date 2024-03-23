import { MetaSuccess } from "./global.interface";

export interface ProductObject {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  active: boolean;
  status: boolean;
  createdAt: Date;
}

export interface ProductListRespnse extends MetaSuccess {
  data: ProductObject[];
}
export interface GetOneProductResponse extends MetaSuccess {
  data: ProductObject;
}

export interface AddProductPayload {
  name: string;
  description: string;
  quantity: number;
}

export interface UpdateOneProductPayload {
  id: string;
  payload: AddProductPayload;
}
