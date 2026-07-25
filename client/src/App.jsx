import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { Link, NavLink, RouterProvider, useRoute } from './contexts/RouterContext';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function BrandMark() {
  return (
    <Link className="brand" to="/" aria-label="Brad's Store home">
      <span className="brand-mark">B</span>
      <span>
        <strong>BRAD'S</strong>
        <small>OBJECTS FOR EVERYDAY</small>
      </span>
    </Link>
  );
}

function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useRoute();

  return (
    <header className="site-header">
      <div className="announcement">
        Complimentary shipping on orders over $75
      </div>
      <div className="nav-shell">
        <BrandMark />
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/" end>Shop</NavLink>
          <a href="/#new-arrivals">New arrivals</a>
          <a href="/#about">Our story</a>
        </nav>
        <div className="nav-actions">
          {user ? (
            <button className="text-button" type="button" onClick={logout}>
              Sign out
            </button>
          ) : (
            <Link className="text-link" to="/login" state={{ from: location.pathname }}>
              Account
            </Link>
          )}
          <Link className="bag-link" to="/cart" aria-label={`Shopping bag with ${itemCount} items`}>
            Bag <span>{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function ThankYou() {
  const location = useRoute();
  const orderNumber = location.state?.orderNumber || 'BS-2026';

  return (
    <main className="confirmation page-shell">
      <p className="eyebrow">Order confirmed</p>
      <h1>Thank you for shopping thoughtfully.</h1>
      <p>
        Your order <strong>{orderNumber}</strong> is in. A confirmation has been
        prepared for your records.
      </p>
      <Link className="primary-button" to="/">Continue shopping</Link>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-grid">
        <div>
          <BrandMark />
          <p>Well-made objects for the way you live, work, and wander.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/">All products</Link>
          <Link to="/cart">Your bag</Link>
          <Link to="/signup">Create an account</Link>
        </div>
        <div>
          <h2>Stay in the loop</h2>
          <p>New objects, small stories, and considered recommendations.</p>
          <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Email address" />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Brad's Store</span>
        <span>Built with care by Brad Travers</span>
      </div>
    </footer>
  );
}

function RouteView() {
  const { pathname } = useRoute();

  if (pathname === '/login') return <Login />;
  if (pathname === '/signup') return <Signup />;
  if (pathname === '/cart') return <Cart />;
  if (pathname === '/checkout') return <Checkout />;
  if (pathname === '/thank-you') return <ThankYou />;
  return <ProductList />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider>
          <Header />
          <RouteView />
          <Footer />
        </RouterProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
