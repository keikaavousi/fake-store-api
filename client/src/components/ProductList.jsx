import React, { useEffect, useMemo, useState } from 'react';
import Product from './Product';
import { fetchProducts } from '../services/apiService';

const categoryLabels = {
  all: 'All objects',
  electronics: 'Technology',
  jewelery: 'Jewelry',
  "men's clothing": "Men's",
  "women's clothing": "Women's",
};

function ProductSkeleton() {
  return (
    <div className="product-card product-skeleton" aria-hidden="true">
      <div className="skeleton-image" />
      <div className="skeleton-line short" />
      <div className="skeleton-line" />
      <div className="skeleton-line medium" />
    </div>
  );
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    fetchProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch(() => {
        if (active) setError('We could not load the collection. Please try again shortly.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery = !normalizedQuery
        || product.title.toLowerCase().includes(normalizedQuery)
        || product.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      return a.id - b.id;
    });
  }, [category, products, query, sortBy]);

  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">The everyday collection · 2026</p>
          <h1>Useful things.<br /><em>Beautifully chosen.</em></h1>
          <p className="hero-intro">
            A considered edit of wardrobe staples, clever technology, and
            objects that earn their place in your day.
          </p>
          <a className="primary-button" href="#new-arrivals">Explore the collection</a>
        </div>
        <div className="hero-art" aria-label="A curated collection of everyday objects">
          <div className="hero-shape hero-shape-one">01</div>
          <div className="hero-shape hero-shape-two">BRAD'S</div>
          <div className="hero-note">Selected with purpose<br />Made for real life</div>
        </div>
      </section>

      <section className="benefits" aria-label="Store benefits">
        <span>Thoughtful selection</span>
        <span>30-day returns</span>
        <span>Complimentary shipping over $75</span>
      </section>

      <section className="collection page-shell" id="new-arrivals">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shop the edit</p>
            <h2>Objects worth keeping</h2>
          </div>
          <p>{visibleProducts.length} pieces</p>
        </div>

        <div className="catalog-toolbar">
          <div className="category-tabs" role="group" aria-label="Product categories">
            {Object.entries(categoryLabels).map(([value, label]) => (
              <button
                className={category === value ? 'active' : ''}
                key={value}
                type="button"
                onClick={() => setCategory(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="catalog-controls">
            <label>
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the collection"
              />
            </label>
            <label>
              <span className="sr-only">Sort products</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
        </div>

        {error && <div className="status-panel error">{error}</div>}

        <div className="product-grid">
          {loading
            ? Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)
            : visibleProducts.map((product) => <Product key={product.id} product={product} />)}
        </div>

        {!loading && !error && visibleProducts.length === 0 && (
          <div className="status-panel">
            <h3>No objects matched your search.</h3>
            <p>Try another category or a broader search term.</p>
          </div>
        )}
      </section>

      <section className="story-panel">
        <div className="story-number">20</div>
        <div>
          <p className="eyebrow">The Brad's standard</p>
          <h2>Less noise. Better choices.</h2>
          <p>
            We believe a good store should make choosing easier. Every object
            is selected for usefulness, character, and an honest price.
          </p>
        </div>
        <div className="story-number">26</div>
      </section>
    </main>
  );
}
