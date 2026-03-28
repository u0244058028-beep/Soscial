// components/landing/CTA.tsx
"use client";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to explode on social media?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Start your 14-day free trial today. No commitment.
        </p>
        <button className="inline-flex items-center justify-center rounded-md bg-white text-purple-600 hover:bg-gray-100 h-12 px-8 py-3 text-base font-medium transition-colors">
          Start free trial
        </button>
        <p className="text-sm text-purple-200 mt-4">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}