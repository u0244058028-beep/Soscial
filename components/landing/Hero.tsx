"use client";

import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Her kobler du til Supabase senere
    console.log("Email submitted:", email);
    alert("Thanks! Check your email to start your free trial.");
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40">
      {/* Bakgrunnseffekter */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Trusted by 10,000+ creators & businesses
            </span>
          </div>
          
          {/* Hovedtittel */}
          <h1 className="max-w-5xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Turn{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              casual followers
            </span>{" "}
            <br />
            into superfans
          </h1>
          
          {/* Beskrivelse */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            MySocialBomb uses advanced AI to create viral-worthy content tailored to your audience. 
            Save 10+ hours a week and grow faster than ever.
          </p>
          
          {/* Email capture form */}
          <form onSubmit={handleSubmit} className="w-full max-w-md mb-8 animate-fade-in-up animation-delay-400">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              ✨ 14-day free trial • No credit card required • Cancel anytime
            </p>
          </form>
          
          {/* Demo knapp */}
          <button className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-12 animate-fade-in-up animation-delay-600">
            <Play className="h-5 w-5" />
            <span>Watch 2-minute demo</span>
          </button>
          
          {/* Statistikk med logoer */}
          <div className="w-full max-w-4xl animate-fade-in-up animation-delay-800">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-6">
              TRUSTED BY INNOVATIVE TEAMS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {["TechCrunch", "Forbes", "Wired", "Fast Company"].map((brand) => (
                <div key={brand} className="text-gray-400 font-semibold text-lg">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}