// components/landing/CTA.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Klar til å eksplodere på sosiale medier?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Start din gratis 14-dagers prøveperiode i dag. Ingen binding.
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
          Start gratis prøveperiode
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-sm text-purple-200 mt-4">
          Ingen kredittkort kreves. Avslutt når du vil.
        </p>
      </div>
    </section>
  )
}