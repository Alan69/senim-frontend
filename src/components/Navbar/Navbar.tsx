import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const menuItems = [
    { label: "Тесты", link: "/product/list" },
    {
      label: "Результаты тестов",
      link: "/completed-test/list",
    },
  ];

  return (
    <div className={styles.navbar}>
      <Menu mode="horizontal" className={styles.menu}>
        {menuItems.map((item) => (
          <Menu.Item key={item.link} className={styles.menu__item}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
