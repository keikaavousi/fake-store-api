import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from '../contexts/RouterContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;

  if (cart.length === 0) {
    return (
      <main className="empty-state page-shell">
        <p className="eyebrow">Your bag</p>
        <h1>Room for something good.</h1>
        <p>Your bag is empty. Explore the collection and choose an object worth keeping.</p>
        <Link className="primary-button" to="/">Shop the collection</Link>
      </main>
    );
  }

  return (
    <main className="cart-page page-shell">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Your selection</p>
          <h1>Shopping bag</h1>
        </div>
        <Link to="/">Continue shopping</Link>
      </div>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cart.map((item) => (
            <article className="cart-line" key={item.id}>
              <div className="cart-image">
                <img src={item.image} alt="" />
              </div>
              <div className="cart-copy">
                <p className="eyebrow">{item.category}</p>
                <h2>{item.title}</h2>
                <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
              <label className="quantity-field">
                <span>Quantity</span>
                <select
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.id, event.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6].map((quantity) => (
                    <option value={quantity} key={quantity}>{quantity}</option>
                  ))}
                </select>
              </label>
              <strong className="line-price">
                ${(Number(item.price) * item.quantity).toFixed(2)}
              </strong>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <p className="eyebrow">Order summary</p>
          <h2>Almost yours</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div><dt>Shipping</dt><dd>{shipping ? `$${shipping.toFixed(2)}` : 'Complimentary'}</dd></div>
            <div className="summary-total">
              <dt>Total</dt>
              <dd>${(subtotal + shipping).toFixed(2)}</dd>
            </div>
          </dl>
          {subtotal < 75 && (
            <p className="shipping-note">
              Add ${(75 - subtotal).toFixed(2)} more for complimentary shipping.
            </p>
          )}
          <button className="primary-button full-width" type="button" onClick={() => navigate('/checkout')}>
            Continue to checkout
          </button>
          <p className="fine-print">Secure demo checkout · No payment will be collected</p>
        </aside>
      </div>
    </main>
  );
}
