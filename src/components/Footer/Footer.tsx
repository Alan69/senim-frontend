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
        backgroundColor: "#2b3a42",
      }}
    >
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: "#4cadd5" }}>
            Sapa Test
          </Title>
          <Text style={{ color: "#ffffff" }}>
            <EnvironmentOutlined
              style={{ color: "#4cadd5", marginRight: "8px" }}
            />
            Шымкент қаласы, Нұрсат молтек ауданы
          </Text>
          <br />
          <Text style={{ color: "#ffffff" }}>
            <PhoneOutlined style={{ color: "#4cadd5", marginRight: "8px" }} />
            +7 (771) 541-43-25
          </Text>
          <br />
          <Text style={{ color: "#ffffff" }}>
            <MailOutlined style={{ color: "#4cadd5", marginRight: "8px" }} />
            sapatestinfo@gmail.com
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
            to="/completed-test/list"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Результаты тестов
          </Link>
          <br />
          <Link
            to="/product/list"
            style={{
              color: "#ffffff",
              backgroundColor: "#000000",
              padding: "10px 20px",
              borderRadius: "5px",
              display: "inline-block",
              marginBottom: "8px",
            }}
          >
            Тесты
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
            © {new Date().getFullYear()} Sapa Test. Все права защищены.
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
