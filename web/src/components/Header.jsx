import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { useCart } from './CartContext.jsx';
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/" data-testid="nav-home">
        ShopDesk
      </Link>
      <nav>
        <Link to="/" data-testid="nav-products">
          Products
        </Link>
        <Link to="/cart" data-testid="nav-cart">
          Cart <span data-testid="cart-count">{count}</span>
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/orders" data-testid="nav-orders">
              My orders
            </Link>
            <span data-testid="nav-user">{user?.name}</span>
            <button
              data-testid="nav-logout"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" data-testid="nav-login">
            Log in
          </Link>
        )}
      </nav>
    </header>
  );
}
