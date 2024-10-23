import React from "react";
import { Button, Modal, Typography, Tabs } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./ModalFinishTest.module.scss";

type TProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  unansweredQuestions: {
    testTitle: string;
    questionNumber: number;
    questionId: string;
  }[];
  handleCompleteTest: () => Promise<void>;
  isCompleting: boolean;
};

export const ModalFinishTest = ({
  isOpen,
  setOpen,
  unansweredQuestions,
  handleCompleteTest,
  isCompleting,
}: TProps) => {
  const handleCancel = () => {
    setOpen(false);
  };

  // Группировка вопросов по предметам
  const groupedQuestions = unansweredQuestions.reduce((acc, question) => {
    if (!acc[question.testTitle]) {
      acc[question.testTitle] = [];
    }
    acc[question.testTitle].push(question);
    return acc;
  }, {} as Record<string, { testTitle: string; questionNumber: number; questionId: string }[]>);

  const tabItems = Object.entries(groupedQuestions).map(
    ([subject, questions], index) => ({
      key: subject,
      label: subject,
      children: (
        <ul className={styles.questionList}>
          {questions.map((item, idx) => (
            <li key={idx} className={styles.questionItem}>
              Вопрос {item.questionNumber}
            </li>
          ))}
        </ul>
      ),
    })
  );

  return (
    <Modal
      open={isOpen}
      title={
        <Typography.Title level={3} className={styles.title}>
          <ExclamationCircleFilled className={styles.iconWarning} /> Подтвердите
          завершение теста
        </Typography.Title>
      }
      onCancel={handleCancel}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          disabled={isCompleting}
          className={styles.cancelButton}
        >
          Закрыть
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isCompleting}
          onClick={() => {
            handleCompleteTest();
          }}
          className={styles.submitButton}
        >
          Завершить
        </Button>,
      ]}
      width={700}
    >
      {unansweredQuestions.length > 0 && (
        <div className={styles.unansweredQuestions}>
          <Typography.Title level={4} className={styles.subtitle}>
            Внимание! У вас неотвеченных вопросов:{" "}
            <span className={styles.unansweredCount}>
              {unansweredQuestions.length}
            </span>
          </Typography.Title>

          <Tabs
            defaultActiveKey={tabItems[0]?.key}
            type="line"
            className={styles.tabs}
          >
            {tabItems.map((tab) => (
              <Tabs.TabPane tab={tab.label} key={tab.key}>
                {tab.children}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      )}
    </Modal>
  );
};
