export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    weight: number;
    dimensions: ProductDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    thumbnail: string;
    images: string[];
}

export interface DummyJsonResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface FilterState {
    searchQuery: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: 'price-asc' | 'price-desc' | 'rating' | 'title';
    onlyInStock: boolean;
}