import { Link } from "react-router-dom";
import { useSignUpMutation } from "modules/auth/redux/api";
import { Form, Input, Button, message, Typography, Select, Radio } from "antd";
import { useDispatch } from "react-redux";
import { authActions } from "modules/auth/redux/slices/authSlice";
import styles from "./SignUpPage.module.scss";
import { useGetRegionListQuery } from "../../../../redux/api/regionsApi";
import InputMask from "react-input-mask";
import { useState } from "react";

const { Option } = Select;

const { Title } = Typography;

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [userType, setUserType] = useState("STUDENT");

  const { data: regions, isLoading: isRegionsLoading } =
    useGetRegionListQuery();

  const onFinish = async (values: any) => {
    if (values.password !== values.password2) {
      message.error("Пароли не совпадают!");
      return;
    }

    // Validate that students select a grade
    if (values.user_type === "STUDENT" && !values.grade) {
      message.error("Ученики должны выбрать класс!");
      return;
    }

    try {
      const response = await signUp({
        ...values,
        region: values.region,
        user_type: values.user_type,
        grade: values.user_type === "STUDENT" ? values.grade : null,
      });
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

  const handleUserTypeChange = (e: any) => {
    setUserType(e.target.value);
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
            initialValues={{ user_type: "STUDENT" }}
          >
            <Form.Item
              name="user_type"
              label="Тип пользователя"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите тип пользователя!",
                },
              ]}
            >
              <Radio.Group onChange={handleUserTypeChange}>
                <Radio value="STUDENT">Ученик</Radio>
                <Radio value="TEACHER">Учитель</Radio>
              </Radio.Group>
            </Form.Item>

            {userType === "STUDENT" && (
              <Form.Item
                name="grade"
                label="Класс"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста, выберите класс!",
                  },
                ]}
              >
                <Select placeholder="Выберите класс">
                  <Option value="4">4 класс</Option>
                  <Option value="9">9 класс</Option>
                  <Option value="11">11 класс</Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item
              name="username"
              label="ИИН"
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
              <Input placeholder="Введите ИИН" size="large" maxLength={12} />
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
              name="region"
              label="Регион"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите регион!",
                },
              ]}
            >
              <Select placeholder="Выберите регион" loading={isRegionsLoading}>
                {regions?.map((region) => (
                  <Option key={region.id} value={region.id}>
                    {region.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="school"
              label="Школа"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите школу!",
                },
              ]}
            >
              <Input placeholder="Введите школу" className="rounded-[10px]" />
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
