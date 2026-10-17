import { Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext.jsx';
import { CartProvider } from './components/CartContext.jsx';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginForm from './components/LoginForm.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main className="page">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/login"
              element={
                <section data-testid="login-page">
                  <h1>Account</h1>
                  <LoginForm />
                </section>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <section data-testid="checkout-page">
                    <h1>Checkout</h1>
                    <CheckoutForm />
                  </section>
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <section data-testid="not-found-page">
                  <h1>Page not found</h1>
                  <Link to="/">Back to products</Link>
                </section>
              }
            />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  );
}
