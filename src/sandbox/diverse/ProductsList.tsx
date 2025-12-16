import { sleep } from '../../shared/utils/utils';
import { styles } from './AppProducts';
import { memo } from 'react';

function Product({
  product,
  themeStyle,
  chooseProduct,
}: {
  product: any;
  themeStyle: React.CSSProperties;
  chooseProduct: (id: string) => void;
}) {
  sleep(1);
  console.log('Product rendered');

  return (
    <div
      className={styles.productCard}
      style={themeStyle}
      onClick={() => chooseProduct(product.id)}
    >
      <p className={styles.truncate}>{product.name}</p>
    </div>
  );
}

const ProductMemo = memo(Product);

export function ProductsList({
  products,
  themeStyle,
  chooseProduct,
  selectedProduct,
  selectedStyles,
}: {
  products: any[];
  themeStyle: React.CSSProperties;
  chooseProduct: (product: any) => void;
  selectedProduct: any;
  selectedStyles: React.CSSProperties;
}) {
  return products.map((product) => {
    const isSelected = product.id === selectedProduct;
    return (
      <ProductMemo
        key={product.id}
        product={product}
        themeStyle={isSelected ? selectedStyles : themeStyle}
        chooseProduct={chooseProduct}
      />
    );
  });
}
