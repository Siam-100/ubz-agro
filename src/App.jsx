
import { useState, useEffect } from 'react'
import './App.css'
import FAQ from './FAQ'

const products = [
  {
    id: 1,
    name: 'ব্লাক রাইসের বীজ',
    enName: 'Black Rice Seeds',
    category: 'Organic Food',
    price: null,
    variants: [
      { weight: '১ কেজি', enWeight: '1 kg', price: 700 },
      { weight: '২ কেজি', enWeight: '2 kg', price: 1350 },
      { weight: '৩ কেজি', enWeight: '3 kg', price: 1800 },
      { weight: '৫ কেজি', enWeight: '5 kg', price: 3000 },
    ],
    icon: '🌾',
    description: 'চাষের জন্য ভিয়েতনামী জাতের ব্লাক রাইসের বীজ।',
    enDescription: 'Vietnamese variety black rice seeds for cultivation.',
  },
  {
    id: 2,
    name: 'ব্লাক গার্লিক',
    enName: 'Black Garlic',
    category: 'Organic Food',
    price: null,
    variants: [
      { weight: '৫০ গ্রাম', enWeight: '50 g', price: 140 },
      { weight: '১০০ গ্রাম', enWeight: '100 g', price: 260 },
      { weight: '২০০ গ্রাম', enWeight: '200 g', price: 520 },
      { weight: '২৫০ গ্রাম', enWeight: '250 g', price: 630 },
      { weight: '৫০০ গ্রাম', enWeight: '500 g', price: 1250 },
      { weight: '১ কেজি', enWeight: '1 kg', price: 2500 },
    ],
    icon: '🧄',
    description: 'আমাদের নিজস্বতায় ফার্মেন্টেড ব্লাক গার্লিক।',
    enDescription: 'Our own carefully fermented black garlic.',
  },
  {
    id: 3,
    name: 'দেশি তিল',
    enName: 'Local Sesame Seeds',
    category: 'Organic Food',
    price: null,
    icon: '🌱',
    description: 'নিজেদের চাষকৃত দেশি তিল।',
    enDescription: 'Locally grown sesame seeds from our own cultivation.',
  },
  {
    id: 4,
    name: 'কালোজিরে',
    enName: 'Black Cumin',
    category: 'Organic Food',
    price: null,
    icon: '🌿',
    description: 'নিজেদের চাষকৃত কালোজিরে।',
    enDescription: 'Black cumin grown on our own farm.',
  },
  {
    id: 5,
    name: 'মাসকলাই ডালের গুঁড়া',
    enName: 'Mashkalai Lentil Powder',
    category: 'Organic Food',
    price: null,
    icon: '🥣',
    description: 'নিজেদের চাষকৃত মাসকলাই থেকে তৈরি ডালের গুঁড়া।',
    enDescription: 'Lentil powder made from our own cultivated mashkalai.',
  },
  {
    id: 6,
    name: 'পাবনার গাওয়া ঘি',
    enName: 'Pabna Traditional Ghee',
    category: 'Organic Food',
    price: null,
    icon: '🫙',
    description: 'পাবনার গাওয়া ঘি।',
    enDescription: 'Traditional ghee from Pabna.',
  },
  {
    id: 7,
    name: 'প্রাকৃতিক চাকের মধু',
    enName: 'Natural Honeycomb Honey',
    category: 'Organic Food',
    price: null,
    icon: '🍯',
    description: 'বিভিন্ন ফুলের প্রাকৃতিক চাকের মধু।',
    enDescription: 'Natural honeycomb honey collected from different flowers.',
  },
]

const translations = {
  bn: {
    topLocation: 'বাংলাদেশ',
    naturalProducts: 'প্রাকৃতিক খাদ্যপণ্য',
    topMessage: 'আলহামদুলিল্লাহ, আমাদের পণ্যসমূহ',
    searchPlaceholder: 'অর্গানিক খাবারের নাম লিখে খুঁজুন...',
    search: 'খুঁজুন',
    wishlist: 'উইশলিস্ট',
    cart: 'কার্ট',
    home: 'হোম',
    products: 'পণ্যসমূহ',
    about: 'আমাদের সম্পর্কে',
    services: 'আমাদের সেবাসমূহ',
    faq: 'সাধারণ জিজ্ঞাসা',
    contact: 'যোগাযোগ',
    heroTitle: 'প্রাকৃতিক খাবারের',
    heroHighlight: 'বিশ্বস্ত ঠিকানা',
    heroDescription: 'UBZ Agro-তে পাবেন নিজেদের চাষকৃত ফসল এবং বাছাই করা প্রাকৃতিক খাদ্যপণ্য।',
    viewProducts: 'আমাদের পণ্য দেখুন',
    collection: 'আমাদের সংগ্রহ',
    productTitle: 'আমাদের পণ্যসমূহ',
    productSubtitle: 'আমাদের নিজস্ব চাষের পণ্য ও প্রাকৃতিক খাবার এক জায়গায়।',
    allProducts: 'সকল পণ্য',
    productImage: 'পণ্যের ছবি শিগগিরই যোগ করা হবে',
    ourProduct: 'আমাদের পণ্য',
    selectPrice: 'ওজন ও দাম Cart-এ নির্বাচন করুন',
    contactForPrice: 'দাম জানতে যোগাযোগ করুন',
    addToCart: 'কার্টে যোগ করুন',
    noProduct: 'কোনো পণ্য পাওয়া যায়নি',
    noProductText: 'অন্য কোনো পণ্যের নাম দিয়ে খুঁজে দেখুন।',
    clearSearch: 'সার্চ মুছে ফেলুন',
    customerReviews: 'গ্রাহকদের মতামত',
    reviewTitle: 'গ্রাহকদের মতামত',
    reviewSubtitle: 'UBZ Agro সম্পর্কে আপনার অভিজ্ঞতা ও মতামত জানান।',
    writeReview: 'আপনার মতামত লিখুন',
    yourName: 'আপনার নাম',
    namePlaceholder: 'আপনার নাম লিখুন',
    yourRating: 'আপনার রেটিং',
    yourExperience: 'আপনার অভিজ্ঞতা',
    reviewPlaceholder: 'আপনার মতামত লিখুন...',
    submitReview: 'মতামত জমা দিন',
    customerFeedback: 'গ্রাহকদের প্রতিক্রিয়া',
    showLess: 'কম দেখুন',
    showMore: 'আরও দেখুন',
    noReviews: 'এখনো কোনো মতামত নেই',
    firstReview: 'প্রথম মতামতটি আপনিই লিখুন।',
    aboutEyebrow: 'UBZ AGRO সম্পর্কে',
    aboutDescription: 'UBZ AGRO একটি কৃষি ও প্রাকৃতিক খাদ্যপণ্যভিত্তিক প্রতিষ্ঠান। আমাদের মূল লক্ষ্য হলো মানুষের কাছে নিরাপদ, স্বাস্থ্যসম্মত ও মানসম্মত খাদ্যপণ্য পৌঁছে দেওয়া। আমরা নিজেদের চাষকৃত ফসল এবং যত্নসহকারে সংগ্রহ করা বিভিন্ন কৃষিভিত্তিক পণ্য সরবরাহ করি। আমাদের পণ্যের মধ্যে রয়েছে তাজা কৃষিপণ্য, শাকসবজি, ফলমূল, শস্যদানা, মসলা এবং অন্যান্য প্রাকৃতিক খাদ্যপণ্য। পণ্যের গুণমান, সতেজতা ও বিশুদ্ধতা বজায় রাখার পাশাপাশি কৃষক ও ভোক্তার মধ্যে একটি নির্ভরযোগ্য সম্পর্ক তৈরি করাও আমাদের অন্যতম লক্ষ্য।',
    whyUs: 'কেন UBZ AGRO',
    specialties: 'আমাদের বিশেষত্ব',
    specialtiesText: 'আমাদের পণ্য সম্পর্কে জানুন এবং আপনার প্রয়োজন অনুযায়ী অর্ডার দিতে যোগাযোগ করুন।',
    ownProducts: 'নিজেদের চাষকৃত পণ্য',
    ownProductsText: 'ব্লাক রাইস, দেশি তিল ও কালোজিরের মতো নিজেদের চাষকৃত পণ্য।',
    processedProducts: 'নিজস্ব প্রক্রিয়াজাত পণ্য',
    processedProductsText: 'আমাদের নিজস্বতায় ফার্মেন্টেড ব্লাক গার্লিক এবং নির্বাচিত খাদ্যপণ্য।',
    naturalProductsTitle: 'প্রাকৃতিক খাদ্যপণ্য',
    naturalProductsText: 'প্রাকৃতিক চাকের মধু ও পাবনার গাওয়া ঘির মতো নির্বাচিত পণ্য।',
    chooseProduct: 'আপনার পছন্দের পণ্য বেছে নিন',
    ctaTitle: 'প্রাকৃতিক খাবারের জন্য UBZ Agro',
    ctaText: 'আমাদের পণ্য দেখুন। দাম ও অর্ডারের তথ্য জানতে আমাদের সঙ্গে যোগাযোগ করুন।',
    explore: 'পণ্য দেখুন',
    quickLinks: 'গুরুত্বপূর্ণ লিংক',
    contactUs: 'যোগাযোগ করুন',
    contactText: 'পণ্যের দাম ও অর্ডার জানতে আমাদের সঙ্গে যোগাযোগ করুন।',
    location: 'কাজিপাড়া, সিরাজগঞ্জ, বাংলাদেশ',
    footerDescription: 'নিজেদের চাষকৃত তাজা ফসল ও বাছাইকৃত প্রাকৃতিক খাদ্যপণ্য নিয়ে UBZ Agro। গুণগত মান, বিশুদ্ধতা ও সতেজতা বজায় রেখে আপনাদের কাছে পৌঁছে দেওয়াই আমাদের লক্ষ্য।',
    rights: 'সর্বস্বত্ব সংরক্ষিত।',
    yourCart: 'আপনার কার্ট',
    items: 'টি পণ্য',
    closeCart: 'কার্ট বন্ধ করুন',
    emptyCart: 'আপনার কার্ট খালি',
    emptyCartText: 'এখানে পণ্য দেখতে কার্টে যোগ করুন।',
    continueShopping: 'কেনাকাটা চালিয়ে যান',
    selectWeight: 'ওজন নির্বাচন:',
    perPack: '/ প্যাকেট',
    priceContact: 'দাম জানতে যোগাযোগ করুন',
    priceToBeSet: 'দাম নির্ধারণ হবে',
    decrease: 'পরিমাণ কমান',
    increase: 'পরিমাণ বাড়ান',
    remove: 'বাদ দিন',
    subtotal: 'সর্বমোট',
    otherProducts: '+ অন্যান্য পণ্যের দাম',
    delivery: 'ডেলিভারি চার্জ পরে নির্ধারণ করা হবে।',
    checkout: 'অর্ডার সম্পন্ন করুন',
    wishlistAlert: 'উইশলিস্ট ফিচারটি পরবর্তীতে যোগ করা হবে।',
    checkoutAlert: 'অনলাইন অর্ডার সম্পন্ন করতে Checkout ব্যবস্থা যোগ করতে হবে।',
    darkMode: 'ডার্ক মোড চালু করুন',
    lightMode: 'লাইট মোড চালু করুন',
    backToTop: 'উপরে ফিরে যান',
    star: 'স্টার',
    reviewRequired: 'আপনার নাম ও মতামত লিখুন।',
  },

  en: {
    topLocation: 'Bangladesh',
    naturalProducts: 'Natural Food Products',
    topMessage: 'Alhamdulillah, Explore Our Products',
    searchPlaceholder: 'Search for organic food products...',
    search: 'Search',
    wishlist: 'Wishlist',
    cart: 'Cart',
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    services: 'Our Services',
    faq: 'FAQ',
    contact: 'Contact',
    heroTitle: 'Your Trusted Destination for',
    heroHighlight: 'Natural Food',
    heroDescription: 'Discover our own cultivated crops and carefully selected natural food products at UBZ Agro.',
    viewProducts: 'Explore Our Products',
    collection: 'OUR COLLECTION',
    productTitle: 'Our Products',
    productSubtitle: 'Our own cultivated crops and natural food products in one place.',
    allProducts: 'All Products',
    productImage: 'Product image coming soon',
    ourProduct: 'Our Product',
    selectPrice: 'Select weight and price in Cart',
    contactForPrice: 'Contact us for price',
    addToCart: 'Add to Cart',
    noProduct: 'No products found',
    noProductText: 'Try searching with another product name.',
    clearSearch: 'Clear Search',
    customerReviews: 'CUSTOMER REVIEWS',
    reviewTitle: 'Customer Reviews',
    reviewSubtitle: 'Share your experience and feedback about UBZ Agro.',
    writeReview: 'Write Your Review',
    yourName: 'Your Name',
    namePlaceholder: 'Enter your name',
    yourRating: 'Your Rating',
    yourExperience: 'Your Experience',
    reviewPlaceholder: 'Write your feedback...',
    submitReview: 'Submit Review',
    customerFeedback: 'Customer Feedback',
    showLess: 'Show Less',
    showMore: 'Show More',
    noReviews: 'No reviews yet',
    firstReview: 'Be the first to share your feedback.',
    aboutEyebrow: 'ABOUT UBZ AGRO',
    aboutDescription: 'UBZ AGRO is an agriculture and natural food-based business. Our main goal is to provide people with safe, healthy, and quality food products. We offer our own farm-grown crops and carefully sourced agricultural products. Our product range includes fresh produce, vegetables, fruits, grains, spices, and other natural food items. Along with maintaining product quality, freshness, and purity, we also aim to build a reliable connection between farmers and consumers.',
    whyUs: 'WHY UBZ AGRO',
    specialties: 'Our Specialties',
    specialtiesText: 'Learn about our products and contact us to place an order according to your needs.',
    ownProducts: 'Our Own Cultivated Products',
    ownProductsText: 'Our own cultivated products, including black rice, local sesame seeds, and black cumin.',
    processedProducts: 'Our Own Processed Products',
    processedProductsText: 'Our own fermented black garlic and carefully selected food products.',
    naturalProductsTitle: 'Natural Food Products',
    naturalProductsText: 'Selected products such as natural honeycomb honey and traditional Pabna ghee.',
    chooseProduct: 'Choose Your Favourite Products',
    ctaTitle: 'UBZ Agro for Natural Food',
    ctaText: 'Explore our products and contact us for pricing and order information.',
    explore: 'Explore Products',
    quickLinks: 'Quick Links',
    contactUs: 'Contact Us',
    contactText: 'Contact us for product prices and order information.',
    location: 'Kazipara, Sirajganj, Bangladesh',
    footerDescription: 'UBZ Agro offers freshly grown crops and carefully selected natural food products. Our goal is to deliver quality, freshness, and purity to your everyday life.',
    rights: 'All rights reserved.',
    yourCart: 'Your Cart',
    items: 'item(s)',
    closeCart: 'Close cart',
    emptyCart: 'Your cart is empty',
    emptyCartText: 'Add products to see them here.',
    continueShopping: 'Continue Shopping',
    selectWeight: 'Select Weight:',
    perPack: '/ pack',
    priceContact: 'Contact us for price',
    priceToBeSet: 'Price to be confirmed',
    decrease: 'Decrease',
    increase: 'Increase',
    remove: 'Remove',
    subtotal: 'Subtotal',
    otherProducts: '+ other product prices',
    delivery: 'Delivery charges will be calculated later.',
    checkout: 'Proceed to Checkout',
    wishlistAlert: 'Wishlist feature will be added later.',
    checkoutAlert: 'An online checkout system needs to be added to complete orders.',
    darkMode: 'Switch to dark mode',
    lightMode: 'Switch to light mode',
    backToTop: 'Back to top',
    star: 'Star',
    reviewRequired: 'Please enter your name and review.',
  },
}

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVariants, setSelectedVariants] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState('5')
  const [reviewMessage, setReviewMessage] = useState('')
  const [showAllReviews, setShowAllReviews] = useState(false)

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('ubz-language')
    return savedLanguage === 'en' ? 'en' : 'bn'
  })

  const t = (key) => translations[language][key] || key

  const getProductName = (product) =>
    language === 'en' ? product.enName : product.name

  const getProductDescription = (product) =>
    language === 'en' ? product.enDescription : product.description

  const getWeight = (variant) =>
    language === 'en' ? variant.enWeight : variant.weight

  useEffect(() => {
    localStorage.setItem('ubz-language', language)
  }, [language])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function submitReview(event) {
    event.preventDefault()

    if (!reviewName.trim() || !reviewMessage.trim()) {
      alert(t('reviewRequired'))
      return
    }

    const newReview = {
      id: Date.now(),
      name: reviewName.trim(),
      rating: Number(reviewRating),
      message: reviewMessage.trim(),
      date: new Date().toLocaleDateString(
        language === 'bn' ? 'bn-BD' : 'en-GB'
      ),
    }

    setReviews((currentReviews) => [newReview, ...currentReviews])
    setReviewName('')
    setReviewRating('5')
    setReviewMessage('')
  }

  function handleSearch(event) {
    event.preventDefault()

    setTimeout(() => {
      const firstProduct = document.querySelector('#products .product-card')

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
    const selectedPrice = variant ? variant.price : product.price
    const selectedWeight = variant ? variant.weight : null

    const cartKey = variant
      ? `${product.id}-${variant.weight}`
      : `${product.id}-default`

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.cartKey === cartKey)

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

  function changeCartWeight(item, newWeight) {
    const newVariant = item.variants.find(
      (variant) => variant.weight === newWeight
    )

    if (!newVariant) return

    setCart((currentCart) => {
      const newCartKey = `${item.id}-${newVariant.weight}`
      const existing = currentCart.find(
        (cartItem) => cartItem.cartKey === newCartKey &&
          cartItem.cartKey !== item.cartKey
      )

      if (existing) {
        return currentCart
          .filter((cartItem) => cartItem.cartKey !== item.cartKey)
          .map((cartItem) =>
            cartItem.cartKey === newCartKey
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
      }

      return currentCart.map((cartItem) =>
        cartItem.cartKey === item.cartKey
          ? {
            ...cartItem,
            selectedWeight: newVariant.weight,
            price: newVariant.price,
            cartKey: newCartKey,
          }
          : cartItem
      )
    })
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const subtotal = cart.reduce(
    (total, item) => total + (item.price ?? 0) * item.quantity,
    0
  )

  const hasUnpricedItems = cart.some(
    (item) => item.price == null || item.price <= 0
  )

  const categories = ['All', ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.trim().toLowerCase()

    const searchableText = [
      product.name,
      product.enName,
      product.category,
      product.description,
      product.enDescription,
    ].join(' ').toLowerCase()

    const matchesSearch = searchableText.includes(searchTerm)

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
            <span>📍 {t('topLocation')}</span>
            <span>🌿 {t('naturalProducts')}</span>
          </div>
          <span>{t('topMessage')}</span>
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
              placeholder={t('searchPlaceholder')}
              aria-label={t('search')}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit">{t('search')}</button>
          </form>

          <div className="header-actions">
            <button
              className="header-action"
              type="button"
              onClick={() => alert(t('wishlistAlert'))}
            >
              <span className="action-icon">♡</span>
              <span>{t('wishlist')}</span>
            </button>

            <button
              className="header-action cart-header-button"
              type="button"
              onClick={() => setCartOpen(true)}
            >
              <span className="action-icon">🛒</span>
              <span>{t('cart')}</span>
              <span className="cart-count">{cartCount}</span>
            </button>

            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkMode((current) => !current)}
              aria-label={darkMode ? t('lightMode') : t('darkMode')}
              title={darkMode ? t('lightMode') : t('darkMode')}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <div className="container nav-inner">
          <a className="nav-link active" href="#">{t('home')}</a>
          <a className="nav-link" href="#products">{t('products')}</a>
          <a className="nav-link" href="#about">{t('about')}</a>
          <a className="nav-link" href="#services">{t('services')}</a>
          <a className="nav-link" href="#faq">{t('faq')}</a>
          <a className="nav-link" href="#contact">{t('contact')}</a>

          <div className="language-switcher">
            <button
              type="button"
              className={language === 'bn' ? 'active' : ''}
              onClick={() => setLanguage('bn')}
            >
              বাংলা
            </button>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Banner */}
        <section className="hero-banner">


          <div className="hero-slideshow">
            <div className="hero-track">
              <img src="/image/hero-1.jpg" alt="Farm 1" />
              <img src="/image/hero-2.jpg" alt="Farm 2" />
              <img src="/image/hero-3.jpg" alt="Farm 3" />

              {/* Repeat images for seamless sliding */}
              <img src="/image/hero-1.jpg" alt="Farm 1" />
              <img src="/image/hero-2.jpg" alt="Farm 2" />
              <img src="/image/hero-3.jpg" alt="Farm 3" />
            </div>
          </div>


          <div className="hero-overlay">
            <div className="container hero-content">
              <p className="eyebrow">NATURAL FOOD • TRUSTED QUALITY</p>

              <h1>
                {t('heroTitle')}
                <br />
                <span>{t('heroHighlight')}</span>
              </h1>

              <p className="hero-description">
                {t('heroDescription')}
              </p>

              <a href="#products" className="primary-button">
                {t('viewProducts')} →
              </a>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="products-section" id="products">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{t('collection')}</p>
                <h2>{t('productTitle')}</h2>
                <p className="section-subtitle">
                  {t('productSubtitle')}
                </p>
              </div>

              <span className="product-total">
                {filteredProducts.length} {t('products')}
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
                  {category === 'All' ? t('allProducts') : category}
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
                          {t('productImage')}
                        </span>
                      </div>

                      <div className="product-info">
                        <p className="product-category">
                          {t('ourProduct')}
                        </p>

                        <h3>{getProductName(product)}</h3>

                        <p className="product-description">
                          {getProductDescription(product)}
                        </p>

                        <div className="product-price">
                          {product.variants ? (
                            <strong>{t('selectPrice')}</strong>
                          ) : (
                            <strong>{t('contactForPrice')}</strong>
                          )}
                        </div>

                        <button
                          className="add-cart-button"
                          type="button"
                          onClick={() =>
                            addToCart(product, selectedVariant ?? null)
                          }
                        >
                          + {t('addToCart')}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="no-products">
                <span>🔎</span>
                <h3>{t('noProduct')}</h3>
                <p>{t('noProductText')}</p>
                <button
                  className="add-cart-button"
                  type="button"
                  onClick={() => setSearch('')}
                >
                  {t('clearSearch')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="reviews-section" id="reviews">
          <div className="container">
            <div className="section-heading">
              <div className="section-heading reviews-title">
                <p className="eyebrow">{t('customerReviews')}</p>
                <h2>{t('reviewTitle')}</h2>
                <p className="section-subtitle">
                  {t('reviewSubtitle')}
                </p>
              </div>
            </div>

            <div className="reviews-layout">
              <form className="review-form" onSubmit={submitReview}>
                <h3>{t('writeReview')}</h3>

                <label htmlFor="review-name">{t('yourName')}</label>
                <input
                  id="review-name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  value={reviewName}
                  onChange={(event) => setReviewName(event.target.value)}
                  required
                />

                <label>{t('yourRating')}</label>

                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={Number(reviewRating) >= star ? 'active' : ''}
                      onClick={() => setReviewRating(String(star))}
                      aria-label={`${star} ${t('star')}`}
                    >
                      <svg viewBox="0 0 24 24" className="premium-star">
                        <defs>
                          <linearGradient
                            id={`goldGradient-${star}`}
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#fff176" />
                            <stop offset="45%" stopColor="#ffc107" />
                            <stop offset="100%" stopColor="#f57c00" />
                          </linearGradient>
                        </defs>

                        <path
                          d="M12 1.5L15.2 8.1L22.5 9.2L17.2 14.4L18.4 21.8L12 18.3L5.6 21.8L6.8 14.4L1.5 9.2L8.8 8.1Z"
                          fill={
                            Number(reviewRating) >= star
                              ? `url(#goldGradient-${star})`
                              : '#d5d5d5'
                          }
                          stroke={
                            Number(reviewRating) >= star
                              ? '#e69b00'
                              : '#bcbcbc'
                          }
                          strokeWidth="0.8"
                        />
                      </svg>
                    </button>
                  ))}
                </div>

                <label htmlFor="review-message">
                  {t('yourExperience')}
                </label>
                <textarea
                  id="review-message"
                  placeholder={t('reviewPlaceholder')}
                  rows="4"
                  value={reviewMessage}
                  onChange={(event) => setReviewMessage(event.target.value)}
                  required
                />

                <button className="add-cart-button" type="submit">
                  {t('submitReview')}
                </button>
              </form>

              <div className="reviews-list">
                <h3>{t('customerFeedback')}</h3>

                {reviews.length > 0 ? (
                  <>
                    {reviews
                      .slice(0, showAllReviews ? reviews.length : 4)
                      .map((review) => (
                        <article className="review-card" key={review.id}>
                          <div className="review-card-header">
                            <div>
                              <h4>{review.name}</h4>
                              <span className="review-date">
                                {review.date}
                              </span>
                            </div>

                            <span className="review-stars">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </span>
                          </div>

                          <p>{review.message}</p>
                        </article>
                      ))}

                    {reviews.length > 4 && (
                      <button
                        type="button"
                        className="show-more-reviews"
                        onClick={() =>
                          setShowAllReviews((current) => !current)
                        }
                      >
                        {showAllReviews ? t('showLess') : t('showMore')}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="no-reviews">
                    <span>⭐</span>
                    <h3>{t('noReviews')}</h3>
                    <p>{t('firstReview')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ language={language} />

        {/* About Us */}
        <section className="company-section" id="about">
          <div className="container about-layout">
            <div className="about-content">
              <p className="eyebrow">{t('aboutEyebrow')}</p>

              <h2>
                {language === 'bn' ? (
                  <>
                    একসাথে এগিয়ে চলি,
                    <br />
                    <span>আরও ভালো কিছু গড়ি।</span>
                  </>
                ) : (
                  <>
                    Growing Together,
                    <br />
                    <span>Growing Better.</span>
                  </>
                )}
              </h2>

              <p className="about-description">
                {t('aboutDescription')}
              </p>

              <a href="#products" className="primary-button">
                {t('viewProducts')} →
              </a>
            </div>

            <div className="about-visual">
              <div className="about-icon">🌱</div>
              <p>
                {language === 'bn'
                  ? 'প্রকৃতির কাছাকাছি, আপনার পরিবারের জন্য'
                  : 'Closer to Nature, Better for Your Family'}
              </p>
              <span>
                {language === 'bn'
                  ? 'গুণমান • সততা • আস্থা'
                  : 'Quality • Honesty • Trust'}
              </span>
            </div>
          </div>
        </section>

        {/* Our Specialties */}
        <section className="services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t('whyUs')}</p>
              <h2>
                {t('specialties')}
              </h2>
              <p>{t('specialtiesText')}</p>
            </div>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🌾</div>
                <h3>{t('ownProducts')}</h3>
                <p>{t('ownProductsText')}</p>
              </div>

              <div className="service-card">
                <div className="service-icon">🧄</div>
                <h3>{t('processedProducts')}</h3>
                <p>{t('processedProductsText')}</p>
              </div>

              <div className="service-card">
                <div className="service-icon">🍯</div>
                <h3>{t('naturalProductsTitle')}</h3>
                <p>{t('naturalProductsText')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container cta-content">
          <div>
            <p className="eyebrow">{t('chooseProduct')}</p>
            <h2>{t('ctaTitle')}</h2>
            <p>{t('ctaText')}</p>
          </div>

          <a href="#products" className="cta-button">
            {t('explore')} →
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
            <p>{t('footerDescription')}</p>
          </div>

          <div className="footer-links">
            <h3>{t('quickLinks')}</h3>
            <a href="#">{t('home')}</a>
            <a href="#products">{t('products')}</a>
            <a href="#about">{t('about')}</a>
            <a href="#services">{t('services')}</a>
            <a href="#faq">
              {language === "bn" ? "সচরাচর জিজ্ঞাসা" : "Frequently Asked Questions(FAQ)"}
            </a>
          </div>

          <div className="footer-contact" id="contact">
            <h3>{t('contactUs')}</h3>
            <p>{t('contactText')}</p>

            <div className="contact-info">
              <p>
                <i className="fas fa-phone"></i>
                <a href="tel:+8801618990561">01618990561</a>
              </p>

              <p>
                <i className="fas fa-envelope"></i>
                <a href="mailto:ubzagro00@gmail.com">
                  ubzagro00@gmail.com
                </a>
              </p>

              <p>
                <i className="fas fa-location-dot"></i>
                <span>{t('location')}</span>
              </p>
            </div>

            <div className="social-contact-buttons">
              <a
                href="https://www.facebook.com/ubzagro"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook-icon"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://wa.me/8801618990561"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon whatsapp-icon"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} UBZ Agro. {t('rights')}
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
            aria-label={t('yourCart')}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <div>
                <h2>{t('yourCart')}</h2>
                <p>{cartCount} {t('items')}</p>
              </div>

              <button
                className="close-cart"
                type="button"
                aria-label={t('closeCart')}
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>{t('emptyCart')}</h3>
                <p>{t('emptyCartText')}</p>

                <button
                  className="add-cart-button"
                  type="button"
                  onClick={() => setCartOpen(false)}
                >
                  {t('continueShopping')}
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
                        <h3>{getProductName(item)}</h3>

                        {item.variants && (
                          <div className="cart-weight-selector">
                            <label htmlFor={`cart-weight-${item.cartKey}`}>
                              {t('selectWeight')}
                            </label>

                            <select
                              id={`cart-weight-${item.cartKey}`}
                              value={
                                item.selectedWeight ||
                                item.variants[0].weight
                              }
                              onChange={(event) =>
                                changeCartWeight(item, event.target.value)
                              }
                            >
                              {item.variants.map((variant) => (
                                <option
                                  key={variant.weight}
                                  value={variant.weight}
                                >
                                  {getWeight(variant)} — ৳
                                  {variant.price.toLocaleString('en-IN')}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        <p className="cart-item-unit-price">
                          {item.price != null && item.price > 0
                            ? `৳${item.price.toLocaleString('en-IN')} ${t('perPack')}`
                            : t('priceContact')}
                        </p>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            aria-label={`${t('decrease')} ${getProductName(item)}`}
                            onClick={() => decreaseQuantity(item.cartKey)}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            aria-label={`${t('increase')} ${getProductName(item)}`}
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
                            : t('priceToBeSet')}
                        </strong>

                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => removeFromCart(item.cartKey)}
                        >
                          {t('remove')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="subtotal-row">
                    <span>{t('subtotal')}</span>
                    <strong>
                      {hasUnpricedItems
                        ? `৳${subtotal.toLocaleString('en-IN')} ${t('otherProducts')}`
                        : `৳${subtotal.toLocaleString('en-IN')}`}
                    </strong>
                  </div>

                  <p>{t('delivery')}</p>

                  <button
                    className="checkout-button"
                    type="button"
                    onClick={() => alert(t('checkoutAlert'))}
                  >
                    {t('checkout')}
                  </button>

                  <button
                    className="continue-button"
                    type="button"
                    onClick={() => setCartOpen(false)}
                  >
                    {t('continueShopping')}
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
          aria-label={t('backToTop')}
          title={t('backToTop')}
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default App
