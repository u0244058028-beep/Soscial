// components/landing/Hero.tsx
"use client";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex rounded-full bg-purple-100 px-4 py-2 mb-6">
            <span className="text-sm font-medium text-purple-600">
              AI-powered content optimization
            </span>
          </div>
          
          <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Get{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              10x more engagement
            </span>{" "}
            on social media with AI
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
            MySocialBomb analyzes your audience and generates tailored content that actually works. 
            Grow followers, engagement, and sales – all automated.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="inline-flex items-center justify-center rounded-md bg-purple-600 hover:bg-purple-700 text-white h-12 px-8 py-3 text-base font-medium transition-colors">
              Start free trial
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-purple-200 bg-transparent hover:bg-purple-50 h-12 px-8 py-3 text-base font-medium transition-colors">
              Watch demo
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">+342%</div>
              <div className="text-sm text-gray-500">Average engagement</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-500">Happy users</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-500">User rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}