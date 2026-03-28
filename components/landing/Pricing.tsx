"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 299,
    description: "Perfect for individuals and small creators",
    features: [
      "3 social media accounts",
      "30 AI posts/month",
      "Basic analytics",
      "Email support",
      "Content calendar",
    ],
    cta: "Start free trial",
  },
  {
    name: "Pro",
    price: 599,
    description: "Most popular for growing businesses",
    features: [
      "10 social media accounts",
      "Unlimited AI posts",
      "Advanced audience insights",
      "Auto-publishing",
      "Priority support",
      "Weekly strategy reports",
      "Trend alerts",
    ],
    popular: true,
    cta: "Start free trial",
  },
  {
    name: "Agency",
    price: 1499,
    description: "For agencies and large brands",
    features: [
      "Unlimited accounts",
      "White-label reports",
      "API access",
      "Dedicated account manager",
      "Custom AI training",
      "Team collaboration",
      "SLA guarantee",
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
  
  return (
    <section className="py-24 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose the plan that's{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              right for you
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free. No credit card required. Upgrade anytime.
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
        
        <p className="text-center text-gray-500 text-sm mt-12">
          All plans include a 14-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}