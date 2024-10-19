import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchTestResultsQuery } from '../../redux/api/testsAPI'; // Импортируем хук для получения результатов

const ResultPage = () => {
  const { testId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const { data: resultData, isLoading, error } = useFetchTestResultsQuery(testId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching results: {error.message}</div>;

  const handleModalToggle = () => {
    setShowModal(prev => !prev);
  };

  const { test, score, correct, wrong, user, achievementPercentage, results } = resultData;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">Результаты теста: {test.title}</h2>
            </div>
            <div className="card-body">
              <div className="alert alert-info" role="alert">
                <p className="mb-0">Ваш результат: <strong>{score}</strong> / 100</p>
                <p className="mb-0">Правильных ответов: <strong>{correct}</strong></p>
                <p className="mb-0">Неправильных ответов: <strong>{wrong}</strong></p>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <div className="square-box">
                    <h4 className="mt-5">Общая информация</h4>
                    <p><strong>Имя-фамилия:</strong> {user.username}</p>
                    <p><strong>Достижение (%):</strong> 100%{achievementPercentage}</p>
                  </div>
                  <div className="square-box">
                    <h4 className="mt-5">Прогресс учащегося</h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="square-box">
                    <h4 className="mt-5">Показатели успеха по предметам</h4>
                    <ul>
                      <li>Русская литература</li>
                    </ul>
                  </div>
                  <div className="square-box">
                    <h4 className="mt-5">Сравнительный анализ по предметам</h4>
                    Русская литература 76%
                  </div>
                </div>
              </div>
              <hr />
              <button type="button" className="btn btn-success" onClick={handleModalToggle}>
                Работа над ошибками
              </button>
              {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Работа над ошибками</h5>
                        <button type="button" className="btn-close" onClick={handleModalToggle} aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {results.map((result, index) => (
                          <div className="card mb-4" key={index}>
                            <div className="card-body">
                              <p className="mb-0"><strong>Вопрос:</strong> {result.question.text}</p>
                              <p className="mb-0"><strong>Ваш ответ:</strong> {result.selected_option.text}</p>
                              {!result.is_correct ? (
                                <>
                                  <div className="alert alert-danger mt-3" role="alert">
                                    <p className="mb-0"><strong>Неправильно!</strong></p>
                                    <p className="mb-0"><strong>Правильный ответ:</strong> {result.correct_option.text}</p>
                                  </div>
                                  <p className="mt-3"><strong>Рекомендуемая литература:</strong></p>
                                  <ul className="list-group mt-3">
                                    {result.book_suggestions.map((book, idx) => (
                                      <li className="list-group-item" key={idx}>
                                        <a href={book.book_url} target="_blank" rel="noopener noreferrer">{book.book_title}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <div className="alert alert-success mt-3" role="alert">
                                  <p className="mb-0"><strong>Правильно!</strong></p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
