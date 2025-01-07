import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ slug, name, images, price, discounted_price }) => {
  const { currency } = useContext(ShopContext); 

  const imageUrl = images || 'https://via.placeholder.com/150';

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/products/${slug}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={imageUrl}
          alt={name || 'Product'}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {discounted_price ? (
          <>
            <span className="line-through text-gray-400">{price} {currency}</span>{' '}
            <span className="text-red-500">{discounted_price} {currency}</span>
          </>
        ) : (
          <span>{price} {currency}</span>
        )}
      </p>
    </Link>
  );
};

export default ProductItem;
