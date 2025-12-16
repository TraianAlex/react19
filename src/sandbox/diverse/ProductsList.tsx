import { sleep } from '../../shared/utils/utils';
import { styles } from './AppProducts';
import { memo } from 'react';

function Product({
  product,
  themeStyle,
}: {
  product: any;
  themeStyle: React.CSSProperties;
}) {
  sleep(1);
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
  themeStyle,
}: {
  products: any[];
  themeStyle: React.CSSProperties;
}) {
  return products.map((product) => (
    <ProductMemo key={product.id} product={product} themeStyle={themeStyle} />
  ));
}
