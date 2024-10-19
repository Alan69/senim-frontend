import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { differenceInMilliseconds } from 'date-fns';
import cn from 'classnames';
import { useLazyGetAuthUserQuery } from 'modules/user/redux/slices/api';
import { TCompletedQuestion, useGetCompletedTestByIdQuery } from 'modules/competed-test/redux/api';
import styles from './CompletedTestDetailsPage.module.scss';
import { Progress, ProgressProps, Tooltip } from 'antd';
import {
  SwapOutlined
} from '@ant-design/icons';
import { ModalWorkOnErrors } from 'modules/competed-test/components/ModalWorkOnErrors/ModalWorkOnErrors';

export const CompletedTestDetailsPage = () => {
  const { id } = useParams();
  const [getAuthUser] = useLazyGetAuthUserQuery();
  const { data } = useGetCompletedTestByIdQuery(id);

  const [isCorrectScore, setIsCorrectScore] = useState(true)
  const [isInCorrectScore, setIsInCorrectScore] = useState(true)
  const [isWorkOnErrorsModalOpen, setIsWorkOnErrorsModalOpen] = useState(false)

  const [selectedQuestion, setIsSelectedQuestion] = useState<TCompletedQuestion | null>(null)
  const [selectedQuestionSubjectTitle, setIsSelectedQuestionSubjectTitle] = useState<string>('')

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

  const startTime = data?.start_test_time ? data?.start_test_time : '';
  const finishTime = data?.finish_test_time ? data?.finish_test_time : '';

  const durationFormatted = formatTimeDifference(startTime, finishTime);

  const getGrade = (percentage: number) => {
    if (percentage >= 90) {
      return 5;
    } else if (percentage >= 70) {
      return 4;
    } else if (percentage >= 50) {
      return 3;
    } else {
      return 2;
    }
  };

  const correctAnswers = data?.product?.total_correct_by_all_tests || 0;
  const inCorrectAnswers = data?.product?.total_incorrect_by_all_tests || 0;
  const totalQuestions = data?.product?.total_question_count_by_all_tests || 0;
  const percentageCorrectAnswers = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  const percentageInCorrectAnswers = totalQuestions > 0 ? (inCorrectAnswers / totalQuestions) * 100 : 0;

  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#84C1EB',
    '100%': '#39C6B7',
  };

  const handleOpenModalWorkOnErrors = (question: TCompletedQuestion, subjectTitle: string, number: number) => {
    setIsSelectedQuestion(question);
    setIsSelectedQuestionSubjectTitle(subjectTitle);
    setIsWorkOnErrorsModalOpen(true);
  }

  useEffect(() => {
    getAuthUser();
  }, [getAuthUser]);

  return (
    <>
      <div className={styles.page}>
        <Title level={1}>Результаты теста - {data?.product.title}</Title>

        <div className={styles.body}>
          <div className={styles.scoreCards}>
            <div className={styles.scoreCards__item}>
              <span>Общие количество вопросов</span>
              <span>{totalQuestions}</span>
            </div>
            <div className={styles.scoreCards__item}>
              <span>Правильных</span>
              <Tooltip title={isCorrectScore ? 'Переключиться на проценты' : 'Переключиться на баллы'}>
                {isCorrectScore ?
                  <span className={styles.score} onClick={() => setIsCorrectScore(!isCorrectScore)}>{correctAnswers} баллов <SwapOutlined /></span>
                  :
                  <span className={styles.score} onClick={() => setIsCorrectScore(!isCorrectScore)}>{percentageCorrectAnswers.toFixed(0)}% <SwapOutlined /></span>
                }
              </Tooltip>
            </div>
            <div className={styles.scoreCards__item}>
              <span>Неправильных</span>
              <Tooltip title={isCorrectScore ? 'Переключиться на проценты' : 'Переключиться на баллы'}>
                {isInCorrectScore ?
                  <span className={styles.score} onClick={() => setIsInCorrectScore(!isInCorrectScore)}>{inCorrectAnswers} баллов <SwapOutlined /></span>
                  :
                  <span className={styles.score} onClick={() => setIsInCorrectScore(!isInCorrectScore)}>{percentageInCorrectAnswers.toFixed(0)}% <SwapOutlined /></span>
                }
              </Tooltip>
            </div>
          </div>

          <div className={styles.mainInfoCards}>
            <div className={styles.mainInfoCards__item}>
              <Title level={4}>Общая информация</Title>
              <div className={styles.mainInfoCards__item__row}>
                <div className={styles.mainInfoCards__item__label}>
                  Имя-фамилия
                </div>
                <div className={styles.mainInfoCards__item__value}>
                  {data?.user}
                </div>
              </div>
              <div className={styles.mainInfoCards__item__row}>
                <div className={styles.mainInfoCards__item__label}>
                  Дата начала
                </div>
                <div className={styles.mainInfoCards__item__value}>
                  {startTime || '-'}
                </div>
              </div>
              <div className={styles.mainInfoCards__item__row}>
                <div className={styles.mainInfoCards__item__label}>
                  Дата завершения
                </div>
                <div className={styles.mainInfoCards__item__value}>
                  {finishTime || '-'}
                </div>
              </div>
              <div className={styles.mainInfoCards__item__row}>
                <div className={styles.mainInfoCards__item__label}>
                  Продолжительность(мин)
                </div>
                <div className={styles.mainInfoCards__item__value}>
                  {durationFormatted || '-'}
                </div>
              </div>
            </div>

            <div className={styles.mainInfoCards__item}>
              <Title level={4}>Показатели успеха по предметам</Title>
              {
                data?.product.tests.map((el) => (
                  <div className={styles.mainInfoCards__item__row}>
                    <div className={cn(styles.mainInfoCards__item__label, styles.mainInfoCards__item__label__wFixed)}>
                      {el.title}
                    </div>
                    <Progress percent={Number(((el.total_correct_by_test / el.questions.length) * 100).toFixed(2))} strokeColor={twoColors} />
                    <div className={cn(styles.mainInfoCards__item__value, styles.mainInfoCards__item__value__wFixed)}>
                      {`${el.total_correct_by_test} из ${el.questions.length}`}
                    </div>
                  </div>
                ))
              }
            </div>

            <div className={styles.mainInfoCards__item}>
              <Title level={4}>Оценка по предметам</Title>
              {
                data?.product.tests.map((el) => (
                  <div className={styles.mainInfoCards__item__row}>
                    <div className={styles.mainInfoCards__item__label}>
                      {el.title}
                    </div>
                    <div className={styles.mainInfoCards__item__value}>
                      {getGrade(((el.total_correct_by_test / el.questions.length) * 100))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className={styles.errorWorkCard}>
            <Title level={4}>Работа над ошибками</Title>
            <div className={styles.errorWorkCard__row}>
              {
                data?.product.tests.map((el) => (
                  <div className={styles.errorWorkCard__column}>
                    <div className={styles.errorWorkCard__label}>
                      {el.title}
                    </div>
                    <div className={styles.errorWorkCard__question} >
                      {el.questions.map((question, index) => {
                        const selectedOption = question.selected_option;
                        const isSelectedOptionCorrect = selectedOption
                          ? question.all_options.find((option) => option.id === selectedOption.id)?.is_correct
                          : false;

                        const number = index + 1

                        return (
                          <div
                            key={question.id}
                            className={cn(
                              styles.errorWorkCard__question__item,
                              selectedOption === null
                                ? styles.errorWorkCard__question__item__isNull
                                : isSelectedOptionCorrect
                                  ? styles.errorWorkCard__question__item__true
                                  : styles.errorWorkCard__question__item__false
                            )}
                            onClick={() => handleOpenModalWorkOnErrors(question, el.title, number)}
                          >
                            {number}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <ModalWorkOnErrors
        isOpen={isWorkOnErrorsModalOpen}
        setIsOpen={setIsWorkOnErrorsModalOpen}
        selectedQuestion={selectedQuestion}
        subjectTitle={selectedQuestionSubjectTitle}
      />
    </>
  );
};
