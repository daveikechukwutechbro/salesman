export type Screen = 'home' | 'product' | 'cart' | 'checkout' | 'orders' | 'order-detail' | 'profile';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface User {
  id: string;
  telegramId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  phone: string | null;
  address: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  image: string | null;
  sortOrder: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  image: string | null;
  images: string[];
  stock: number;
  categoryId: string;
  category?: Category;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: string | null;
  phone: string | null;
  note: string | null;
  transactionId: string | null;
  estimatedDelivery: string | null;
  deliveredAt: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
