import { MetaCommon } from "./global.interface";

export interface LoginResponseData extends MetaCommon {
  token: string;
}
