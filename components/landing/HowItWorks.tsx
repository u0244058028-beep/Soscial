// components/landing/HowItWorks.tsx
import { Step } from "@/components/landing/Step"

const steps = [
  {
    number: "1",
    title: "Koble dine plattformer",
    description: "Koble Instagram, TikTok, LinkedIn eller Facebook på 2 minutter."
  },
  {
    number: "2",
    title: "AI-analyserer din profil",
    description: "Vår AI studerer din målgruppe, tidligere innhold og konkurrenter."
  },
  {
    number: "3",
    title: "Få skreddersydd innhold",
    description: "Motta ukentlige innholdspakker optimalisert for din profil."
  },
  {
    number: "4",
    title: "Publiser og vokse",
    description: "Publiser direkte eller la oss automatisere prosessen."
  }
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Slik fungerer{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MySocialBomb
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Kom i gang på under 10 minutter
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Step key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}