import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function Product({ product }) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <div className="product-media">
        <span className="product-category">{product.category}</span>
        <img src={product.image} alt={product.title} loading="lazy" />
        <button
          className={`quick-add ${added ? 'added' : ''}`}
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${product.title} to bag`}
        >
          {added ? 'Added ✓' : 'Quick add +'}
        </button>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-meta">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <span aria-label={`${product.rating?.rate || 0} out of 5 stars`}>
            ★ {product.rating?.rate || 'New'}
          </span>
        </div>
      </div>
    </article>
  );
}
