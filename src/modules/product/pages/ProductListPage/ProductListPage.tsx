import React from 'react'
import ProductList from 'modules/product/components/ProductList/ProductList'
import styles from './ProductListPage.module.scss'

export const ProductListPage = () => {
  return (
    <div className={styles.body}>
      <ProductList />
    </div>
  )
}
