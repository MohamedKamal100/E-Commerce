import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
  const fetchProducts = async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data.data;
  };

  const { data: allProducts, isLoading: prodLoad, error } = useQuery({
    queryKey: ['allProducts'],
    queryFn: fetchProducts,

    refetchOnMount: false, // لا يتم الجلب عند العودة من صفحة أخرى
    refetchOnWindowFocus: false, // لا يتم الجلب عند العودة للصفحة

  });

  return { allProducts, prodLoad, error };
}
