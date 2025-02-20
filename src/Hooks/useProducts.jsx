

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function useProducts() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const brandId = params.get('brand');
  const categoryId = params.get('category');

  // Fetch products from API
  const fetchProducts = async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
      params: brandId ? { brand: brandId } : categoryId ? { category: categoryId } : {},
    });
    return data.data;
  };

  const { data: allProducts, isLoading: prodLoad, error } = useQuery({
    queryKey: ['allProducts', brandId, categoryId],
    queryFn: fetchProducts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { allProducts, prodLoad, error };
}
