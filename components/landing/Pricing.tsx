// components/landing/Pricing.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 299,
    description: "Perfect for small businesses and individuals",
    features: [
      "Up to 3 social media accounts",
      "10 AI-generated posts/month",
      "Basic analytics",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: 599,
    description: "Most popular for growing businesses",
    features: [
      "Up to 7 social media accounts",
      "50 AI-generated posts/month",
      "Advanced audience analysis",
      "Automated publishing",
      "Priority support",
      "Weekly reports"
    ],
    popular: true
  },
  {
    name: "Agency",
    price: 1499,
    description: "For agencies and large brands",
    features: [
      "Unlimited profiles",
      "Unlimited AI posts",
      "White-label reports",
      "API access",
      "Dedicated account manager",
      "Custom strategy workshop"
    ]
  }
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  
  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              predictable pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            No hidden fees. Cancel anytime.
          </p>
          
          <div className="flex justify-center mt-8">
            <div className="inline-flex rounded-full border border-gray-200 p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === "monthly"
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  billing === "yearly"
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly <span className="text-xs">(save 20%)</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? "border-purple-300 shadow-xl shadow-purple-100 scale-105"
                  : "border-gray-200"
              } p-8 bg-white transition-all hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {billing === "monthly" ? plan.price : Math.floor(plan.price * 12 * 0.8)}
                </span>
                <span className="text-gray-600"> {billing === "monthly" ? "/month" : "/year"}</span>
              </div>
              
              <button
                className={`w-full mb-6 py-2 px-4 rounded-md font-medium transition-colors ${
                  plan.popular
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                Get started
              </button>
              
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-5 w-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}