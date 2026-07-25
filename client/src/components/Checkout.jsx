import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from '../contexts/RouterContext';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const orderNumber = `BS-${Date.now().toString().slice(-6)}`;
    clearCart();
    navigate('/thank-you', { replace: true, state: { orderNumber } });
  };

  return (
    <main className="checkout-page page-shell">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Secure demo checkout</p>
          <h1>Where should it go?</h1>
        </div>
        <Link to="/cart">Back to bag</Link>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder}>
          <section>
            <span className="form-step">01</span>
            <div>
              <h2>Contact</h2>
              <label>
                Email address
                <input name="email" type="email" value={formData.email} onChange={updateField} required />
              </label>
            </div>
          </section>

          <section>
            <span className="form-step">02</span>
            <div>
              <h2>Delivery</h2>
              <div className="field-grid">
                <label>First name<input name="firstName" value={formData.firstName} onChange={updateField} required /></label>
                <label>Last name<input name="lastName" value={formData.lastName} onChange={updateField} required /></label>
                <label className="wide">Street address<input name="address" value={formData.address} onChange={updateField} required /></label>
                <label>City<input name="city" value={formData.city} onChange={updateField} required /></label>
                <label>State<input name="state" value={formData.state} onChange={updateField} required /></label>
                <label>ZIP code<input name="zip" inputMode="numeric" value={formData.zip} onChange={updateField} required /></label>
              </div>
            </div>
          </section>

          <section>
            <span className="form-step">03</span>
            <div>
              <h2>Payment</h2>
              <div className="demo-payment">
                <strong>Portfolio demo</strong>
                <p>No payment information is requested or stored.</p>
              </div>
              <button className="primary-button" type="submit">Place demo order · ${subtotal.toFixed(2)}</button>
            </div>
          </section>
        </form>

        <aside className="checkout-summary">
          <p className="eyebrow">{cart.length} selected {cart.length === 1 ? 'object' : 'objects'}</p>
          {cart.map((item) => (
            <div className="mini-line" key={item.id}>
              <img src={item.image} alt="" />
              <div><strong>{item.title}</strong><span>Qty. {item.quantity}</span></div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
        </aside>
      </div>
    </main>
  );
}
