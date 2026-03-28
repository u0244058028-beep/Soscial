// components/landing/Features.tsx
import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock, 
  BarChart3 
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Content Generation",
    description: "Generate engaging text, hashtags, and images that perfectly target your audience."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automatically publish at the right time for maximum reach."
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    description: "Get insights into what's working in your niche right now."
  },
  {
    icon: Users,
    title: "Audience Analysis",
    description: "Understand your followers and what they actually want to see."
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "Spend 80% less time creating content."
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Track your growth with automated weekly reports."
  }
]

export function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to succeed on{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              social media
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MySocialBomb combines powerful AI with an intuitive design
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}