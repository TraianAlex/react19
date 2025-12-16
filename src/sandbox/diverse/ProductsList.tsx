import { styles } from './AppProducts';
import { memo } from 'react';

function sleep(ms: number) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

function Product({ product, darkMode }: { product: any; darkMode: boolean }) {
  const themeStyle = {
    backgroundColor: darkMode ? '#2b283a' : 'whitesmoke',
    color: darkMode ? 'white' : '#2b283a',
  };
  console.log('Product rendered');

  return (
    <div className={styles.productCard} style={themeStyle}>
      <p className={styles.truncate}>{product.name}</p>
    </div>
  );
}

const ProductMemo = memo(Product);

export function ProductsList({
  products,
  darkMode,
}: {
  products: any[];
  darkMode: boolean;
}) {
  return products.map((product) => (
    <ProductMemo key={product.id} product={product} darkMode={darkMode} />
  ));
}
