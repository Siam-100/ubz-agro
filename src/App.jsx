
import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Organic Fertilizer',
    category: 'Fertilizer',
    price: 450,
    oldPrice: 500,
    icon: '🌱',
    description: 'For healthier soil and stronger plant growth.',
  },
  {
    id: 2,
    name: 'Premium Vegetable Seeds',
    category: 'Seeds',
    price: 170,
    oldPrice: 200,
    icon: '🌾',
    description: 'Quality seeds for productive farming.',
  },
  {
    id: 3,
    name: 'Essential Garden Tools',
    category: 'Agricultural Tools',
    price: 360,
    oldPrice: 400,
    icon: '🪴',
    description: 'Reliable tools for everyday gardening.',
  },
]

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      )

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })

    setCartOpen(true)
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )


  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })


  return (
    <div className="website">
      {/* Top bar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-info">
            <span>☎ +880 1700-000000</span>
            <span>📍 Bangladesh</span>
          </div>
          <span>বাংলা | English</span>
        </div>
      </div>

      {/* Header */}
      <header className="main-header">
        <div className="container header-inner">
          <a href="#" className="brand">
            <span className="brand-icon">U</span>
            <span className="brand-name">
              UBZ<span> Agro</span>
              <small>GROWING A BETTER FUTURE</small>
            </span>
          </a>

          <form
            className="search-box"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="Search agricultural products..."
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="header-actions">
            <button
              className="header-action"
              type="button"
              onClick={() => alert('Wishlist feature will be added later.')}
            >
              <span className="action-icon">♡</span>
              <span>Wishlist</span>
            </button>

            <button
              className="header-action cart-header-button"
              type="button"
              onClick={() => setCartOpen(true)}
            >
              <span className="action-icon">🛒</span>
              <span>Cart</span>
              <span className="cart-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <div className="container nav-inner">
          <a className="nav-link active" href="#">Home</a>
          <a className="nav-link" href="#products">Products</a>
          <a className="nav-link" href="#about">About Us</a>
          <a className="nav-link" href="#services">Our Services</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero-banner">
          <div className="hero-overlay">
            <div className="container hero-content">
              <p className="eyebrow">
                YOUR TRUSTED AGRICULTURE PARTNER
              </p>

              <h1>
                কৃষির উন্নতিতে
                <br />
                <span>UBZ Agro</span>
              </h1>

              <p className="hero-description">
                Quality agricultural products for better crops,
                healthier soil and a greener future.
              </p>

              <a href="#products" className="primary-button">
                আমাদের পণ্য দেখুন →
              </a>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="products-section" id="products">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">OUR COLLECTION</p>
                <h2>আমাদের পণ্যসমূহ</h2>
                <p className="section-subtitle">
                  Quality products for every growing season.
                </p>
              </div>
              <span className="product-total">

                {filteredProducts.length} Products
              </span>
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-filter ${selectedCategory === category ? 'selected' : ''
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'All' ? 'All Products' : category}
                </button>
              ))}
            </div>


            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article className="product-card" key={product.id}>
                    <div className="product-image product-placeholder">
                      <span className="discount-badge">
                        {Math.round(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                          100
                        )}
                        % OFF
                      </span>
                      <span className="placeholder-icon">
                        {product.icon}
                      </span>
                      <span className="placeholder-label">
                        Product image will be added later
                      </span>
                    </div>

                    <div className="product-info">
                      <p className="product-category">
                        {product.category}
                      </p>
                      <h3>{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>

                      <div className="product-price">
                        <strong>৳{product.price}</strong>
                        <del>৳{product.oldPrice}</del>
                      </div>

                      <button
                        className="add-cart-button"
                        type="button"
                        onClick={() => addToCart(product)}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <span>🔎</span>
                <h3>No products found</h3>
                <p>Try searching with another product name.</p>
                <button
                  className="add-cart-button"
                  type="button"
                  onClick={() => setSearch('')}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Company information placeholders */}

        <section className="company-section" id="about">
          <div className="container about-layout">
            <div className="about-content">
              <p className="eyebrow">ABOUT UBZ AGRO</p>

              <h2>
                Growing Together,
                <br />
                <span>Growing Better.</span>
              </h2>

              <p className="about-description">
                UBZ Agro is committed to supporting agriculture
                through quality products and dependable service.
                Our goal is to help farmers grow with confidence
                and build a greener future.
              </p>

              <a href="#services" className="primary-button">
                Learn More →
              </a>
            </div>

            <div className="about-visual">
              <div className="about-icon">🌱</div>
              <p>Growing a Better Future</p>
              <span>Quality • Trust • Agriculture</span>
            </div>
          </div>
        </section>



        <section className="services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">WHAT WE DO</p>
              <h2>Our <span>Services</span></h2>
              <p>
                We provide reliable agricultural products and support
                for farmers, gardeners, and growing businesses.
              </p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🌱</div>
                <h3>Quality Seeds</h3>
                <p>
                  Discover quality seeds for healthy plants
                  and productive farming.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">🌾</div>
                <h3>Fertilizers</h3>
                <p>
                  Find agricultural fertilizers for your
                  farming and gardening needs.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">🚜</div>
                <h3>Farm Supplies</h3>
                <p>
                  Explore useful tools and essential supplies
                  for everyday agricultural work.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <section className="cta-section">
        <div className="container cta-content">
          <div>
            <p className="eyebrow">LET'S GROW TOGETHER</p>
            <h2>Ready to Grow with UBZ Agro?</h2>
            <p>
              Explore our agricultural products and find
              what your farm or garden needs.
            </p>
          </div>

          <a href="#products" className="cta-button">
            Explore Products →
          </a>
        </div>
      </section>


      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h2>UBZ <span>AGRO</span></h2>
            <p>
              Supporting agriculture with quality products
              and dependable service.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About Us</a>
            <a href="#services">Our Services</a>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>
            <p>Email: info@ubzagro.com</p>
            <p>For product and order enquiries, contact our team.</p>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} UBZ Agro. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div>
                <h2>Your Cart</h2>
                <p>{cartCount} item(s)</p>
              </div>
              <button
                className="close-cart"
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>Add products to see them here.</p>
                <button
                  className="add-cart-button"
                  type="button"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-icon">
                        {item.icon}
                      </div>

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>৳{item.price} each</p>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => addToCart(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-end">
                        <strong>৳{item.price * item.quantity}</strong>
                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="subtotal-row">
                    <span>Subtotal</span>
                    <strong>৳{subtotal}</strong>
                  </div>
                  <p>Delivery charges will be calculated later.</p>
                  <button
                    className="checkout-button"
                    type="button"
                    onClick={() =>
                      alert('Checkout will be added in a later step.')
                    }
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="continue-button"
                    type="button"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

export default App
