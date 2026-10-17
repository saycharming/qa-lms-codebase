import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
export default function ProductsPage() {
  const [products, setProducts] = useState([]),
    [search, setSearch] = useState(''),
    [category, setCategory] = useState(''),
    [state, setState] = useState('loading'),
    [error, setError] = useState('');
  useEffect(() => {
    let cancel = false;
    setState('loading');
    const q = new URLSearchParams();
    if (search) q.set('search', search);
    if (category) q.set('category', category);
    api
      .listProducts(q.size ? `?${q}` : '')
      .then((r) => {
        if (!cancel) {
          setProducts(r.data);
          setState('ready');
        }
      })
      .catch((e) => {
        if (!cancel) {
          setError(e.message);
          setState('error');
        }
      });
    return () => {
      cancel = true;
    };
  }, [search, category]);
  return (
    <section data-testid="products-page">
      <h1>Products</h1>
      <div className="toolbar">
        <input
          data-testid="search-input"
          aria-label="Search products"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          aria-label="Category"
          data-testid="category-filter"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>
      </div>
      {state === 'loading' && (
        <p data-testid="products-loading">Loading products...</p>
      )}
      {state === 'error' && (
        <p role="alert" data-testid="products-error">
          {error}
        </p>
      )}
      {state === 'ready' && products.length === 0 && (
        <p data-testid="products-empty">No products found.</p>
      )}
      <div className="grid" data-testid="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
