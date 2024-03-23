export interface MetaCommon {
  status: number;
  success: boolean;
}
export interface MetaSuccess extends MetaCommon {
  message: string;
}

export interface ApiResponseError {
  meta: MetaSuccess;
  data: {
    message?: string;
  };
}

export interface ErrorObject {
  [key: string]: string;
}

export interface ResponseTypeOnlyId {
  meta: MetaSuccess;
  data: {
    _id: string;
  };
}
