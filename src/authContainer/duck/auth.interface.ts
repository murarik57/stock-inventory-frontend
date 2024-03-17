import { MetaSuccess } from "Interfaces/global.interface";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RoleInUserProfile {
  _id: string;
  name: string;
  role_type: string;
}

export interface ProfileUserObject {
  _id: string;
  name: string;
  email: string;
  role_id: RoleInUserProfile;
}

export interface UserProfileApiResponse extends MetaSuccess {
  data: {
    user: ProfileUserObject;
    ordersCount: number;
    productsCount: number;
  };
}
