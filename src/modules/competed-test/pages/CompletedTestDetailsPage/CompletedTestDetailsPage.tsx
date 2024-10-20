import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Progress, Tabs, Tooltip, Card, Row, Col } from "antd";
import {
  InfoCircleOutlined,
  FileSearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { format, differenceInMilliseconds } from "date-fns";
import { ru } from "date-fns/locale";
import { useLazyGetAuthUserQuery } from "modules/user/redux/slices/api";
import { useGetCompletedTestByIdQuery } from "modules/competed-test/redux/api";
import TabPane from "antd/es/tabs/TabPane";

const { Title, Text } = Typography;

export const CompletedTestDetailsPage = () => {
  const { id } = useParams();
  const [getAuthUser] = useLazyGetAuthUserQuery();
  const { data } = useGetCompletedTestByIdQuery(id);

  const formatTimeDifference = (startTime: string, endTime: string) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const difference = differenceInMilliseconds(endDate, startDate);
    const totalSeconds = Math.floor(difference / 1000);
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    return `${hours} часа ${minutes} минут ${seconds} секунд`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy, HH:mm", { locale: ru });
  };

  const startTime = data?.start_test_time
    ? formatDate(data.start_test_time)
    : "-";

  const finishTime = data?.completed_date
    ? formatDate(data.completed_date)
    : "-";

  const durationFormatted = formatTimeDifference(
    // @ts-ignore
    data?.start_test_time,
    data?.completed_date
  );

  const correctAnswers = data?.product?.total_correct_by_all_tests || 0;
  const inCorrectAnswers = data?.product?.total_incorrect_by_all_tests || 0;
  const totalQuestions = data?.product?.total_question_count_by_all_tests || 0;

  const percentageCorrectAnswers =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const percentageInCorrectAnswers =
    totalQuestions > 0 ? (inCorrectAnswers / totalQuestions) * 100 : 0;

  const twoColors = {
    "0%": "#3498db",
    "100%": "#3498db",
  };

  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <Title level={1} style={{ textAlign: "center", color: "#3498db" }}>
        Результаты теста - {data?.product.title}
      </Title>

      <Tabs centered defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <InfoCircleOutlined /> Общая информация
            </span>
          }
          key="1"
        >
          <Card
            bordered={false}
            style={{
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
              <Col span={24}>
                <Card
                  bordered={false}
                  style={{
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Title
                    level={2}
                    style={{
                      color: "#1890ff",
                      marginBottom: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Общая информация
                  </Title>
                  <div style={{ lineHeight: "1.6", fontSize: "16px" }}>
                    {" "}
                    <Text strong style={{ fontSize: "16px" }}>
                      Имя-фамилия:
                    </Text>
                    <Text style={{ fontSize: "16px", marginLeft: "8px" }}>
                      {data?.user}
                    </Text>{" "}
                    <br />
                    <Text strong style={{ fontSize: "16px" }}>
                      Дата начала:
                    </Text>
                    <Text style={{ fontSize: "16px", marginLeft: "8px" }}>
                      {startTime}
                    </Text>
                    <br />
                    <Text strong style={{ fontSize: "16px" }}>
                      Дата завершения:
                    </Text>
                    <Text style={{ fontSize: "16px", marginLeft: "8px" }}>
                      {finishTime}
                    </Text>
                    <br />
                    <Text strong style={{ fontSize: "16px" }}>
                      Продолжительность:
                    </Text>
                    <Text style={{ fontSize: "16px", marginLeft: "8px" }}>
                      {durationFormatted || "-"}
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
              <Col span={12}>
                <Card
                  bordered={false}
                  style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    textAlign: "center",
                    padding: "20px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Title
                    level={4}
                    style={{ color: "#595959", marginBottom: "8px" }}
                  >
                    Общие количество вопросов
                  </Title>
                  <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
                    {totalQuestions}
                  </Title>
                </Card>
              </Col>

              <Col span={12}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card
                      bordered={false}
                      style={{
                        background: "#ffffff",
                        borderRadius: "8px",
                        textAlign: "center",
                        padding: "12px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Title
                        level={3}
                        style={{
                          color: "#52c41a",
                          margin: 0,
                          marginBottom: 12,
                        }}
                      >
                        Правильных
                      </Title>
                      <Tooltip title="Процент правильных ответов">
                        <Progress
                          type="circle"
                          percent={percentageCorrectAnswers}
                          strokeWidth={6}
                          strokeColor="#52c41a"
                          format={() => (
                            <span style={{ color: "#52c41a" }}>
                              {percentageCorrectAnswers.toFixed(0)}%
                            </span>
                          )}
                          size={100}
                        />
                      </Tooltip>
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "16px",
                        }}
                      >
                        {`${correctAnswers} баллов`}
                      </div>
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card
                      bordered={false}
                      style={{
                        background: "#ffffff",
                        borderRadius: "8px",
                        textAlign: "center",
                        padding: "12px",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Title
                        level={3}
                        style={{
                          color: "#f5222d",
                          margin: 0,
                          marginBottom: 12,
                        }}
                      >
                        Неправильных
                      </Title>
                      <Tooltip title="Процент неправильных ответов">
                        <Progress
                          type="circle"
                          percent={percentageInCorrectAnswers}
                          strokeWidth={6}
                          strokeColor="#f5222d"
                          format={() => (
                            <span style={{ color: "#f5222d" }}>
                              {percentageInCorrectAnswers.toFixed(0)}%
                            </span>
                          )}
                          size={100}
                        />
                      </Tooltip>
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "16px",
                        }}
                      >
                        {`${inCorrectAnswers} баллов`}
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card
                  bordered={false}
                  style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    width: "100%",
                  }}
                >
                  <Title level={4} style={{ color: "#1890ff" }}>
                    Успеваемость по предметам
                  </Title>
                  {data?.product.tests.map((el) => (
                    <Row
                      gutter={16}
                      key={el.id}
                      style={{ width: "100%", marginBottom: "12px" }}
                    >
                      <Col span={6}>
                        <Text>{el.title}</Text>
                      </Col>
                      <Col span={16}>
                        <Progress
                          percent={Number(
                            (
                              (el.total_correct_by_test / el.questions.length) *
                              100
                            ).toFixed(2)
                          )}
                          strokeColor={twoColors}
                          strokeWidth={8}
                        />
                      </Col>
                      <Col span={2} style={{ textAlign: "right" }}>
                        <Text>{`${el.total_correct_by_test} из ${el.questions.length}`}</Text>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
            </Row>
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              <FileSearchOutlined /> Работа над ошибками
            </span>
          }
          key="2"
        >
          <Card
            title={
              <Title level={4} style={{ color: "#1890ff" }}>
                Работа над ошибками
              </Title>
            }
            bordered={false}
            style={{
              background: "#f9f9f9",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Tabs defaultActiveKey="0" type="line" tabPosition="top">
              {data?.product.tests.map((el, index) => (
                <TabPane
                  tab={
                    <Text strong style={{ fontSize: "16px" }}>
                      {el.title}
                    </Text>
                  }
                  key={index}
                >
                  <Tabs defaultActiveKey="1" tabPosition="left">
                    {el.questions.map((question, idx) => (
                      <TabPane
                        tab={
                          <span>
                            Вопрос {idx + 1}
                            {question.selected_option ? (
                              question.selected_option.is_correct ? (
                                <CheckCircleOutlined
                                  style={{ color: "#52c41a", marginLeft: 8 }}
                                />
                              ) : (
                                <CloseCircleOutlined
                                  style={{ color: "#ff4d4f", marginLeft: 8 }}
                                />
                              )
                            ) : (
                              <CloseCircleOutlined
                                style={{ color: "#d9d9d9", marginLeft: 8 }}
                              />
                            )}
                          </span>
                        }
                        key={idx}
                      >
                        <Card
                          style={{
                            background: "#ffffff",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            marginBottom: "24px",
                          }}
                        >
                          <Title
                            level={4}
                            style={{ marginBottom: "16px", color: "#1890ff" }}
                          >
                            {question.question_text}
                          </Title>

                          {question.selected_option === null && (
                            <Title level={5} type="warning">
                              Вы не выбрали вариант ответа!
                            </Title>
                          )}

                          <Row gutter={[16, 16]}>
                            {question?.all_options?.length > 0 ? (
                              question.all_options.map((option) => {
                                const isSelected =
                                  question.selected_option?.id === option.id;
                                const isCorrect = option.is_correct;

                                return (
                                  <Col span={24} key={option.id}>
                                    <Card
                                      style={{
                                        border: isCorrect
                                          ? "1px solid #52c41a"
                                          : isSelected
                                          ? "1px solid #ff4d4f"
                                          : "1px solid #e0e0e0",
                                        backgroundColor: isCorrect
                                          ? "#e6ffed"
                                          : isSelected
                                          ? "#fff1f0"
                                          : "#f9f9f9",
                                        padding: "12px",
                                      }}
                                    >
                                      <Row align="middle">
                                        <Col flex="40px">
                                          {isCorrect ? (
                                            <CheckCircleOutlined
                                              style={{
                                                color: "#52c41a",
                                                fontSize: "18px",
                                              }}
                                            />
                                          ) : (
                                            <CloseCircleOutlined
                                              style={{
                                                color: "#ff4d4f",
                                                fontSize: "18px",
                                              }}
                                            />
                                          )}
                                        </Col>
                                        <Col flex="auto">
                                          <Text>{option.text}</Text>
                                        </Col>
                                      </Row>
                                    </Card>
                                  </Col>
                                );
                              })
                            ) : (
                              <Title level={5}>
                                Нет доступных вариантов ответа.
                              </Title>
                            )}
                          </Row>
                        </Card>
                      </TabPane>
                    ))}
                  </Tabs>
                </TabPane>
              ))}
            </Tabs>
          </Card>
        </Tabs.TabPane>

        {/* <Tabs.TabPane
          tab={
            <span>
              <FileSearchOutlined /> Работа над ошибками
            </span>
          }
          key="2"
        >
          <Card
            title={
              <Title level={4} style={{ color: "#1890ff" }}>
                Работа над ошибками
              </Title>
            }
            bordered={false}
            style={{
              background: "#f9f9f9",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Tabs defaultActiveKey="0">
              {data?.product.tests.map((el, index) => (
                <TabPane tab={el.title} key={index}>
                  <Tabs defaultActiveKey="1">
                    {el.questions.map((question, idx) => (
                      <TabPane tab={`Вопрос ${idx + 1}`} key={idx}>
                        <Typography.Title level={3}>
                          Предмет - {el.title}
                        </Typography.Title>
                        <Typography.Title level={4}>
                          Вопрос - {question.question_text}
                        </Typography.Title>

                        {question.selected_option === null && (
                          <Typography.Title level={5} type="warning">
                            Вы не выбрали вариант ответа!
                          </Typography.Title>
                        )}

                        <Row gutter={[16, 16]}>
                          {question?.all_options?.length > 0 ? (
                            question.all_options.map((option) => {
                              const isSelected =
                                question.selected_option?.id === option.id;
                              const isCorrect = option.is_correct;

                              return (
                                <Col span={24} key={option.id}>
                                  <Card
                                    style={{
                                      border: isCorrect
                                        ? "1px solid #52c41a"
                                        : isSelected
                                        ? "1px solid #ff4d4f"
                                        : "1px solid #e0e0e0",
                                      backgroundColor: isCorrect
                                        ? "#e6ffed"
                                        : isSelected
                                        ? "#fff1f0"
                                        : "#f9f9f9",
                                    }}
                                  >
                                    <Row align="middle">
                                      <Col flex="40px">
                                        {isCorrect ? (
                                          <CheckCircleOutlined
                                            style={{
                                              color: "#52c41a",
                                              fontSize: "18px",
                                            }}
                                          />
                                        ) : (
                                          <CloseCircleOutlined
                                            style={{
                                              color: "#ff4d4f",
                                              fontSize: "18px",
                                            }}
                                          />
                                        )}
                                      </Col>
                                      <Col flex="auto">
                                        <Typography.Text>
                                          {option.text}
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Card>
                                </Col>
                              );
                            })
                          ) : (
                            <Typography.Title level={5}>
                              Нет доступных вариантов ответа.
                            </Typography.Title>
                          )}
                        </Row>
                      </TabPane>
                    ))}
                  </Tabs>
                </TabPane>
              ))}
            </Tabs>
          </Card>
        </Tabs.TabPane> */}
      </Tabs>
    </div>
  );
};
