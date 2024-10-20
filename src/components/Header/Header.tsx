import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Dropdown, Menu, Skeleton, Avatar, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Logo from "../logo/Logo";
import { useTypedSelector } from "hooks/useTypedSelector";
import { authActions } from "modules/auth/redux/slices/authSlice";
import { useLazyGetAuthUserQuery } from "modules/user/redux/slices/api";
import Navbar from "components/Navbar/Navbar";
import styles from "./Header.module.scss"; // Подключаем стили через CSS-модули

const { Header: AntHeader } = Layout;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useTypedSelector((state) => state.auth);

  const [getAuthUser, { data: user, isLoading: isUserLoading }] =
    useLazyGetAuthUserQuery();

  useEffect(() => {
    if (token) {
      getAuthUser();
    }
  }, [token, getAuthUser]);

  const handleLogout = async () => {
    await dispatch(authActions.logOut());
    navigate("/home");
    message.success("Вы успешно вышли!");
    getAuthUser();
  };

  const menu = (
    <Menu theme="dark" mode="horizontal">
      {token ? (
        <>
          <Menu.Item key="profile" icon={<SettingOutlined />}>
            <Link to="/profile">Профиль</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Выйти
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" icon={<LoginOutlined />}>
            <Link to="/login">Войти</Link>
          </Menu.Item>
          <Menu.Item key="signup" icon={<UserAddOutlined />}>
            <Link to="/signup">Регистрация</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <AntHeader className={styles.header} style={{ color: "#fff" }}>
      <Logo />
      {token && <Navbar />}
      <div className={styles.menuWrapper}>
        <Dropdown overlay={menu} trigger={["click", "hover"]}>
          <div className={styles.profileIcon}>
            {isUserLoading ? (
              <Skeleton.Avatar active={true} size="large" />
            ) : (
              <Avatar
                size="large"
                icon={<UserOutlined />}
                className={styles.avatar}
              />
            )}
            <span className={styles.userName}>
              {isUserLoading ? (
                <Skeleton.Input
                  active={true}
                  className={styles.skeleton}
                  size="small"
                  style={{ width: 100 }}
                />
              ) : user ? (
                `${user.first_name} ${user.last_name}`
              ) : (
                "Гость"
              )}
            </span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
