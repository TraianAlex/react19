import { products } from '../data';
import stylesModule from './AppProducts.module.scss';
import { lazy, useMemo, useState } from 'react';

export const styles = stylesModule as Record<string, string>;
const ProductsList = lazy(() =>
  import('../diverse/ProductsList').then((module) => ({
    default: module.ProductsList,
  }))
);

export function AppProducts() {
  const [count, setCount] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const [sort, setSort] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function slowCountItems(data: any[], ms: number) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
    return data.length;
  }

  const productsCount = useMemo(
    () => slowCountItems(products, 500),
    [products]
  );

  // const startTime1 = Date.now();
  // const sortedProducts = [...products].sort((a: any, b: any) =>
  //   a.name.localeCompare(b.name)
  // );
  // const endTime1 = Date.now();
  // console.log(`Took ${endTime1 - startTime1}ms`);

  const startTime2 = Date.now();
  const memoizedSortedProducts = useMemo(() => {
    return [...products].sort((a: any, b: any) => a.name.localeCompare(b.name));
  }, [products]);
  const endTime2 = Date.now();
  console.log(`Took ${endTime2 - startTime2}ms`);

  const visibleProducts = sort ? memoizedSortedProducts : products;

  const themeStyle = useMemo(() => ({
    backgroundColor: darkMode ? '#2b283a' : 'whitesmoke',
    color: darkMode ? 'white' : '#2b283a',
  }), [darkMode]);

  return (
    <>
      <h2>The current count is {count}</h2>
      <button className='btn btn-secondary me-2' onClick={decrement}>
        -
      </button>
      <button className='btn btn-primary' onClick={increment}>
        +
      </button>
      <br />
      <br />
      <button
        className='btn btn-secondary me-2'
        onClick={() => setShowProducts((prev) => !prev)}
      >
        Show Products
      </button>
      <button
        className='btn btn-secondary me-2'
        onClick={() => setSort((prev) => !prev)}
      >
        {sort ? 'Unsort' : 'Sort'}
      </button>
      <button
        className='btn btn-secondary'
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? 'Light' : 'Dark'}
      </button>
      <br />
      <br />
      <h2>There are {productsCount} products</h2>
      <div className={styles.productsList}>
        {showProducts && (
          <ProductsList products={visibleProducts} themeStyle={themeStyle} />
        )}
      </div>
    </>
  );
}
