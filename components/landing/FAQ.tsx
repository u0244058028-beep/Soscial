"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "How does the AI generate content?",
    answer: "Our AI analyzes your existing content, audience engagement patterns, and industry trends to create posts that resonate with your specific followers. It learns your brand voice and adapts over time.",
  },
  {
    question: "Which platforms do you support?",
    answer: "We support Instagram, TikTok, LinkedIn, Facebook, Twitter/X, and YouTube. More platforms coming soon!",
  },
  {
    question: "Can I edit the content before posting?",
    answer: "Absolutely! You have full control. Review, edit, and approve every post before it goes live. Or let our AI auto-publish if you prefer.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! You get a 14-day free trial with full access to all features. No credit card required, and you can cancel anytime.",
  },
  {
    question: "What happens if I cancel?",
    answer: "You can cancel anytime with no questions asked. Your content and data will be available for export, and you won't be charged again.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee if you're not completely satisfied with the results. No questions asked.",
  },
  {
    question: "How is this different from ChatGPT?",
    answer: "Unlike ChatGPT, we're specifically trained on social media data. We understand platform algorithms, optimal posting times, trending formats, and audience psychology to create content that actually performs.",
  },
  {
    question: "Can I use this for multiple clients?",
    answer: "Yes! Our Agency plan is perfect for managing multiple client accounts with white-label reporting and team collaboration features.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              know
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Frequently asked questions answered
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-100 hover:border-purple-200 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}