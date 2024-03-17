import React, { useMemo } from "react";
import "./Assets/scss/App.scss";
import RenderRouter from "Routes/RenderRouter";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "Services/store";

const App: React.FC = () => {
  const theme = useMemo(
    () => ({
      primaryColor: "#151719",
    }),
    [],
  );
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.primaryColor,
            fontFamily: "var(--font-family)",
            colorBgMask: "var(--colorBgMask)",
          },
          components: {
            Layout: {
              headerBg: "var(--primary)",
              headerPadding: 0,
              headerColor: "var(--white)",
            },
          },
        }}
      >
        <RenderRouter />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
