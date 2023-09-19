import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../ProductCard/ProductCard';

import './Products.scss';

export const Products = () => {
  const { items } = useAppSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || '';

  const filteredProducts = useMemo(() => {
    let sortedProducts = [...items];

    if (type) {
      sortedProducts = sortedProducts.filter(
        product => product.type.toLowerCase() === type.toLowerCase(),
      );
    }

    return sortedProducts || null;
  }, [type, items]);

  return (
    <>
      <div className="
        products
        container
        mx-0
        p-0"
      >
        {filteredProducts?.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
          />
        ))}
      </div>
    </>
  );
};
