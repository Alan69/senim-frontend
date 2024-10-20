import { Layout, Row, Col, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
  return (
    <AntFooter
      style={{
        padding: "60px 40px",
        color: "#ffffff",
        backgroundColor: "#2b3a42", // Добавлен цвет фона для контраста
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#4cadd5" }}>
            Senim Test
          </Title>
          <Text style={{ color: "#ffffff" }}>
            <EnvironmentOutlined
              style={{ color: "#4cadd5", marginRight: "8px" }}
            />
            ул. Тест, 123, Тараз
          </Text>
          <br />
          <Text style={{ color: "#ffffff" }}>
            <PhoneOutlined style={{ color: "#4cadd5", marginRight: "8px" }} />
            +7 777 777 7777
          </Text>
          <br />
          <Text style={{ color: "#ffffff" }}>
            <MailOutlined style={{ color: "#4cadd5", marginRight: "8px" }} />
            info@senimtest.ru
          </Text>
        </Col>

        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#ffffff" }}>
            Популярные ссылки
          </Title>
          <Link
            to="/"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Главная
          </Link>
          <br />
          <Link
            to="/contact"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Контакты
          </Link>
        </Col>

        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#ffffff" }}>
            Другие страницы
          </Title>
          <Link
            to="/signup"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Регистрация
          </Link>
          <br />
          <Link
            to="/login"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Вход
          </Link>
          <br />
          <Link
            to="/reset-password"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            Восстановление пароля
          </Link>
        </Col>
      </Row>

      <Row style={{ marginTop: "40px", textAlign: "center" }}>
        <Col span={24}>
          <Text style={{ color: "#888" }}>
            © {new Date().getFullYear()} Senim Test. Все права защищены.
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
