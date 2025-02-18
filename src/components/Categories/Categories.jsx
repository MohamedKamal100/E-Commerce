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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
          {allCatProd?.data?.data.map((cat) => (
            <Link key={cat._id} to={`/products/${cat._id}`}>
              <div className="cardbody cursor-pointer hover:shadow-lg transition duration-300">
                <img src={cat.image} className='w-full h-[300px] rounded-lg' alt={cat.name} />
                <h4 className="text-center py-3 font-bold text-lg text-lime-900">{cat.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
