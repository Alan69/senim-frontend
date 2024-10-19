import React from 'react';
import { Button, Modal, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import cn from 'classnames';
import styles from './ModalWorkOnErrors.module.scss';
import { TCompletedQuestion } from 'modules/competed-test/redux/api';

type TProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedQuestion: TCompletedQuestion | null
  subjectTitle: string
}

export const ModalWorkOnErrors = ({
  isOpen,
  setIsOpen,
  selectedQuestion,
  subjectTitle
}: TProps) => {
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      title={<Typography.Title level={1}>Работа над ошибками</Typography.Title>}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Закрыть
        </Button>,
      ]}
      width={800}
    >
      {selectedQuestion && (
        <div className={styles.questionContent}>
          <Typography.Title level={2}>
            Предмет - {subjectTitle}
          </Typography.Title>
          <Typography.Title level={4}>
            Вопрос - {selectedQuestion.question_text}
          </Typography.Title>

          {
            selectedQuestion.selected_option === null ?
              <Typography.Title level={5}>
                Вы не выбрали вариант ответа!
              </Typography.Title> :
              ''
          }

          <div className={styles.options}>
            {selectedQuestion.all_options.map((option) => {
              const isSelected = selectedQuestion.selected_option?.id === option.id;
              const isCorrect = option.is_correct;

              return (
                <div
                  key={option.id}
                  className={cn(
                    styles.option,
                    isSelected ? styles.selectedOption : '',
                    isCorrect ? styles.option__correct : styles.option__inCorrect,
                    isSelected && isCorrect ? styles.option__correctNSelected : ''
                  )}
                >
                  <span className={styles.optionLabel}>
                    {isCorrect ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  </span>
                  <span>{option.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Modal>
  );
};
