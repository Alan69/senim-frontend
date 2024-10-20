import { Form, Input, Button, Typography, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./ResetPasswordPage.module.scss";

const { Title } = Typography;

const ResetPasswordPage = () => {
  const onFinish = (values: any) => {
    message.success("Пароль успешно изменен!");
    // Логика отправки данных для сброса пароля
  };

  return (
    <div className={styles.container}>
      <div className={styles.resetBox}>
        <Title level={2} className={styles.title}>
          Сброс пароля
        </Title>
        <div className={styles.formWrapper}>
          <Form layout="vertical" onFinish={onFinish} className={styles.form}>
            <Form.Item
              label="Электронная почта"
              name="email"
              rules={[
                { required: true, message: "Пожалуйста, введите вашу почту!" },
                { type: "email", message: "Введите корректный email!" },
              ]}
            >
              <Input placeholder="example@gmail.com" size="large" />
            </Form.Item>

            <Form.Item
              label="Новый пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
              ]}
            >
              <Input.Password placeholder="Введите новый пароль" size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className={styles.submitButton}
            >
              Изменить пароль
            </Button>
          </Form>

          <p className={styles.footerText}>
            Если вы не запрашивали сброс пароля, проигнорируйте это сообщение.
          </p>

          <p className={styles.loginLink}>
            Уже есть аккаунт? &nbsp;
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
