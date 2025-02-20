import React from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import useCategories from '../../Hooks/useCategories'

export default function Categories() {
  const { allCatProd, catLoad } = useCategories()

  return (
    <>
      {catLoad ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <BeatLoader color="#22c55e" size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-green-700">Our Brands</h2>

          {allCatProd?.data?.data.map((cat) => (
            <Link key={cat._id} to={`/products?category=${cat._id}`}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group relative overflow-hidden">
                <img src={cat.image} className='w-full h-[250px] object-contain transition-transform duration-500 group-hover:scale-105' alt={cat.name} />
                <div className="absolute inset-0 bg-black bg-opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h4 className="text-white text-xl font-bold">{cat.name}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}