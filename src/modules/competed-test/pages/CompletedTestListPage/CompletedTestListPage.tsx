import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Skeleton } from 'antd';
import Title from 'antd/es/typography/Title';
import cn from 'classnames';

import { useGetCompletedTestListQuery } from 'modules/competed-test/redux/api';
import { useLazyGetAuthUserQuery } from 'modules/user/redux/slices/api';
import styles from './CompletedTestListPage.module.scss';

const { Content } = Layout;

export const CompletedTestListPage = () => {
  const [getAuthUser] = useLazyGetAuthUserQuery();
  const { data: testList, isLoading, refetch } = useGetCompletedTestListQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    getAuthUser();
  }, []);

  return (
    <Layout>
      <Content className='page-layout'>
        <Title level={1}>Результаты</Title>
        <div className={styles.list}>
          <div className={styles.list__item}>
            <div className={styles.list__item__title}>
              Название теста
            </div>
            <div className={styles.list__item__additional}>
              <div className={styles.list__item__additional__cell}>
                Набранные баллы
              </div>
              <div className={styles.list__item__additional__cell}>
                Время
              </div>
              <div className={styles.list__item__additional__cell}>
                Дата завершения
              </div>
              <div className={styles.list__item__additional__cell}></div>
            </div>
          </div>

          {isLoading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <div key={index} className={styles.list__item}>
                  <Skeleton.Input
                    active
                    style={{ height: '40px' }}
                    block
                  />
                </div>
              ))}
            </>
          ) : (
            testList?.map((el) => (
              <div key={el.id} className={styles.list__item}>
                <div className={styles.list__item__title}>
                  {el.product.title}
                </div>
                <div className={styles.list__item__additional}>
                  <div className={styles.list__item__additional__cell}>
                    {el.correct_answers_count}
                  </div>
                  <div className={styles.list__item__additional__cell}>
                    {el.completed_date}
                  </div>
                  <div className={styles.list__item__additional__cell}>
                    {el.finish_test_time}
                  </div>
                  <Link
                    to={`/completed-test/${el.id}`}
                    className={cn(styles.list__item__additional__cell, styles.list__item__additional__button)}
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </Content>
    </Layout>
  );
};
