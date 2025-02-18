import React from 'react';
import { BeatLoader } from 'react-spinners';
import useProducts from '../../Hooks/useProducts';
import ProductsCard from '../ProductsCard/ProductsCard';

export default function Products() {
  const { allProducts, prodLoad, error } = useProducts();

  return (
    <>
      <h2 className="text-4xl font-extrabold px-6 py-2 text-gray-900 shadow-md tracking-wide rounded-lg text-center">
        All Products
      </h2>


      {prodLoad && (
        <div className="w-full h-screen flex justify-center items-center">
          <BeatLoader color="#22c55e" size={15} />
        </div>
      )}


      {error && (
        <div className="text-center text-red-500 font-bold my-4">
          Failed to load products. Please try again.
        </div>
      )}


      {!prodLoad && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
          {allProducts?.length > 0 ? (
            allProducts.map((product) => <ProductsCard key={product._id} product={product} />)
          ) : (
            <p className="text-center col-span-full flex justify-center items-center text-lime-950">
              No products found.
            </p>
          )}
        </div>
      )}
    </>
  );
}
