import React, { useState, useEffect } from "react";
import { Tabs, Form, Input, Button, message, Layout, Spin } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  TUser,
  useChangePasswordMutation,
  useGetAuthUserQuery,
  useUpdateUserProfileMutation,
} from "modules/user/redux/slices/api";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("personal-info");

  const { data: user, isLoading: isUserLoading } = useGetAuthUserQuery();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (location.pathname.includes("personal-info")) {
      setSelectedMenu("personal-info");
    } else if (location.pathname.includes("update-password")) {
      setSelectedMenu("update-password");
    }
  }, [location.pathname]);

  const handleProfileUpdate = async (values: TUser) => {
    try {
      await updateUserProfile(values).unwrap();
      message.success("Профиль успешно обновлен!");
    } catch (error: any) {
      message.error(error.data.detail);
    }
  };

  const handlePasswordChange = async (values: any) => {
    if (values.new_password !== values.new_password2) {
      message.error("Пароли не совпадают!");
      return;
    }
    try {
      await changePassword(values).unwrap();
      message.success("Пароль успешно изменен!");
    } catch (error: any) {
      message.error(error.data.detail);
    }
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "personal-info":
        navigate("/profile/personal-info");
        break;
      case "update-password":
        navigate("/profile/update-password");
        break;
      default:
        navigate("/profile");
        break;
    }
  };

  const renderContent = () => {
    if (!user)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 128 }} spin />}
          />
        </div>
      );

    switch (selectedMenu) {
      case "personal-info":
        return (
          <Form
            layout="vertical"
            onFinish={handleProfileUpdate}
            initialValues={{
              username: user.username,
              first_name: user.first_name,
              last_name: user.last_name,
              phone_number: user.phone_number,
              email: user.email,
              region: user.region,
              school: user.school,
            }}
          >
            <Form.Item label="ИИН" name="username">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item label="Имя" name="first_name">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item label="Фамилия" name="last_name">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item label="Почта" name="email">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item label="Телефон" name="phone_number">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item label="Регион" name="region">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item label="Учреждение" name="school">
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Сохранить изменения
            </Button>
          </Form>
        );
      case "update-password":
        return (
          <Form layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="Старый пароль"
              name="current_password"
              rules={[{ required: true, message: "Введите текущий пароль" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Новый пароль"
              name="new_password"
              rules={[{ required: true, message: "Введите новый пароль" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Подтвердите новый пароль"
              name="new_password2"
              rules={[{ required: true, message: "Подтвердите новый пароль" }]}
            >
              <Input.Password />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isChangingPassword}
            >
              Изменить пароль
            </Button>
          </Form>
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      style={{
        padding: "24px",
        minHeight: "750px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Tabs
        centered
        activeKey={selectedMenu}
        onChange={(key) => {
          setSelectedMenu(key);
          handleMenuClick(key);
        }}
        tabBarStyle={{
          fontWeight: "bold",
        }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <UserOutlined /> Мой профиль
            </span>
          }
          key="personal-info"
        />
        <Tabs.TabPane
          tab={
            <span>
              <LockOutlined /> Изменить пароль
            </span>
          }
          key="update-password"
        />
      </Tabs>

      <Content
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default ProfilePage;
