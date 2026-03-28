"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 49,
    description: "Perfect for individuals and small creators starting out",
    features: [
      "3 social media accounts",
      "50 AI posts/month",
      "Basic analytics",
      "Email support",
      "Content calendar",
      "Hashtag generator",
    ],
    cta: "Start free trial",
  },
  {
    name: "Pro",
    price: 99,
    description: "Most popular for growing businesses and creators",
    features: [
      "10 social media accounts",
      "Unlimited AI posts",
      "Advanced audience insights",
      "Auto-publishing",
      "Priority support",
      "Weekly strategy reports",
      "Trend alerts",
      "Image generation",
    ],
    popular: true,
    cta: "Start free trial",
  },
  {
    name: "Agency",
    price: 249,
    description: "For agencies and large brands",
    features: [
      "Unlimited accounts",
      "White-label reports",
      "API access",
      "Dedicated account manager",
      "Custom AI training",
      "Team collaboration (5+ seats)",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact sales",
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  
  const getPrice = (price: number) => {
    if (billing === "monthly") return price;
    return Math.floor(price * 12 * 0.8); // 20% discount for yearly
  };
  
  const getYearlyPrice = (price: number) => {
    if (billing === "yearly") return Math.floor(price * 12 * 0.8);
    return price * 12;
  };
  
  return (
    <section className="py-24 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Simple, Transparent Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start growing today for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              less than a coffee
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with a 14-day free trial. No credit card required.
          </p>
          
          {/* Billing toggle */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === "monthly"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === "yearly"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly <span className="text-xs opacity-80">(Save 20%)</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl ${
                plan.popular
                  ? "bg-white shadow-2xl border-2 border-purple-200 scale-105"
                  : "bg-white border border-gray-200 shadow-lg"
              } p-8 transition-all hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">${getPrice(plan.price)}</span>
                <span className="text-gray-500 ml-2">/{billing === "monthly" ? "month" : "year"}</span>
                {billing === "yearly" && (
                  <div className="text-sm text-green-600 mt-1">
                    Save ${(plan.price * 12) - getYearlyPrice(plan.price)}/year
                  </div>
                )}
              </div>
              
              <button
                className={`w-full py-3 rounded-xl font-semibold mb-8 transition-all transform hover:scale-105 ${
                  plan.popular
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.cta}
              </button>
              
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-2">
            ✨ All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-gray-400 text-xs">
            Need a custom plan? <a href="#" className="text-purple-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}