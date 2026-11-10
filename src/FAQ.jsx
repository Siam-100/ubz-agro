
import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
    {
        category: "ডেলিভারি",
        question: "পণ্য হাতে পেতে কত দিন সময় লাগে?",
        answer:
            "সাধারণত অর্ডার নিশ্চিত হওয়ার পর ২-৫ কার্যদিবসের মধ্যে পণ্য পৌঁছে দেওয়ার চেষ্টা করা হয়। আপনার অবস্থান অনুযায়ী সময় কিছুটা পরিবর্তিত হতে পারে।"
    },
    {
        category: "ডেলিভারি",
        question: "আপনারা কি হোম ডেলিভারি দিয়ে থাকেন?",
        answer:
            "হ্যাঁ, আমাদের নির্ধারিত ডেলিভারি এলাকায় হোম ডেলিভারি সুবিধা রয়েছে। বিস্তারিত জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
    },
    {
        category: "ডেলিভারি",
        question: "ডেলিভারি চার্জ কত?",
        answer:
            "ডেলিভারি চার্জ আপনার অবস্থান ও অর্ডারের পরিমাণের ওপর নির্ভর করে। অর্ডার করার আগে ডেলিভারি চার্জ জেনে নিতে পারবেন।"
    },
    {
        category: "পেমেন্ট",
        question: "কী কী মাধ্যমে পেমেন্ট করা যাবে?",
        answer:
            "আমাদের নির্ধারিত পেমেন্ট পদ্ধতির মাধ্যমে মূল্য পরিশোধ করা যাবে। বিস্তারিত জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
    },
    {
        category: "পেমেন্ট",
        question: "ক্যাশ অন ডেলিভারি সুবিধা আছে কি?",
        answer:
            "নির্ধারিত ডেলিভারি এলাকায় ক্যাশ অন ডেলিভারি সুবিধা পাওয়া যেতে পারে। অর্ডার নিশ্চিত করার আগে বিষয়টি জেনে নিন।"
    },
    {
        category: "রিটার্ন",
        question: "পণ্য ফেরত দেওয়ার সুযোগ আছে কি?",
        answer:
            "পণ্য ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ অথবা অর্ডারের সঙ্গে মিল না থাকলে আমাদের সঙ্গে যোগাযোগ করে রিটার্নের অনুরোধ জানাতে পারবেন।"
    },
    {
        category: "রিটার্ন",
        question: "রিফান্ড পাওয়ার জন্য কী করতে হবে?",
        answer:
            "রিফান্ডের জন্য আপনার অর্ডারের তথ্য ও সমস্যার বিবরণসহ আমাদের কাস্টমার সাপোর্টে যোগাযোগ করুন। যাচাই শেষে প্রযোজ্য নীতিমালা অনুযায়ী ব্যবস্থা নেওয়া হবে।"
    },
    {
        category: "পণ্য",
        question: "আপনাদের পণ্য কি প্রাকৃতিক?",
        answer:
            "আমরা নিজেদের চাষকৃত ফসল এবং যত্নসহকারে বাছাই করা প্রাকৃতিক খাদ্যপণ্য গ্রাহকদের কাছে পৌঁছে দেওয়ার চেষ্টা করি।"
    },
    {
        category: "পণ্য",
        question: "পণ্যের দাম কীভাবে জানতে পারব?",
        answer:
            "ওয়েবসাইটে পণ্যের বিস্তারিত দেখুন। যেসব পণ্যের দাম উল্লেখ করা নেই, সেগুলোর দাম জানতে আমাদের সঙ্গে যোগাযোগ করুন।"
    },
    {
        category: "পণ্য",
        question: "পণ্য সম্পর্কে বিস্তারিত তথ্য কোথায় পাব?",
        answer:
            "আমাদের ওয়েবসাইটের Products Section-এ পণ্যের বিবরণ দেখতে পারবেন। প্রয়োজনে সরাসরি আমাদের সঙ্গে যোগাযোগ করতে পারেন।"
    }
];

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState("সব প্রশ্ন");
    const [openIndex, setOpenIndex] = useState(null);

    const categories = [
        "সব প্রশ্ন",
        "ডেলিভারি",
        "পেমেন্ট",
        "রিটার্ন",
        "পণ্য"
    ];

    const filteredFAQs =
        activeCategory === "সব প্রশ্ন"
            ? faqData
            : faqData.filter(
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
                        আপনার মনে কি কোনো প্রশ্ন আছে?
                    </span>

                    <h2>সাধারণ জিজ্ঞাসা</h2>

                    <p>
                        আমাদের পণ্য, ডেলিভারি, পেমেন্ট এবং
                        অন্যান্য সেবা সম্পর্কে প্রয়োজনীয়
                        প্রশ্নের উত্তর এখানে খুঁজে নিন।
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="faq-categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={
                                activeCategory === category
                                    ? "active"
                                    : ""
                            }
                            onClick={() => {
                                setActiveCategory(category);
                                setOpenIndex(null);
                            }}
                        >
                            {category}
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
                                <span>{faq.question}</span>

                                <span className="faq-icon">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div
                                    className="faq-answer"
                                    id={`faq-answer-${index}`}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="faq-contact">
                    <h3>আপনার কি আরও কোনো প্রশ্ন আছে?</h3>

                    <p>
                        যেকোনো প্রয়োজনে আমাদের সঙ্গে যোগাযোগ করুন।
                        আমরা আপনাকে সাহায্য করতে প্রস্তুত।
                    </p>

                    <a href="#contact">
                        যোগাযোগ করুন
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
