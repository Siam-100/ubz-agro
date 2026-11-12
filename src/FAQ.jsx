
import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
    {
        category: "delivery",
        bn: {
            question: "পণ্য হাতে পেতে কত দিন সময় লাগে?",
            answer: "সাধারণত অর্ডার নিশ্চিত হওয়ার পর ১-২ কার্যদিবসের মধ্যে পণ্য পৌঁছে দেওয়ার চেষ্টা করা হয়। আপনার অবস্থান অনুযায়ী সময় কিছুটা পরিবর্তিত হতে পারে।"
        },
        en: {
            question: "How long does delivery take?",
            answer: "We generally try to deliver products within 1–2 business days after order confirmation. Delivery time may vary depending on your location."
        }
    },
    {
        category: "delivery",
        bn: {
            question: "আপনারা কি হোম ডেলিভারি দিয়ে থাকেন?",
            answer: "হ্যাঁ, আমাদের নির্ধারিত ডেলিভারি এলাকায় হোম ডেলিভারি সুবিধা রয়েছে। বিস্তারিত জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
        },
        en: {
            question: "Do you offer home delivery?",
            answer: "Yes, we offer home delivery in our designated delivery areas. Please contact us for more details."
        }
    },
    {
        category: "delivery",
        bn: {
            question: "ডেলিভারি চার্জ কত?",
            answer: "সাধারণত ঢাকার ভিতরে ৮০ টাকা এবং ঢাকার বাইরে ১২০ টাকা ডেলিভারি চার্জ প্রযোজ্য (১ কেজি পর্যন্ত)। অর্ডারের ওজন ও অবস্থান অনুযায়ী অতিরিক্ত চার্জ প্রযোজ্য হতে পারে। অর্ডার করার আগে ডেলিভারি চার্জ জেনে নিতে পারবেন।"
        },
        en: {
            question: "How much is the delivery charge?",
            answer: "The delivery charge is generally ৳80 inside Dhaka and ৳120 outside Dhaka (up to 1 kg). Additional charges may apply depending on order weight and location. You can confirm the delivery charge before placing an order."
        }
    },
    {
        category: "payment",
        bn: {
            question: "কী কী মাধ্যমে পেমেন্ট করা যাবে?",
            answer: "আমাদের নির্ধারিত পেমেন্ট পদ্ধতির মাধ্যমে মূল্য পরিশোধ করা যাবে। বিস্তারিত জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
        },
        en: {
            question: "What payment methods are available?",
            answer: "You can pay using our available payment methods. Please contact us for more details."
        }
    },
    {
        category: "payment",
        bn: {
            question: "ক্যাশ অন ডেলিভারি সুবিধা আছে কি?",
            answer: "নির্ধারিত ডেলিভারি এলাকায় ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যেতে পারে। অর্ডার নিশ্চিত করার আগে বিষয়টি জেনে নিন।"
        },
        en: {
            question: "Do you offer Cash on Delivery?",
            answer: "Cash on Delivery may be available in selected delivery areas. Please confirm its availability before placing your order."
        }
    },
    {
        category: "return",
        bn: {
            question: "পণ্য ফেরত দেওয়ার সুযোগ আছে কি?",
            answer: "পণ্য ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ অথবা অর্ডারের সঙ্গে মিল না থাকলে আমাদের সঙ্গে যোগাযোগ করে রিটার্নের অনুরোধ জানাতে পারবেন।"
        },
        en: {
            question: "Can I return a product?",
            answer: "If a product is damaged, defective, or does not match your order, you can contact us to request a return."
        }
    },
    {
        category: "return",
        bn: {
            question: "রিফান্ড পাওয়ার জন্য কী করতে হবে?",
            answer: "রিফান্ডের জন্য আপনার অর্ডারের তথ্য ও সমস্যার বিবরণসহ আমাদের কাস্টমার সাপোর্টে যোগাযোগ করুন। যাচাই শেষে প্রযোজ্য নীতিমালা অনুযায়ী ব্যবস্থা নেওয়া হবে।"
        },
        en: {
            question: "How can I request a refund?",
            answer: "To request a refund, contact our customer support with your order details and a description of the issue. After verification, we will take action according to our applicable policy."
        }
    },
    {
        category: "product",
        bn: {
            question: "আপনাদের পণ্য কি প্রাকৃতিক?",
            answer: "আমরা নিজেদের চাষকৃত ফসল এবং যত্নসহকারে বাছাই করা প্রাকৃতিক খাদ্যপণ্য গ্রাহকদের কাছে পৌঁছে দেওয়ার চেষ্টা করি।"
        },
        en: {
            question: "Are your products natural?",
            answer: "We strive to provide customers with our own cultivated crops and carefully selected natural food products."
        }
    },
    {
        category: "product",
        bn: {
            question: "পণ্যের দাম কীভাবে জানতে পারব?",
            answer: "ওয়েবসাইটে পণ্যের বিস্তারিত দেখুন। যেসব পণ্যের দাম উল্লেখ করা নেই, সেগুলোর দাম জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
        },
        en: {
            question: "How can I know the product prices?",
            answer: "Check the product details on our website. For products without a listed price, please contact us to know the price."
        }
    },
    {
        category: "product",
        bn: {
            question: "পণ্য সম্পর্কে বিস্তারিত তথ্য কোথায় পাব?",
            answer: "আমাদের ওয়েবসাইটের Products Section-এ পণ্যের বিবরণ দেখতে পারবেন। প্রয়োজনে সরাসরি আমাদের সঙ্গে যোগাযোগ করতে পারেন।"
        },
        en: {
            question: "Where can I find detailed product information?",
            answer: "You can find product descriptions in the Products Section of our website. You can also contact us directly if needed."
        }
    }
];

const FAQ = ({ language = "bn" }) => {
    const [activeCategory, setActiveCategory] = useState("delivery");
    const [openIndex, setOpenIndex] = useState(null);

    const categories = [
        {
            key: "delivery",
            bn: "ডেলিভারি",
            en: "Delivery"
        },
        {
            key: "payment",
            bn: "পেমেন্ট",
            en: "Payment"
        },
        {
            key: "return",
            bn: "রিটার্ন",
            en: "Return"
        },
        {
            key: "product",
            bn: "পণ্য",
            en: "Products"
        }
    ];

    const content = {
        bn: {
            subtitle: "আপনার মনে কি কোনো প্রশ্ন আছে?",
            heading: "সাধারণ জিজ্ঞাসা",
            description: "আমাদের পণ্য, ডেলিভারি, পেমেন্ট এবং অন্যান্য সেবা সম্পর্কে প্রয়োজনীয় প্রশ্নের উত্তর এখানে খুঁজে নিন।",
            contactHeading: "আপনার কি আরও কোনো প্রশ্ন আছে?",
            contactDescription: "যেকোনো প্রয়োজনে আমাদের সঙ্গে যোগাযোগ করুন। আমরা আপনাকে সাহায্য করতে প্রস্তুত।",
            contactButton: "যোগাযোগ করুন"
        },
        en: {
            subtitle: "HAVE ANY QUESTIONS?",
            heading: "Frequently Asked Questions",
            description: "Find answers to common questions about our products, delivery, payment, and other services.",
            contactHeading: "Do you have any more questions?",
            contactDescription: "Feel free to contact us whenever you need assistance. We are ready to help you.",
            contactButton: "Contact Us"
        }
    };

    const filteredFAQs = faqData.filter(
        (faq) => faq.category === activeCategory
    );

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="faq-container">

                {/* FAQ Heading */}
                <div className="faq-heading">
                    <span className="faq-subtitle">
                        {content[language].subtitle}
                    </span>

                    <h2>{content[language].heading}</h2>

                    <p>{content[language].description}</p>
                </div>

                {/* FAQ Categories */}
                <div className="faq-categories">
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            type="button"
                            className={
                                activeCategory === category.key
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                setActiveCategory(category.key);
                                setOpenIndex(null);
                            }}
                        >
                            {category[language]}
                        </button>
                    ))}
                </div>

                {/* FAQ Questions */}
                <div className="faq-list">
                    {filteredFAQs.map((faq, index) => (
                        <div
                            className={`faq-item ${openIndex === index ? "open" : ""
                                }`}
                            key={index}
                        >
                            <button
                                type="button"
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span>
                                    {faq[language].question}
                                </span>

                                <span className="faq-icon">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div
                                    className="faq-answer"
                                    id={`faq-answer-${index}`}
                                >
                                    <p>{faq[language].answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="faq-contact">
                    <h3>
                        {content[language].contactHeading}
                    </h3>

                    <p>
                        {content[language].contactDescription}
                    </p>

                    <a href="#contact">
                        {content[language].contactButton}
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
