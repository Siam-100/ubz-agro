import { useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'ব্লাক রাইস',
    category: 'Organic Food',
    price: null,
    icon: '🌾',
    description: 'ভিয়েতনামী জাতের ব্লাক রাইস — নিজেদের চাষকৃত।',
  },
  {
    id: 2,
    name: 'ব্লাক গার্লিক',
    category: 'Organic Food',
    price: null,
    icon: '🧄',
    description: 'আমাদের নিজস্বতায় ফার্মেন্টেড ব্লাক গার্লিক।',
  },
  {
    id: 3,
    name: 'দেশি তিল',
    category: 'Organic Food',
    price: null,
    icon: '🌱',
    description: 'নিজেদের চাষকৃত দেশি তিল।',
  },
  {
    id: 4,
    name: 'কালোজিরে',
    category: 'Organic Food',
    price: null,
    icon: '🌿',
    description: 'নিজেদের চাষকৃত কালোজিরে।',
  },
  {
    id: 5,
    name: 'মাসকলাই ডালের গুঁড়া',
    category: 'Organic Food',
    price: null,
    icon: '🥣',
    description: 'নিজেদের চাষকৃত মাসকলাই থেকে তৈরি ডালের গুঁড়া।',
  },
  {
    id: 6,
    name: 'পাবনার গাওয়া ঘি',
    category: 'Organic Food',
    price: null,
    icon: '🫙',
    description: 'পাবনার গাওয়া ঘি।',
  },
  {
    id: 7,
    name: 'প্রাকৃতিক চাকের মধু',
    category: 'Organic Food',
    price: null,
    icon: '🍯',
    description: 'বিভিন্ন ফুলের প্রাকৃতিক চাকের মধু।',
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
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  )

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.category} ${product.description}`
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
            <span>📍 বাংলাদেশ</span>
            <span>🌿 প্রাকৃতিক খাদ্যপণ্য</span>
          </div>
          <span>আলহামদুলিল্লাহ, আমাদের পণ্যসমূহ</span>
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
              placeholder="অর্গানিক খাবারের নাম লিখে খুঁজুন..."
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
              onClick={() =>
                alert('Wishlist feature will be added later.')
              }
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
          <a className="nav-link active" href="#">
            Home
          </a>
          <a className="nav-link" href="#products">
            Products
          </a>
          <a className="nav-link" href="#about">
            About Us
          </a>
          <a className="nav-link" href="#services">
            Our Services
          </a>
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero-banner">
          <div className="hero-overlay">
            <div className="container hero-content">
              <p className="eyebrow">
                NATURAL FOOD • TRUSTED QUALITY
              </p>

              <h1>
                প্রাকৃতিক খাবারের
                <br />
                <span>বিশ্বস্ত ঠিকানা</span>
              </h1>

              <p className="hero-description">
                UBZ Agro-তে পাবেন নিজেদের চাষকৃত ফসল এবং
                বাছাই করা প্রাকৃতিক খাদ্যপণ্য।
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
                  আমাদের নিজস্ব চাষের পণ্য ও প্রাকৃতিক খাবার এক জায়গায়।
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
                      <span className="placeholder-icon">
                        {product.icon}
                      </span>
                      <span className="placeholder-label">
                        পণ্যের ছবি শিগগিরই যোগ করা হবে
                      </span>
                    </div>

                    <div className="product-info">
                      <p className="product-category">
                        আমাদের পণ্য
                      </p>

                      <h3>{product.name}</h3>

                      <p className="product-description">
                        {product.description}
                      </p>

                      <div className="product-price">
                        {product.price != null && product.price > 0 ? (
                          <strong>৳{product.price}</strong>
                        ) : (
                          <strong>দাম জানতে যোগাযোগ করুন</strong>
                        )}
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
                <h3>কোনো পণ্য পাওয়া যায়নি</h3>
                <p>অন্য কোনো পণ্যের নাম দিয়ে খুঁজে দেখুন।</p>

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

        {/* About Us */}
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
                UBZ Agro-তে আমরা আপনাদের কাছে পৌঁছে দিতে চাই
                নিজেদের চাষকৃত ফসল ও যত্নসহকারে বাছাই করা
                প্রাকৃতিক খাদ্যপণ্য। গুণমান, সততা ও আস্থাই
                আমাদের পথচলার মূল ভিত্তি।
              </p>

              <a href="#products" className="primary-button">
                আমাদের পণ্য দেখুন →
              </a>
            </div>

            <div className="about-visual">
              <div className="about-icon">🌱</div>
              <p>প্রকৃতির কাছাকাছি, আপনার পরিবারের জন্য</p>
              <span>গুণমান • সততা • আস্থা</span>
            </div>
          </div>
        </section>

        {/* Our Specialties */}
        <section className="services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">WHY UBZ AGRO</p>
              <h2>
                আমাদের <span>বিশেষত্ব</span>
              </h2>
              <p>
                আমাদের পণ্য সম্পর্কে জানুন এবং আপনার প্রয়োজন অনুযায়ী
                অর্ডার দিতে যোগাযোগ করুন।
              </p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🌾</div>
                <h3>নিজেদের চাষকৃত পণ্য</h3>
                <p>
                  ব্লাক রাইস, দেশি তিল ও কালোজিরের মতো
                  নিজেদের চাষকৃত পণ্য।
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">🧄</div>
                <h3>নিজস্ব প্রক্রিয়াজাত পণ্য</h3>
                <p>
                  আমাদের নিজস্বতায় ফার্মেন্টেড ব্লাক গার্লিক
                  এবং নির্বাচিত খাদ্যপণ্য।
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">🍯</div>
                <h3>প্রাকৃতিক খাদ্যপণ্য</h3>
                <p>
                  প্রাকৃতিক চাকের মধু ও পাবনার গাওয়া ঘির মতো
                  নির্বাচিত পণ্য।
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container cta-content">
          <div>
            <p className="eyebrow">
              আপনার পছন্দের পণ্য বেছে নিন
            </p>

            <h2>প্রাকৃতিক খাবারের জন্য UBZ Agro</h2>

            <p>
              আমাদের পণ্য দেখুন। দাম ও অর্ডারের তথ্য জানতে
              আমাদের সঙ্গে যোগাযোগ করুন।
            </p>
          </div>

          <a href="#products" className="cta-button">
            Explore Products →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h2>
              UBZ <span>AGRO</span>
            </h2>

            <p>
              নিজেদের চাষকৃত ফসল ও নির্বাচিত প্রাকৃতিক
              খাদ্যপণ্য নিয়ে UBZ Agro।
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <a href="#">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About Us</a>
            <a href="#services">Our Services</a>
          </div>

          <div className="footer-contact" id="contact">
            <h3>Contact</h3>
            <p>
              পণ্যের দাম ও অর্ডার জানতে আমাদের সঙ্গে যোগাযোগ করুন।
            </p>
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

                        <p>
                          {item.price != null && item.price > 0
                            ? `৳${item.price} প্রতিটি`
                            : 'দাম জানতে যোগাযোগ করুন'}
                        </p>

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
                        <strong>
                          {item.price != null && item.price > 0
                            ? `৳${item.price * item.quantity}`
                            : 'দাম নির্ধারণ হবে'}
                        </strong>

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

                    <strong>
                      {cart.every(
                        (item) =>
                          item.price == null || item.price <= 0
                      )
                        ? 'দাম নির্ধারণ হবে'
                        : `৳${subtotal}`}
                    </strong>
                  </div>

                  <p>
                    Delivery charges will be calculated later.
                  </p>

                  <button
                    className="checkout-button"
                    type="button"
                    onClick={() =>
                      alert(
                        'অর্ডার করতে পণ্যের দাম ও যোগাযোগের তথ্য যোগ করতে হবে।'
                      )
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