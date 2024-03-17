import React, { ChangeEvent, useCallback, useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { Navigate, useLocation } from "react-router-dom";
import { ApiResponseError, ErrorObject } from "Interfaces/global.interface";
import { useLoginMutation } from "./duck/authAPI";
import {
  removeAppTokens,
  isAuthenticated,
  setAppTokens,
  showNotification,
  validEmail,
} from "Utils/commonFunction";
import routes from "Utils/routes";
import appLogo from "Assets/images/appLogo.jpeg";
import "./LoginContainer.scss";
import { useGetProfileHook } from "Hooks/useGetProfileHook";
import { LoginResponseData } from "Interfaces/profile.interface";

const LoginContainer: React.FC = () => {
  const location = useLocation();
  const { fetchUserProfile } = useGetProfileHook();
  const [login, { isLoading }] = useLoginMutation();

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<ErrorObject>({});

  const handleChange = useCallback(
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target?.value?.trim();

      setState((prestate) => ({
        ...prestate,
        [name]: value,
      }));
      setError({});
    },
    [],
  );

  const hasError = useCallback(() => {
    const { email, password } = state;
    const error: ErrorObject = {};

    if (!email?.trim()) {
      error.email = "Email cannot be blank";
    } else if (!validEmail(email)) {
      error.email = "Email is not valid";
    }
    if (!password?.trim()) {
      error.password = "Password cannot be blank";
    }

    setError(error);

    return !!Object.keys(error)?.length;
  }, [state]);

  const handleSubmit = useCallback(async () => {
    if (!hasError()) {
      const { email, password } = state;
      try {
        const { data, error } = (await login({ email, password })) as {
          data: LoginResponseData;
          error: ApiResponseError;
        };

        if (error) {
          showNotification("error", error?.data?.message);
          return;
        } else if (data.token) {
          setAppTokens(data);
          fetchUserProfile();
          showNotification("success", "Login Successfull");
        }
      } catch (error) {
        showNotification();
        removeAppTokens();
        console.error("Login failed:", error);
      }
    }
  }, [fetchUserProfile, hasError, login, state]);

  if (isAuthenticated()) {
    const pathname = location.state?.from;

    const redirectTo = pathname?.search
      ? pathname?.pathname + pathname?.search
      : pathname?.pathname;

    if (pathname?.pathname) {
      return <Navigate to={redirectTo} replace />;
    } else {
      return (
        <Navigate
          to={routes.DASHBOARD}
          state={{ autoNavigate: true }}
          replace
        />
      );
    }
  }

  return (
    <div className="loginContainer">
      <div className="logo-container pointer bg-slate-500 ">
        <img src={appLogo} alt="Stock Inventory" className="w-[180px] h-40" />
      </div>

      <div className="container-step-1">
        <Row className="input-container mb20">
          <label>Email</label>
          <Input
            className="w-full"
            placeholder="Enter your email address"
            size="large"
            onChange={handleChange("email")}
            value={state?.email}
            disabled={isLoading}
          />
          <Row className="error">{error?.email}</Row>
        </Row>

        <Row className="input-container mt-5">
          <Col span={24}>
            <Row justify="space-between">
              <label>Password</label>
            </Row>
          </Col>
          <Input.Password
            className="w-full"
            size="large"
            placeholder="Password"
            onChange={handleChange("password")}
            value={state?.password}
            disabled={isLoading}
          />

          <Row className="error">{error?.password}</Row>
        </Row>

        {/* Buttons Container Start */}
        <Button
          type="primary"
          block
          onClick={handleSubmit}
          loading={isLoading}
          size="large"
          className="signup-btn mt-5"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginContainer;
