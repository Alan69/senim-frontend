import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Form, Input, Button, message, Layout, Spin, Select } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import InputMask from "react-input-mask";
import {
  TUser,
  useChangePasswordMutation,
  useGetAuthUserQuery,
  useUpdateUserProfileMutation,
} from "modules/user/redux/slices/api";
import { useGetRegionListQuery } from "../../../redux/api/regionsApi";

const { Content } = Layout;
const { Option } = Select;

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("personal-info");

  const { data: user, isLoading: isUserLoading } = useGetAuthUserQuery();
  const { data: regions, isLoading: isRegionsLoading } =
    useGetRegionListQuery();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const handleProfileUpdate = async (values: TUser) => {
    // const phoneNumber = values.phone_number.replace(/\D/g, "");

    try {
      await updateUserProfile({
        ...values,
        // @ts-ignore
        region: values.region.id,
      }).unwrap();
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
              region: user.region,
              school: user.school,
            }}
          >
            <Form.Item
              label="ИИН"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите ИИН!",
                },
                {
                  pattern: /^\d{12}$/,
                  message: "ИИН должен состоять из 12 цифр!",
                },
              ]}
            >
              <Input disabled={isUserLoading} maxLength={12} />
            </Form.Item>
            <Form.Item
              label="Имя"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя!",
                },
              ]}
            >
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Form.Item
              label="Фамилия"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите фамилию!",
                },
              ]}
            >
              <Input disabled={isUserLoading} />
            </Form.Item>

            <Form.Item
              label="Регион"
              name="region"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите регион!",
                },
              ]}
            >
              <Select
                placeholder="Выберите регион"
                loading={isRegionsLoading}
                disabled={isUserLoading}
              >
                {regions?.map((region) => (
                  <Option key={region.id} value={region.id}>
                    {region.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Учреждение"
              name="school"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите учреждение!",
                },
              ]}
            >
              <Input disabled={isUserLoading} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdating}
              disabled={isUserLoading}
            >
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

  useEffect(() => {
    if (location.pathname.includes("personal-info")) {
      setSelectedMenu("personal-info");
    } else if (location.pathname.includes("update-password")) {
      setSelectedMenu("update-password");
    }
  }, [location.pathname]);

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
