import React, { useState, useEffect, useContext } from "react";
import styles from "./StartedTestForm.module.scss";
import { Button, Radio, Space } from "antd";
import { TimerContext } from "App";
import cn from "classnames";
import { ReactComponent as IconArrow } from "assets/icons/arrow-left.svg";
import { ModalFinishTest } from "../ModalFinishTest/ModalFinishTest";

type TProps = {
  productTitle: string | undefined;
  handleOpenFinistTestModal: () => void;
  unansweredQuestions: {
    testTitle: string;
    questionNumber: number;
    questionId: string;
  }[];
  setUnansweredQuestions: React.Dispatch<
    React.SetStateAction<
      {
        testTitle: string;
        questionNumber: number;
        questionId: string;
      }[]
    >
  >;
  isFinishTestModalOpen: boolean;
  setIsFinishTestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartedTestForm = ({
  productTitle,
  handleOpenFinistTestModal,
  unansweredQuestions,
  setUnansweredQuestions,
  isFinishTestModalOpen,
  setIsFinishTestModalOpen,
}: TProps) => {
  const {
    // @ts-ignore
    timeLeft,
    // @ts-ignore
    formatTime,
    // @ts-ignore
    testIsStarted,
    // @ts-ignore
    timerInitialized,
    // @ts-ignore
    handleCompleteTest,
    // @ts-ignore
    isCompleting,
  } = useContext(TimerContext);
  const testDataFromLocalStorage = localStorage.getItem("test");
  const parsedData = testDataFromLocalStorage
    ? JSON.parse(testDataFromLocalStorage)
    : [];

  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [questionIndices, setQuestionIndices] = useState<{
    [key: number]: number;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("selectedAnswers");
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }

    const savedQuestionIndices = localStorage.getItem("questionIndices");
    if (savedQuestionIndices) {
      setQuestionIndices(JSON.parse(savedQuestionIndices));
    }
  }, []);

  useEffect(() => {
    const savedIndex = questionIndices[currentTestIndex] || 0;
    setCurrentQuestionIndex(savedIndex);
    setSelectedOption(
      selectedAnswers[
        parsedData[currentTestIndex]?.questions[savedIndex]?.id
      ] || null
    );
  }, [currentTestIndex, parsedData, questionIndices, selectedAnswers]);

  const handleTestSelect = (index: number) => {
    setQuestionIndices((prev) => {
      const updatedIndices = {
        ...prev,
        [currentTestIndex]: currentQuestionIndex,
      };
      localStorage.setItem("questionIndices", JSON.stringify(updatedIndices));
      return updatedIndices;
    });

    setCurrentTestIndex(index);
  };

  const handleNextQuestion = () => {
    if (
      currentQuestionIndex <
      parsedData[currentTestIndex].questions.length - 1
    ) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);

      setQuestionIndices((prev) => {
        const updatedIndices = {
          ...prev,
          [currentTestIndex]: nextQuestionIndex,
        };
        localStorage.setItem("questionIndices", JSON.stringify(updatedIndices));
        return updatedIndices;
      });
    } else if (currentTestIndex < parsedData.length - 1) {
      setQuestionIndices((prev) => {
        const updatedIndices = {
          ...prev,
          [currentTestIndex]: currentQuestionIndex,
        };
        localStorage.setItem("questionIndices", JSON.stringify(updatedIndices));
        return updatedIndices;
      });

      setCurrentTestIndex(currentTestIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevQuestionIndex);

      setQuestionIndices((prev) => {
        const updatedIndices = {
          ...prev,
          [currentTestIndex]: prevQuestionIndex,
        };
        localStorage.setItem("questionIndices", JSON.stringify(updatedIndices));
        return updatedIndices;
      });
    } else if (currentTestIndex > 0) {
      setQuestionIndices((prev) => {
        const updatedIndices = {
          ...prev,
          [currentTestIndex]: currentQuestionIndex,
        };
        localStorage.setItem("questionIndices", JSON.stringify(updatedIndices));
        return updatedIndices;
      });

      setCurrentTestIndex(currentTestIndex - 1);
      setCurrentQuestionIndex(
        parsedData[currentTestIndex - 1].questions.length - 1
      );
    }
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);

    const currentQuestionId =
      parsedData[currentTestIndex].questions[currentQuestionIndex].id;
    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestionId]: e.target.value,
    };

    setSelectedAnswers(updatedAnswers);
    localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
  };

  const handleQuestionSelect = (index: number) => {
    const currentQuestionId = parsedData[currentTestIndex].questions[index].id;

    const updatedUnansweredQuestions = unansweredQuestions.filter(
      (question) => question.questionId !== currentQuestionId
    );
    setUnansweredQuestions(updatedUnansweredQuestions);

    const updatedAnswers = {
      ...selectedAnswers,
      [currentQuestionId]: selectedAnswers[currentQuestionId] || "",
    };
    setSelectedAnswers(updatedAnswers);
    localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));

    setCurrentQuestionIndex(index);
    // @ts-ignore
    setSelectedOption(updatedAnswers[currentQuestionId] || null);

    setQuestionIndices((prev) => {
      const updatedIndices = { ...prev, [currentTestIndex]: index };
      localStorage.setItem("questionIndices", JSON.stringify(updatedIndices));
      return updatedIndices;
    });
  };

  const findUnansweredQuestions = () => {
    // @ts-ignore
    const unanswered = [];

    parsedData.forEach((test: any, testIndex: number) => {
      test.questions.forEach((question: any, questionIndex: number) => {
        if (!selectedAnswers[question.id]) {
          unanswered.push({
            testTitle: test.title,
            questionNumber: questionIndex + 1,
            questionId: question.id,
          });
        }
      });
    });

    // @ts-ignore
    setUnansweredQuestions(unanswered);
  };

  if (!parsedData.length) {
    return <div>Нет данных для теста</div>;
  }

  const currentTest = parsedData[currentTestIndex];
  const currentQuestion = currentTest.questions[currentQuestionIndex];
  const isLastQuestionOfLastTest =
    currentTestIndex === parsedData.length - 1 &&
    currentQuestionIndex === currentTest.questions.length - 1;

  const isQuestionUnanswered = (questionId: string) => {
    return unansweredQuestions.some(
      (unanswered) => unanswered.questionId === questionId
    );
  };

  const isQuestionAnswered = (questionId: string) => {
    return !!selectedAnswers[questionId];
  };

  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = currentTest.questions.length;

  return (
    // <>
    //   {timerInitialized && testIsStarted && timeLeft > 0 && (
    //     <h2 className={styles.title}>
    //       {productTitle}
    //     </h2>
    //   )}

    //   <div className={styles.testForm}>
    //     {timerInitialized && testIsStarted && timeLeft > 0 && (
    //       <div
    //         className={cn(styles.timer)}
    //       >
    //         Осталось: {formatTime(timeLeft)}
    //       </div>
    //     )}
    //     {/* {timerInitialized && testIsStarted && timeLeft > 0 && (
    //       <h2 className={styles.title}>
    //         {productTitle}
    //       </h2>
    //     )} */}

    //     <Button
    //       onClick={() => {
    //         handleOpenFinistTestModal()
    //         findUnansweredQuestions()
    //       }}
    //       className={cn(styles.testForm__button, styles.testForm__button__prenatallyFinish)}
    //     >
    //       Пренудительно завершить тест
    //     </Button>

    //     <div className={styles.tabs}>
    //       {parsedData.map((test: any, index: number) => (
    //         <button
    //           key={test.title}
    //           className={`${styles.tab} ${index === currentTestIndex ? styles.tab__isActive : ''}`}
    //           onClick={() => handleTestSelect(index)}
    //         >
    //           {test.title}
    //         </button>
    //       ))}
    //     </div>

    //     <div className={styles.questionTabs}>
    //       {currentTest.questions.map((question: any, index: number) => (
    //         <button
    //           key={index}
    //           className={cn(styles.questionTab, {
    //             [styles.unanswered]: isQuestionUnanswered(question.id),
    //             [styles.questionTab__isActive]: index === currentQuestionIndex,
    //           })}
    //           onClick={() => handleQuestionSelect(index)}
    //         >
    //           {index + 1}
    //         </button>
    //       ))}
    //     </div>

    //     <div className={styles.questionText}>{currentQuestion.text}</div>

    //     <div className={styles.options}>
    //       <Radio.Group value={selectedOption} onChange={handleOptionChange}>
    //         <Space direction="vertical">
    //           {currentQuestion.options.map((option: any) => (
    //             <Radio key={option.id} value={option.id} className={styles.option}>
    //               {option.text}
    //             </Radio>
    //           ))}
    //         </Space>
    //       </Radio.Group>
    //     </div>

    //     <div className={styles.navigationButtons}>
    //       <Button
    //         onClick={handlePreviousQuestion}
    //         disabled={currentTestIndex === 0 && currentQuestionIndex === 0}
    //         className={cn(styles.testForm__button, styles.testForm__button__back)}
    //       >
    //         <IconArrow /> Предыдущий вопрос
    //       </Button>
    //       {isLastQuestionOfLastTest ? (
    //         <Button
    //           onClick={() => {
    //             handleOpenFinistTestModal()
    //             findUnansweredQuestions()
    //           }}
    //           className={cn(styles.testForm__button, styles.testForm__button__finish)}
    //         >
    //           Завершить тест
    //         </Button>
    //       ) : (
    //         <Button
    //           onClick={handleNextQuestion}
    //           disabled={currentTestIndex === parsedData.length - 1 && currentQuestionIndex === currentTest.questions.length - 1}
    //           className={cn(styles.testForm__button, styles.testForm__button)}
    //         >
    //           Следующий вопрос <IconArrow />
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    //   <ModalFinishTest
    //     isOpen={isFinishTestModalOpen}
    //     setOpen={setIsFinishTestModalOpen}
    //     unansweredQuestions={unansweredQuestions}
    //     handleCompleteTest={handleCompleteTest}
    //     isCompleting={isCompleting}
    //   />
    // </>

    <>
      <div className={styles.testForm}>
        <div className={cn(styles.header, styles.topLeftButtons)}>
          <div className={styles.timer}>
            Осталось:{" "}
            {timerInitialized && testIsStarted && formatTime(timeLeft)}
          </div>
          <div className={styles.currentQuestionNumber}>
            Вопрос {currentQuestionNumber} из {totalQuestions}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.tabs}>
            {parsedData.map((test: any, index: number) => (
              <button
                key={test.title}
                className={`${styles.tab} ${
                  index === currentTestIndex ? styles.tab__isActive : ""
                }`}
                onClick={() => handleTestSelect(index)}
              >
                {test.title}
              </button>
            ))}
          </div>

          <div className={styles.questionTabs}>
            {currentTest.questions.map((question: any, index: number) => (
              <button
                key={index}
                className={cn(styles.questionTab, {
                  [styles.unanswered]: isQuestionUnanswered(question.id),
                  [styles.answered]: isQuestionAnswered(question.id),
                  [styles.unanswered]: unansweredQuestions.some(
                    (q) => q.questionId === question.id
                  ),
                  [styles.questionTab__isActive]:
                    index === currentQuestionIndex,
                })}
                onClick={() => handleQuestionSelect(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className={styles.questionText}>{currentQuestion?.text}</div>
          {currentQuestion?.img && (
            <div className={styles.questionImage}>
              <img src={currentQuestion.img} alt="Question" />
            </div>
          )}

          <div className={styles.options}>
            <Radio.Group value={selectedOption} onChange={handleOptionChange}>
              <Space direction="vertical">
                {currentQuestion?.options?.map((option: any) => (
                  <div className={styles.option}>
                    <Radio
                      key={option.id}
                      value={option.id}
                      className={styles.option}
                  >
                      {option.text}
                    </Radio>
                    {option.img && (
                      <div className={styles.optionImage}>
                        <img src={option.img} alt="Option" />
                      </div>
                    )}
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.topRightButtons}>
            <Button
              onClick={() => handleTestSelect(currentTestIndex - 1)}
              disabled={currentTestIndex === 0}
              className={cn(
                styles.testForm__button,
                styles.testForm__button__back,
                styles.testForm__button__top
              )}
            >
              Предыдущий предмет
            </Button>

            <Button
              onClick={() => handleTestSelect(currentTestIndex + 1)}
              disabled={currentTestIndex === parsedData.length - 1}
              className={cn(
                styles.testForm__button,
                styles.testForm__button,
                styles.testForm__button__top
              )}
            >
              Следующий предмет
            </Button>
          </div>
        </div>

        <div className={styles.navigationButtons}>
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentTestIndex === 0 && currentQuestionIndex === 0}
            className={cn(
              styles.testForm__button,
              styles.testForm__button__back
            )}
          >
            Предыдущий вопрос
          </Button>

          {isLastQuestionOfLastTest ? (
            <Button
              onClick={() => {
                handleOpenFinistTestModal();
                findUnansweredQuestions();
              }}
              className={cn(
                styles.testForm__button,
                styles.testForm__button__finish
              )}
              danger
            >
              Завершить тест
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              disabled={
                currentTestIndex === parsedData.length - 1 &&
                currentQuestionIndex === currentTest.questions.length - 1
              }
              className={cn(styles.testForm__button, styles.testForm__button)}
            >
              Следующий вопрос
            </Button>
          )}
        </div>
      </div>

      <ModalFinishTest
        isOpen={isFinishTestModalOpen}
        setOpen={setIsFinishTestModalOpen}
        unansweredQuestions={unansweredQuestions}
        handleCompleteTest={handleCompleteTest}
        isCompleting={isCompleting}
      />
    </>
  );
};

export default StartedTestForm;
