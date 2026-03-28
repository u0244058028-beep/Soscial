// components/landing/FAQ.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How often is content generated?",
    answer: "You can generate content anytime, but we recommend using our weekly content package for best results."
  },
  {
    question: "Do you support languages other than English?",
    answer: "Yes! MySocialBomb supports Norwegian, Swedish, Danish, English, and more. Our AI is trained on Scandinavian content as well."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel with 30 days notice, no hidden fees."
  },
  {
    question: "Which platforms do you support?",
    answer: "We support Instagram, TikTok, LinkedIn, Facebook, Twitter/X, and YouTube."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! You get a 14-day free trial with no commitment."
  },
  {
    question: "How does the AI content work?",
    answer: "Our AI analyzes your audience, industry, and past content to generate tailored posts that actually engage."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}