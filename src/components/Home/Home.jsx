import React from 'react';
import style from './Home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import ProductsCard from '../ProductsCard/ProductsCard';
import { BeatLoader } from 'react-spinners';
import slider1 from '../../assets/images/slider-image-1.jpeg';
import slider2 from '../../assets/images/slider-image-2.jpeg';
import slider3 from '../../assets/images/slider-image-3.jpeg';
import slider4 from '../../assets/images/slider-2.jpeg';
import useCategories from '../../Hooks/useCategories';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function Home() {
  const { allCatProd, catLoad } = useCategories();
  const { allProducts, prodLoad, error } = useProducts();

  const sliderImages = [slider2, slider3];

  return (
    <>
      <div className="mt-2 px-2 md:px-6 lg:px-12">
        {/* السلايدر الكبير */}
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <PhotoProvider>
              <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
              >
                {sliderImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <PhotoView src={image}>
                      <img
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        src={image}
                        alt={`Slide ${index + 1}`}
                      />
                    </PhotoView>
                  </SwiperSlide>
                ))}
              </Swiper>
            </PhotoProvider>
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <img src={slider1} className="h-1/2 w-full object-cover rounded-lg" alt="Side 1" />
            <img src={slider4} className="h-1/2 w-full object-cover rounded-lg" alt="Side 2" />
          </div>
        </div>

        <div className="mt-6">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 6, spaceBetween: 40 },
            }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="w-full"
          >
            {allCatProd?.data?.data?.map((cat) => (
              <SwiperSlide key={cat._id} className="flex flex-col items-center">
                <Link to={`/products?category=${cat._id}`}>
                  <img src={cat.image} className="h-[200px] w-full object-cover rounded-lg" alt={cat.name} />
                  <div className="text-center text-cyan-900 font-medium mt-2 py-6">{cat.name}</div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {prodLoad ? (
        <div className="w-full h-screen flex justify-center items-center">
          <BeatLoader color="#22c55e" size={15} />
        </div>
      ) : (
        <div className="container mx-auto py-10 px-4">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-4xl font-extrabold px-6 py-2 bg-gradient-to-r from-green-500 via-white to-green-500 text-gray-900 shadow-md tracking-wide rounded-lg">
              Our Products
            </h2>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {allProducts?.length > 0 ? (
              allProducts?.map((product) => <ProductsCard product={product} key={product._id} />)
            ) : (
              <p className="text-center text-gray-500 text-xl">No products available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
