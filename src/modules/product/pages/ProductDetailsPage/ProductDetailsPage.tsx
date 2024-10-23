import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  message,
  Spin,
  Button,
  Tabs,
  Row,
  Col,
  Card,
  Descriptions,
  Alert,
} from "antd";
import {
  ArrowLeftOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useGetProductByIdQuery,
  useGetSubjectListByProductIdQuery,
  useStartTestMutation,
} from "modules/product/redux/api";
import { useLazyGetAuthUserQuery } from "modules/user/redux/slices/api";
import { useTypedSelector } from "hooks/useTypedSelector";
import styles from "./ProductDetailsPage.module.scss";
import StartedTestForm from "modules/product/components/StartedTestForm/StartedTestForm";
import { ModalNotEnoughBalance } from "modules/product/components/ModalNotEnoughBalance/ModalNotEnoughBalance";
import { CustomCheckbox } from "components/CustomCheckbox/CustomCheckbox";
import Paragraph from "antd/es/typography/Paragraph";
import cn from "classnames";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useTypedSelector((state) => state.auth);

  const { data: product, isLoading: isProductLoading } =
    useGetProductByIdQuery(id);
  const { data: subjectList, isLoading: isSubjectListLoading } =
    useGetSubjectListByProductIdQuery(product?.id);
  const [getAuthUser] = useLazyGetAuthUserQuery();
  const [startTest] = useStartTestMutation();

  const [selectedRequiredSubjects, setSelectedRequiredSubjects] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedSubjects, setSelectedSubjects] = useState<{
    [key: string]: boolean;
  }>({});
  const [testIsStarted, setTestIsStarted] = useState<boolean>(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState<
    { testTitle: string; questionNumber: number; questionId: string }[]
  >([]);
  const [isFinishTestModalOpen, setIsFinishTestModalOpen] = useState(false);
  const [isNotEnoughBalanceModalOpen, setIsNotEnoughBalanceModalOpen] =
    useState(false);

  const selectedCount = Object.values(selectedSubjects).filter(Boolean).length;

  console.log("selectedSubjects", selectedSubjects);

  const MAX_SELECTION = product?.subject_limit;

  const handleStart = async () => {
    if (!product || !user) {
      message.error("Продукт или данные пользователя не загружены");
      return;
    }

    if (parseFloat(user.balance) < product.sum) {
      setIsNotEnoughBalanceModalOpen(true);
      return;
    }

    const requiredTestIds = Object.keys(selectedRequiredSubjects).filter(
      (key) => selectedRequiredSubjects[key]
    );
    const selectedTestIds = Object.keys(selectedSubjects).filter(
      (key) => selectedSubjects[key]
    );

    const tests_ids = [...requiredTestIds, ...selectedTestIds];

    if (selectedCount !== MAX_SELECTION) {
      message.error(`Вы должны выбрать ${MAX_SELECTION} предметов.`);
      return;
    }

    try {
      const response = await startTest({
        product_id: id || "",
        tests_ids,
      }).unwrap();

      if (response) {
        const authResponse = await getAuthUser().unwrap();

        if (authResponse) {
          message.success("Тест успешно запущен");

          localStorage.setItem("test", JSON.stringify(response.tests));
          localStorage.setItem("product_id", id || "");
          localStorage.setItem(
            "testIsStarted",
            JSON.stringify(authResponse.test_is_started)
          );

          if (response.time) {
            localStorage.setItem("testTime", JSON.stringify(response.time));
            message.success("Время теста успешно сохранено.");
          }

          setTestIsStarted(authResponse.test_is_started);
          window.location.reload();
        } else {
          message.error("Не удалось получить данные пользователя.");
        }
      } else {
        message.error("Не удалось запустить тест.");
      }
    } catch (error) {
      message.error("Ошибка при запуске теста.");
      console.error("Ошибка запуска теста:", error);
    }
  };

  const handleOpenFinistTestModal = () => {
    setIsFinishTestModalOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCheckboxChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        selectedCount >= (MAX_SELECTION ? MAX_SELECTION : 1) &&
        !selectedSubjects[id]
      ) {
        message.warning(
          `Вы не можете выбрать более ${MAX_SELECTION} дополнительных предметов.`
        );
      } else {
        setSelectedSubjects({
          ...selectedSubjects,
          [id]: e.target.checked,
        });
      }
    };

  useEffect(() => {
    if (subjectList) {
      const requiredSubjects = subjectList
        .filter((subject) => subject.is_required)
        .reduce((acc, subject) => {
          acc[subject.id] = true;
          return acc;
        }, {} as { [key: string]: boolean });

      setSelectedRequiredSubjects(requiredSubjects);
    }
  }, [subjectList]);

  useEffect(() => {
    const testStarted = localStorage.getItem("testIsStarted");
    if (testStarted) {
      setTestIsStarted(JSON.parse(testStarted));
    }
  }, []);

  if (isProductLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className={cn(testIsStarted ? "" : styles.body)}
      style={{ padding: testIsStarted ? 20 : 40 }}
    >
      <Card className={styles.container}>
        <h2 className={styles.title}>{product?.title}</h2>
        {testIsStarted ? (
          ""
        ) : (
          <>
            <Paragraph
              className={styles.description}
              ellipsis={{ rows: 3, expandable: true, symbol: "Развернуть" }}
            >
              {product?.description}
            </Paragraph>

            <Descriptions bordered column={1} className={styles.details}>
              <Descriptions.Item
                label={
                  <span className={styles.label}>
                    <DollarOutlined className={styles.icon} /> Стоимость
                  </span>
                }
              >
                <span className={styles.value}>{product?.sum} тенге</span>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className={styles.label}>
                    <ClockCircleOutlined className={styles.icon} /> Время на
                    тест
                  </span>
                }
              >
                <span className={styles.value}>{product?.time} минут</span>
              </Descriptions.Item>
            </Descriptions>

            <Alert
              message={`Выберите ${MAX_SELECTION} дополнительных предметов.`}
              type="warning"
              showIcon
              icon={<ExclamationCircleOutlined />}
              className={styles.selectionInfo}
            />
          </>
        )}

        <div>
          {testIsStarted ? (
            <StartedTestForm
              productTitle={product?.title}
              handleOpenFinistTestModal={handleOpenFinistTestModal}
              unansweredQuestions={unansweredQuestions}
              setUnansweredQuestions={setUnansweredQuestions}
              isFinishTestModalOpen={isFinishTestModalOpen}
              setIsFinishTestModalOpen={setIsFinishTestModalOpen}
            />
          ) : (
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={
                  <h3 className={styles.tab__title}>
                    <AppstoreOutlined />
                    Обязательные предметы
                  </h3>
                }
                key="1"
              >
                <Row gutter={[16, 16]}>
                  {subjectList
                    ?.filter((subject) => subject.is_required)
                    .map((subject) => (
                      <Col span={24} key={subject.id}>
                        <CustomCheckbox
                          checked={subject.is_required}
                          title={subject.title}
                          onChange={handleCheckboxChange(subject.id)}
                          disabled
                        />
                      </Col>
                    ))}
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane
                tab={
                  <h3 className={styles.tab__title}>
                    <PlusCircleOutlined />
                    Дополнительные предметы
                  </h3>
                }
                key="2"
              >
                <Row gutter={[16, 16]}>
                  {subjectList
                    ?.filter((subject) => !subject.is_required)
                    .map((subject) => (
                      <Col span={24} key={subject.id}>
                        <CustomCheckbox
                          checked={selectedSubjects[subject.id]}
                          title={subject.title}
                          onChange={handleCheckboxChange(subject.id)}
                        />
                      </Col>
                    ))}
                </Row>
              </Tabs.TabPane>
            </Tabs>
          )}

          {testIsStarted ? (
            ""
          ) : (
            <div className={styles.actions}>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                className={styles.backButton}
              >
                Назад
              </Button>
              <Button
                type="primary"
                onClick={handleStart}
                disabled={selectedCount !== MAX_SELECTION}
                loading={isProductLoading || isSubjectListLoading}
              >
                Начать
              </Button>
            </div>
          )}
        </div>
      </Card>
      <ModalNotEnoughBalance
        isOpen={isNotEnoughBalanceModalOpen}
        setOpen={setIsNotEnoughBalanceModalOpen}
        balance={user?.balance || 0}
      />
    </div>
  );
};

export default ProductDetailsPage;
