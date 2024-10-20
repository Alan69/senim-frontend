import { Spin, Layout } from "antd";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

const { Content } = Layout;

export const UnauthorisedLayout = () => {
  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: "24px",
          paddingTop: "64px",
          minHeight: "100vh",
          backgroundColor: "#F0F2F5",
        }}
      >
        <Suspense fallback={<Spin size="large" />}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer />
    </Layout>
  );
};

export default UnauthorisedLayout;
