import { LoginResponseData } from "Interfaces/profile.interface";
import constants from "./constants";
import { jwtDecode } from "jwt-decode";
import { AvatarProps, notification } from "antd";
import { ApiResponseError } from "Interfaces/global.interface";

const { ACCESS_TOKEN, NOTIFICATION_DURATION, NOTIFICATION_POSITION } =
  constants;

type NotificationType = "success" | "info" | "warning" | "error";
interface JWTDecodedUser {
  iat: number;
  exp: number;
}

export const removeAppTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.clear();
};

export const setAppTokens = (payload: LoginResponseData): void => {
  localStorage.setItem(ACCESS_TOKEN, payload.token);
};

export const isAuthenticated = (): boolean => {
  if (typeof window == "undefined") return false;

  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const user: JWTDecodedUser = jwtDecode(token);
      const dateNow = new Date();

      if (user?.exp > dateNow.getTime() / 1000) {
        return true;
      }
      removeAppTokens();
    }
  } catch (error) {
    showNotification("error", "Invalid Token");
    removeAppTokens();
  }

  return false;
};

export const validEmail = (email: string) => {
  const mailformat = /^\w+([.-]?\w+[+]?)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return mailformat.test(email);
};

export const showNotification = (
  type: NotificationType = "warning",
  msgOrObject: string | any = "Something went wrong",
) => {
  if (type === "error" && typeof msgOrObject !== "string") {
    const errorObject = msgOrObject as ApiResponseError;
    msgOrObject = errorObject?.data?.message;
  }

  notification[type]({
    message: msgOrObject || "Something went wrong",
    placement: NOTIFICATION_POSITION,
    duration: NOTIFICATION_DURATION,
  });
};

export const getNameInitials = (name: string): string | undefined => {
  name = name && name.trim();
  if (!name) return;
  const initials = name[0] || "";
  // const index = name.indexOf(" ");
  // if (index < name.length && index > 1) {
  //   initials += name[index + 1];
  // }
  return initials.toUpperCase();
};

export const getAvatarProps = (imgSrc: string = "") => {
  const props: AvatarProps = {
    size: "large",
    alt: "Profile Image",
  };
  if (imgSrc) {
    props.src = imgSrc;
  }
  return props;
};
