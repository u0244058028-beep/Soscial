"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export function CTA() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CTA email:", email);
    alert("Thanks! Check your email to start your free trial.");
  };

  return (
    <section className="py-24 bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="h-12 w-12 text-purple-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to 10x your social media engagement?
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Join 10,000+ creators and businesses already growing with MySocialBomb.
            Start your 14-day free trial today.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          
          <p className="text-sm text-purple-300">
            ✨ No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}