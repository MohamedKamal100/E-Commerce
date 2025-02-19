import React from 'react';
import { BeatLoader } from 'react-spinners';
import useProducts from '../../Hooks/useProducts';
import ProductsCard from '../ProductsCard/ProductsCard';

export default function Products() {
  const { allProducts, prodLoad, error } = useProducts();

  return (
    <>
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-green-500 via-white to-green-500 text-gray-900 shadow-md tracking-wide rounded-lg">
          All Products
        </h2>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3">
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
