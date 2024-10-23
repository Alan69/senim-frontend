import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "modules/auth/redux/api";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message, Typography } from "antd";
import { authActions } from "modules/auth/redux/slices/authSlice";
import styles from "./LoginPage.module.scss";

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const response = await login(values);

      // @ts-ignore
      const { access: token, refresh: refreshToken } = response.data;

      dispatch(authActions.setToken({ token, refreshToken }));
      navigate("/product/list");
      message.success("Авторизация прошла успешно!");
    } catch (error) {
      message.error(
        "Вход в систему не удался. Пожалуйста, проверьте свои учетные данные."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <Title level={1} className={styles.title}>
          Добро пожаловать
        </Title>
        <div className={styles.formWrapper}>
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className={styles.form}
          >
            <Form.Item
              name="username"
              label="ИИН"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите ИИН!",
                },
                // {
                //   pattern: /^\d{12}$/,
                //   message: "ИИН должен состоять из 12 цифр!",
                // },
              ]}
            >
              <Input placeholder="Введите ИИН" size="large" maxLength={12} />
            </Form.Item>

            <Form.Item
              name="password"
              label="Пароль"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
              ]}
            >
              <Input.Password placeholder="Введите пароль" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isLoading}
                className={styles.submitButton}
              >
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </Form.Item>

            <div className={styles.linksWrapper}>
              <Link to="/reset-password" className={styles.link}>
                Забыли пароль?
              </Link>
            </div>
          </Form>

          <div className={styles.signupWrapper}>
            Нет аккаунта? &nbsp;
            <Link to="/signup" className={styles.link}>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
