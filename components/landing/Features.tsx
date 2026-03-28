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
    title: "AI-innholdsgenerering",
    description: "Generer engasjerende tekster, hashtags og bilder som treffer din målgruppe perfekt."
  },
  {
    icon: Calendar,
    title: "Smart planlegging",
    description: "Automatisk publisering til rett tid for maksimal rekkevidde."
  },
  {
    icon: TrendingUp,
    title: "Trendanalyse",
    description: "Få innsikt i hva som fungerer i din nisje akkurat nå."
  },
  {
    icon: Users,
    title: "Målgruppeanalyse",
    description: "Forstå dine følgere og hva de faktisk vil se."
  },
  {
    icon: Clock,
    title: "Tidsbesparelse",
    description: "Bruk 80% mindre tid på å lage innhold."
  },
  {
    icon: BarChart3,
    title: "Detaljerte rapporter",
    description: "Følg veksten din med automatiske ukentlige rapporter."
  }
]

export function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Alt du trenger for å lykkes på{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              sosiale medier
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MySocialBomb kombinerer kraftig AI med intuitivt design
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