import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

export default function Brands() {

  const getBrands = async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    return data;
  };

  const { data: brandsData, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-green-500 via-white to-green-500 text-gray-900 shadow-md tracking-wide rounded-lg space-x-2">
          All Brands
        </h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="#22c55e" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brandsData?.data?.map((brand) => (
            <Link
              key={brand._id}
              to={`/products?brand=${brand._id}`}
              className="group relative cursor-pointer bg-white border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
            >
              <img src={brand.image} alt={brand.name} className="w-full h-40 object-contain rounded-lg" />
              <h4 className="mt-3 text-center font-semibold text-gray-800 group-hover:text-green-600">{brand.name}</h4>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
