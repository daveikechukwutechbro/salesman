'use client';

import { useEffect, useState, useCallback } from 'react';
import { Screen, User, Category, Product, Order, SortOption, PaginationInfo, Toast } from '@/app/types';

import ErrorBoundary from '@/app/components/ErrorBoundary';
import LoadingState from '@/app/components/LoadingState';
import ErrorState from '@/app/components/ErrorState';
import ToastContainer from '@/app/components/Toast';
import AppShell from '@/app/components/layout/AppShell';

import SearchBar from '@/app/components/home/SearchBar';
import CategoryBar from '@/app/components/home/CategoryBar';
import FeaturedCarousel from '@/app/components/home/FeaturedCarousel';
import ProductGrid from '@/app/components/home/ProductGrid';
import ProductDetail from '@/app/components/product/ProductDetail';
import CartScreen from '@/app/components/cart/CartScreen';
import CheckoutForm from '@/app/components/checkout/CheckoutForm';
import OrderHistory from '@/app/components/profile/OrderHistory';
import OrderCard from '@/app/components/orders/OrderCard';
import ReceiptModal from '@/app/components/orders/ReceiptModal';
import ProfileForm from '@/app/components/profile/ProfileForm';

export default function Home() {
  const [initialized, setInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [screen, setScreen] = useState<Screen>('home');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartRefreshKey, setCartRefreshKey] = useState(0);

  // Home screen state
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Product detail state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart summary state
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Checkout state
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Order detail state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        const WebApp = (await import('@twa-dev/sdk')).default;
        const isTelegram = WebApp.isExpanded !== undefined;

        if (!isTelegram) {
          setInitError('This app can only be accessed from within Telegram');
          setInitialized(true);
          return;
        }

        WebApp.ready();
        WebApp.expand();

        if (!WebApp.initDataUnsafe?.user) {
          setInitError('No user data available');
          setInitialized(true);
          return;
        }

        const initData = WebApp.initData || '';

        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData }),
        });

        if (!res.ok) {
          setInitError('Authentication failed');
          setInitialized(true);
          return;
        }

        const { user: authedUser } = await res.json();
        setUser(authedUser);
        setInitialized(true);
      } catch (e) {
        console.error('Init error:', e);
        setInitError('Failed to initialize');
        setInitialized(true);
      }
    };

    initApp();
  }, []);

  useEffect(() => {
    if (!initialized || !user) return;
    fetchCategories();
    fetchProducts();
    fetchCartSummary();
  }, [initialized, user]);

  useEffect(() => {
    if (!initialized || !user) return;
    const timer = setTimeout(() => { setCurrentPage(1); fetchProducts(); }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, sortOption]);

  useEffect(() => {
    if (!initialized || !user) return;
    fetchProducts();
  }, [currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (e) {
      console.error('Error fetching categories:', e);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (activeCategory) params.set('categoryId', activeCategory);

      const sortMap: Record<SortOption, { sortBy: string; sortOrder: string }> = {
        'newest': { sortBy: 'createdAt', sortOrder: 'desc' },
        'price-asc': { sortBy: 'price', sortOrder: 'asc' },
        'price-desc': { sortBy: 'price', sortOrder: 'desc' },
        'rating': { sortBy: 'rating', sortOrder: 'desc' },
        'popular': { sortBy: 'reviewCount', sortOrder: 'desc' },
      };
      const s = sortMap[sortOption];
      params.set('sortBy', s.sortBy);
      params.set('sortOrder', s.sortOrder);
      params.set('page', String(currentPage));
      params.set('limit', '20');

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setPagination(data.pagination || null);
    } catch (e) {
      console.error('Error fetching products:', e);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setScreen('product');
  };

  const handleAddToCart = async (product: Product) => {
    if (!user) return;
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId: product.id, quantity: 1 }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to add to cart');
      }
      addToast('success', `${product.name} added to cart!`);
      setCartRefreshKey((k) => k + 1);
    } catch (e) {
      addToast('error', e instanceof Error ? e.message : 'Failed to add to cart');
    }
  };

  const handleCheckout = async (data: { shippingAddress: string; phone: string; note: string }) => {
    if (!user) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress: data.shippingAddress,
          phone: data.phone,
          note: data.note,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create invoice');
      }

      const { invoiceLink, orderNumber } = await res.json();

      const WebApp = (await import('@twa-dev/sdk')).default;
      WebApp.openInvoice(invoiceLink, async (status) => {
        if (status === 'paid') {
          const txnId = `txn_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

          try {
            const confirmRes = await fetch('/api/payment-success', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                orderNumber,
                transactionId: txnId,
              }),
            });

            if (!confirmRes.ok) throw new Error('Failed to confirm order');

            await confirmRes.json();
            addToast('success', `Order ${orderNumber} confirmed!`);
            setCartRefreshKey((k) => k + 1);
            setScreen('orders');
          } catch {
            addToast('error', 'Payment succeeded but order confirmation failed. Contact support.');
          }
        } else if (status === 'failed') {
          addToast('error', 'Payment failed. Please try again.');
        }
        setCheckoutLoading(false);
        setScreen('orders');
      });
    } catch (e) {
      addToast('error', e instanceof Error ? e.message : 'Checkout failed');
      setCheckoutLoading(false);
    }
  };

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setScreen('order-detail');
  };

  const fetchCartSummary = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/cart?userId=${user.id}`);
      const data = await res.json();
      const items = data.items || [];
      setCartCount(items.length);
      setCartTotal(data.total || 0);
    } catch {
      setCartCount(0);
      setCartTotal(0);
    }
  };

  const handleTabChange = (newScreen: Screen) => {
    if (newScreen === 'cart' || newScreen === 'checkout') {
      setCartRefreshKey((k) => k + 1);
      fetchCartSummary();
    }
    setScreen(newScreen);
  };

  if (!initialized) return <LoadingState />;
  if (initError) return <ErrorState error={initError} onRetry={() => window.location.reload()} />;
  if (!user) return <LoadingState />;

  return (
    <ErrorBoundary>
      <AppShell activeScreen={screen} onTabChange={handleTabChange} cartCount={cartCount}>
        <ToastContainer toasts={toasts} onRemove={removeToast} />

        {showReceipt && selectedOrder && (
          <ReceiptModal order={selectedOrder} onClose={() => setShowReceipt(false)} />
        )}

        {screen === 'home' && (
          <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Digital Store</h1>
            <SearchBar onSearch={setSearchQuery} />
            <FeaturedCarousel products={products} onProductPress={handleProductPress} />
            <CategoryBar
              categories={categories}
              activeCategory={activeCategory}
              onSelect={(id) => setActiveCategory(id)}
            />
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(['newest', 'price-asc', 'price-desc', 'rating', 'popular'] as SortOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortOption(opt)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    sortOption === opt
                      ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {opt === 'newest' ? 'Newest' : opt === 'price-asc' ? 'Price: Low' : opt === 'price-desc' ? 'Price: High' : opt === 'rating' ? 'Top Rated' : 'Popular'}
                </button>
              ))}
            </div>
            {productsLoading ? (
              <div className="flex justify-center py-12">
                <div className="spinner" />
              </div>
            ) : (
              <ProductGrid products={products} onProductPress={handleProductPress} />
            )}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded-lg text-sm tg-button cursor-pointer disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="text-xs tg-hint">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage >= pagination.totalPages}
                  className="px-3 py-1.5 rounded-lg text-sm tg-button cursor-pointer disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}

        {screen === 'product' && selectedProduct && (
          <div className="p-4">
            <ProductDetail
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onBack={() => {
                setSelectedProduct(null);
                setScreen('home');
              }}
            />
          </div>
        )}

        {screen === 'cart' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            <CartScreen
              userId={user.id}
              onCheckout={() => setScreen('checkout')}
              refreshKey={cartRefreshKey}
            />
          </div>
        )}

        {screen === 'checkout' && (
          <div className="p-4">
            <CheckoutForm
              initialAddress={user.address || ''}
              initialPhone={user.phone || ''}
              totalAmount={cartTotal}
              itemCount={cartCount}
              onSubmit={handleCheckout}
              onBack={() => setScreen('cart')}
              loading={checkoutLoading}
            />
          </div>
        )}

        {screen === 'orders' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">My Orders</h2>
            <OrderHistory userId={user.id} onOrderPress={handleOrderPress} />
          </div>
        )}

        {screen === 'order-detail' && selectedOrder && (
          <div className="p-4">
            <button
              onClick={() => { setSelectedOrder(null); setScreen('orders'); }}
              className="flex items-center gap-1 text-sm tg-link mb-4 cursor-pointer"
            >
              ← Back to Orders
            </button>
            <OrderCard order={selectedOrder} onPress={() => setShowReceipt(true)} />
            <button
              onClick={() => setShowReceipt(true)}
              className="w-full py-3 rounded-xl tg-button text-base font-semibold mt-4 cursor-pointer"
            >
              View Receipt & Tracking
            </button>
          </div>
        )}

        {screen === 'profile' && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6">My Profile</h2>
            <ProfileForm user={user} onSaved={() => {}} />
          </div>
        )}
      </AppShell>
    </ErrorBoundary>
  );
}
