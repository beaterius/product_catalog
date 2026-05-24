import { DummyJsonResponse, Product } from '../types/product';
import { API_URL } from '../constants/api';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(
            `Network error: ${response.status} ${response.statusText}`        );
    }

    const data: DummyJsonResponse = await response.json();

    return data.products;
};