import React from "react";
import { Link } from "react-router-dom";
import { message, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useGetProductListQuery } from "modules/product/redux/api";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ReactComponent as IconTest } from "../../../../assets/img/icon-test.svg";

import styles from "./ProductList.module.scss";

const ProductList = () => {
  const { data: products, isLoading } = useGetProductListQuery();
  const { user } = useTypedSelector((state) => state.auth);
  const productId = localStorage.getItem("product_id");

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  const studentProducts = products?.filter(
    (product) => product.product_type === "STUDENT"
  );
  const teacherProducts = products?.filter(
    (product) => product.product_type === "TEACHER"
  );

  return (
    <section className={styles.section}>
      {studentProducts && studentProducts?.length > 0 && (
        <>
          <Title level={1} className={styles.sectionTitle}>
            Ученикам
          </Title>
          <div className={styles.product}>
            {studentProducts?.map((product) => (
              <div key={product.id} className={styles.product__item}>
                <div className={styles.product__item__content}>
                  <div className={styles.product__item__descr}>
                    <h3 className={styles.product__item__title}>
                      {product.title}
                    </h3>
                    <div className={styles.product__item__subtitle}>
                      {product.description}
                    </div>
                  </div>
                </div>
                <Link
                  to={
                    !user?.test_is_started
                      ? `/product/${product.id}`
                      : `/product/${productId}`
                  }
                  className={styles.product__item__button}
                  onClick={() => {
                    if (user?.test_is_started) {
                      message.warning(
                        "Вы уже начали тест! Завершите его, чтобы начать другой!"
                      );
                    }
                  }}
                >
                  Пройти онлайн
                  {/* <IconTest /> */}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {teacherProducts && teacherProducts?.length > 0 && (
        <>
          <Title level={1} className={styles.sectionTitle}>
            Учителям
          </Title>
          <div className={styles.product}>
            {teacherProducts?.map((product) => (
              <div key={product.id} className={styles.product__item}>
                <div className={styles.product__item__content}>
                  <div className={styles.product__item__descr}>
                    <h3 className={styles.product__item__title}>
                      {product.title}
                    </h3>
                    <div className={styles.product__item__subtitle}>
                      {product.description}
                    </div>
                  </div>
                </div>
                <Link
                  to={
                    !user?.test_is_started
                      ? `/product/${product.id}`
                      : `/product/${productId}`
                  }
                  className={styles.product__item__button}
                  onClick={() => {
                    if (user?.test_is_started) {
                      message.warning(
                        "Вы уже начали тест! Завершите его, чтобы начать другой!"
                      );
                    }
                  }}
                >
                  Пройти онлайн
                  {/* <IconTest /> */}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
