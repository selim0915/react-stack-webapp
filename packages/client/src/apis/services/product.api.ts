import { ProductType } from '../../types/core.type';
import api from '../api.instance';

/**
 * Get all products
 * @returns Promise<ProductType[]>
 */
export const getProducts = async (): Promise<ProductType[]> => {
  const response = await api.get<ProductType[]>('/api/product/list');
  return response.data;
};

/**
 * Get product by ID
 * @param productId - Product ID
 * @returns Promise<ProductType>
 */
export const getProductById = async (productId: string): Promise<ProductType> => {
  const response = await api.get<ProductType>(`/api/product/${productId}`);
  return response.data;
};

/**
 * Create a new product
 * @param product - Product data
 * @returns Promise<ProductType>
 */
export const createProduct = async (product: Omit<ProductType, 'id'>): Promise<ProductType> => {
  const response = await api.post<ProductType>('/api/product', product);
  return response.data;
};

/**
 * Update an existing product
 * @param productId - Product ID
 * @param product - Updated product data
 * @returns Promise<ProductType>
 */
export const updateProduct = async (productId: string, product: Partial<ProductType>): Promise<ProductType> => {
  const response = await api.put<ProductType>(`/api/product/${productId}`, product);
  return response.data;
};

/**
 * Delete a product
 * @param productId - Product ID
 * @returns Promise<ProductType>
 */
export const deleteProduct = async (productId: string): Promise<ProductType> => {
  const response = await api.delete<ProductType>(`/api/product/${productId}`);
  return response.data;
};
