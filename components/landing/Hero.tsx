// components/landing/Hero.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Bakgrunnseffekter */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              AI-drevet innholdsoptimalisering
            </span>
          </div>
          
          {/* Hovedtittel */}
          <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Få{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              10x mer engasjement
            </span>{" "}
            på sosiale medier med AI
          </h1>
          
          {/* Beskrivelse */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
            MySocialBomb analyserer din målgruppe og genererer skreddersydd innhold som faktisk fungerer. 
            Øk følgere, engasjement og salg – alt automatisert.
          </p>
          
          {/* CTA Knapper */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
              Start gratis prøveperiode
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-purple-200 hover:bg-purple-50">
              Se demo
            </Button>
          </div>
          
          {/* Statistikk */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">+342%</div>
              <div className="text-sm text-gray-500">Gjennomsnittlig engasjement</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">10k+</div>
              <div className="text-sm text-gray-500">Tilfredse brukere</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-500">Brukervurdering</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}