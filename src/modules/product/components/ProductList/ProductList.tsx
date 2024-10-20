import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { useGetProductListQuery } from "modules/product/redux/api";
import { ReactComponent as IconTest } from "../../../../assets/img/icon-test.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import cn from "classnames";
import styles from "./ProductList.module.scss";

const ProductList = () => {
  const { data: products, isLoading } = useGetProductListQuery();
  const { user } = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const productId = localStorage.getItem("product_id");

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section>
      <div className="pb-20 xl:pb-[150px] ">
        <div className="global-container">
          <h2 className={styles.title}>Список тестов</h2>
          <div className={styles.product}>
            {products?.map((product) => (
              <div key={product.id} className={styles.product__item}>
                <div className={styles.product__item__content}>
                  <div className={styles.product__item__descr}>
                    <h3 className={styles.product__item__title}>
                      {product.title}
                    </h3>
                    <div className={styles.product__item__subtitleBlock}>
                      <div className={styles.product__item__subtitle}>
                        {product.sum}₸
                      </div>
                      <div className={styles.divider}></div>
                      <div className={styles.product__item__subtitle}>
                        Один тест
                      </div>
                    </div>
                    <div className={styles.product__item__text}>
                      Отлично подходит для <br /> тех кто сдает {product.title}
                    </div>
                  </div>
                  <IconTest />
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
