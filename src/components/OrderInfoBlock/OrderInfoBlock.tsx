import { ProductType } from '../../types/Product';
import './OrderInfoBlock.scss';

type Props = {
  orderProducts: ProductType[],
  orderName: string,
};

export const OrderInfoBlock: React.FC<Props> = ({
  orderProducts,
  orderName,
}) => {
  return (
    <>
      <h4 className="info-block__name text-truncate">
        {orderName}
      </h4>

      {!orderProducts.length ? (
        <p className="alert alert-info text-bold text-center">
          No products yet
        </p>
      ) : (
        <>
          {orderProducts.map((product) => (
            <div
              key={product.id}
              className="info-block__container"
            >
              <span className="info-block__container-circuit" />

              <div className="info-block__container-image--block">
                <img
                  className="info-block__container-image"
                  src={product.photo}
                  alt="Product"
                />
              </div>

              <div className="info-block__container-title title">
                <p className="
                  title__name
                  m-0
                  text-truncate"
                >
                  {product.title}
                </p>

                <p className="
                  title__serial
                  text-muted
                  m-0"
                >
                  {product.serialNumber}
                </p>
              </div>

              <p className="info-block__container-status">
                Свободен
              </p>

              <div className="
                info-block__container-trash
                fa-solid
                fa-trash
                fa-sm"
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};
