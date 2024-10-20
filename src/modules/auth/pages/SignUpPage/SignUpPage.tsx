import { Link } from "react-router-dom";
import { useSignUpMutation } from "modules/auth/redux/api";
import { Form, Input, Button, message, Typography } from "antd";
import { useDispatch } from "react-redux";
import { authActions } from "modules/auth/redux/slices/authSlice";
import styles from "./SignUpPage.module.scss";

const { Title } = Typography;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();

  const onFinish = async (values: any) => {
    if (values.password !== values.password2) {
      message.error("Пароли не совпадают!");
      return;
    }

    try {
      const response = await signUp(values);
      // @ts-ignore
      const { access: token, refresh: refreshToken } = response.data;

      dispatch(authActions.setToken({ token, refreshToken }));
      message.success("Регистрация успешна! Пожалуйста, войдите в систему.");
    } catch (error) {
      message.error(
        "Ошибка регистрации. Пожалуйста, проверьте введенные данные."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <Title level={2} className={styles.title}>
          Создать аккаунт
        </Title>
        <div className={styles.formWrapper}>
          <Form
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            className={styles.form}
          >
            <Form.Item
              name="username"
              label="Логин / ИИН"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите логин / ИИН!",
                },
              ]}
            >
              <Input placeholder="Введите логин / ИИН" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Почта"
              rules={[
                { required: true, message: "Пожалуйста, введите почту!" },
                { type: "email", message: "Введите корректный email!" },
              ]}
            >
              <Input placeholder="example@gmail.com" size="large" />
            </Form.Item>

            <Form.Item
              name="first_name"
              label="Имя"
              rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
            >
              <Input placeholder="Введите имя" size="large" />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Фамилия"
              rules={[
                { required: true, message: "Пожалуйста, введите фамилию!" },
              ]}
            >
              <Input placeholder="Введите фамилию" size="large" />
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

            <Form.Item
              name="password2"
              label="Подтвердите пароль"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, подтвердите пароль!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Введите пароль повторно"
                size="large"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? "Регистрация..." : "Создать аккаунт"}
            </Button>
          </Form>

          <div className={styles.loginLink}>
            Уже есть аккаунт? &nbsp;
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
