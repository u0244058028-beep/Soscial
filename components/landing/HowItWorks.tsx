import { Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Accounts",
    description: "Link your Instagram, TikTok, LinkedIn, or Facebook in under 2 minutes. Our AI immediately starts analyzing your profile.",
    icon: "🔌",
  },
  {
    number: "02",
    title: "AI Learns Your Voice",
    description: "Our AI studies your best-performing content, audience preferences, and industry trends to understand your unique style.",
    icon: "🧠",
  },
  {
    number: "03",
    title: "Get Tailored Content",
    description: "Receive a weekly content package with posts, stories, and reels optimized for maximum engagement.",
    icon: "📦",
  },
  {
    number: "04",
    title: "Publish & Grow",
    description: "Review, edit, and publish directly—or let us automate everything. Watch your followers and engagement skyrocket.",
    icon: "📈",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MySocialBomb
            </span>{" "}
            works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes. See results in days.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-purple-200 to-transparent -translate-x-1/2" />
              )}
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-6 py-3">
            <span className="text-sm text-gray-600">Average time to first result:</span>
            <span className="font-bold text-purple-600">3-5 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}