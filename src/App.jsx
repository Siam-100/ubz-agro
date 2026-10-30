import { useState, useEffect } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'ব্লাক রাইসের বীজ',
    category: 'Organic Food',
    price: null,
    variants: [
      { weight: '১ কেজি', price: 700 },
      { weight: '২ কেজি', price: 1350 },
      { weight: '৩ কেজি', price: 1800 },
      { weight: '৫ কেজি', price: 3000 },
    ],
    icon: '🌾',
    description: 'চাষের জন্য ভিয়েতনামী জাতের ব্লাক রাইসের বীজ।',
  },
  {
    id: 2,
    name: 'ব্লাক গার্লিক',
    category: 'Organic Food',
    price: null,
    variants: [
      { weight: '৫০ গ্রাম', price: 140 },
      { weight: '১০০ গ্রাম', price: 260 },
      { weight: '২০০ গ্রাম', price: 520 },
      { weight: '২৫০ গ্রাম', price: 630 },
      { weight: '৫০০ গ্রাম', price: 1250 },
      { weight: '১ কেজি', price: 2500 },
    ],
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
  const [selectedVariants, setSelectedVariants] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function handleSearch(event) {
    event.preventDefault()

    setTimeout(() => {
      const firstProduct = document.querySelector(
        '#products .product-card'
      )

      if (firstProduct) {
        firstProduct.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      } else {
        document.getElementById('products')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 0)
  }

  function addToCart(product, variant = null) {
    const selectedPrice = variant
      ? variant.price
      : product.price

    const selectedWeight = variant
      ? variant.weight
      : null

    const cartKey = variant
      ? `${product.id}-${variant.weight}`
      : `${product.id}-default`

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.cartKey === cartKey
      )

      if (existing) {
        return currentCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          price: selectedPrice,
          selectedWeight,
          cartKey,
          quantity: 1,
        },
      ]
    })

    setCartOpen(true)
  }

  function decreaseQuantity(cartKey) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(cartKey) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.cartKey !== cartKey)
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const subtotal = cart.reduce(
    (total, item) =>
      total + (item.price ?? 0) * item.quantity,
    0
  )

  const hasUnpricedItems = cart.some(
    (item) => item.price == null || item.price <= 0
  )

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase()

    const searchableText =
      `${product.name} ${product.category} ${product.description}`

    const matchesSearch = searchableText
      .toLowerCase()
      .includes(searchTerm)

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className={`website ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Top Bar */}
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
            <img
              src="/ubz-logo.png"
              alt="UBZ Agro Logo"
              className="brand-logo"
            />

            <span className="brand-name">
              UBZ <span>Agro</span>
            </span>
          </a>

          <form className="search-box" onSubmit={handleSearch}>
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

            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkMode((current) => !current)}
              aria-label={
                darkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
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

      <main>
        {/* Hero Banner */}
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
                {filteredProducts.map((product) => {
                  const selectedWeight =
                    selectedVariants[product.id] ??
                    product.variants?.[0]?.weight ??
                    ''

                  const selectedVariant = product.variants?.find(
                    (variant) => variant.weight === selectedWeight
                  )

                  return (
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

                        {/* Price */}

                        {/* Price */}
                        <div className="product-price">
                          {product.variants ? (
                            <strong>ওজন ও দাম Cart-এ নির্বাচন করুন</strong>
                          ) : (
                            <strong>দাম জানতে যোগাযোগ করুন</strong>
                          )}
                        </div>

                        <button
                          className="add-cart-button"
                          type="button"
                          onClick={() =>
                            addToCart(product, selectedVariant ?? null)
                          }
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </article>
                  )
                })}
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

      {/* Cart Drawer */}
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
                    <div className="cart-item" key={item.cartKey}>
                      <div className="cart-item-icon">
                        {item.icon}
                      </div>

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>

                        {item.variants && (
                          <div className="cart-weight-selector">
                            <label htmlFor={`cart-weight-${item.cartKey}`}>
                              ওজন নির্বাচন:
                            </label>

                            <select
                              id={`cart-weight-${item.cartKey}`}
                              value={item.selectedWeight || item.variants[0].weight}
                              onChange={(event) => {
                                const newWeight = event.target.value
                                const newVariant = item.variants.find(
                                  (variant) => variant.weight === newWeight
                                )

                                if (!newVariant) return

                                setCart((currentCart) =>
                                  currentCart.map((cartItem) =>
                                    cartItem.cartKey === item.cartKey
                                      ? {
                                        ...cartItem,
                                        selectedWeight: newVariant.weight,
                                        price: newVariant.price,
                                        cartKey: `${cartItem.id}-${newVariant.weight}`,
                                      }
                                      : cartItem
                                  )
                                )
                              }}
                            >
                              {item.variants.map((variant) => (
                                <option key={variant.weight} value={variant.weight}>
                                  {variant.weight} — ৳
                                  {variant.price.toLocaleString('en-IN')}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <p className="cart-item-unit-price">
                          {item.price != null && item.price > 0
                            ? `৳${item.price.toLocaleString('en-IN')} / প্যাক`
                            : 'দাম জানতে যোগাযোগ করুন'}
                        </p>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => decreaseQuantity(item.cartKey)}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() =>
                              addToCart(
                                item,
                                item.selectedWeight
                                  ? {
                                    weight: item.selectedWeight,
                                    price: item.price,
                                  }
                                  : null
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-end">
                        <strong>
                          {item.price != null && item.price > 0
                            ? `৳${(
                              item.price * item.quantity
                            ).toLocaleString('en-IN')}`
                            : 'দাম নির্ধারণ হবে'}
                        </strong>

                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => removeFromCart(item.cartKey)}
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
                      {hasUnpricedItems
                        ? `৳${subtotal.toLocaleString('en-IN')} + অন্যান্য পণ্যের দাম`
                        : `৳${subtotal.toLocaleString('en-IN')}`}
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
                        'অনলাইন অর্ডার সম্পন্ন করতে Checkout ব্যবস্থা যোগ করতে হবে।'
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

      {/* Back to Top */}
      {showBackToTop && (
        <button
          type="button"
          className="back-to-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App
