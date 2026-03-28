"use client";

import { Star, TrendingUp, Users, Clock } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Active users", icon: Users },
  { value: "342%", label: "Avg. engagement increase", icon: TrendingUp },
  { value: "4.9/5", label: "User rating", icon: Star },
  { value: "10hrs", label: "Saved per week", icon: Clock },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator, 500k followers",
    content: "MySocialBomb literally changed my life. I went from struggling to post consistently to gaining 50k followers in 3 months. The AI just gets my audience.",
    rating: 5,
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, TechCorp",
    content: "Best investment we've made this year. Our engagement rates are up 400% and we're saving 15+ hours a week on content creation. Absolutely game-changing.",
    rating: 5,
    avatar: "MC",
  },
  {
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    content: "I had no idea how to grow on Instagram. This tool gave me a clear strategy and content that actually converts. My sales have doubled in 2 months!",
    rating: 5,
    avatar: "ER",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              creators worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our users have to say.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}