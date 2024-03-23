export interface MetaCommon {
  status: number;
  success: boolean;
}
export interface MetaSuccess extends MetaCommon {
  message: string;
}

export interface ApiResponseError extends MetaCommon {
  data: {
    message?: string;
  };
}

export interface ErrorObject {
  [key: string]: string;
}

export interface ResponseTypeOnlyId extends MetaSuccess {
  data: {
    _id: string;
  };
}
