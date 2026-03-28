import { 
  Brain, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock, 
  BarChart3,
  Sparkles,
  Zap,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI That Knows Your Audience",
    description: "Our advanced AI analyzes your followers, competitors, and industry trends to create content that resonates.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Viral Content Generator",
    description: "Generate hundreds of on-brand posts, captions, and hashtags in seconds. Never run out of ideas again.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Post automatically at peak engagement times. Our AI learns when your audience is most active.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Track what's working and optimize your strategy with detailed insights and recommendations.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    title: "Audience Growth Tools",
    description: "Identify your best-performing content and double down on what works to accelerate growth.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Platform Safe",
    description: "Stay compliant with all platform guidelines. We ensure your content is authentic and safe.",
    color: "from-teal-500 to-green-500",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Powerful Features
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              dominate social media
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop wasting hours on content creation. Let AI do the heavy lifting while you focus on what matters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}