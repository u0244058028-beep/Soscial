// components/landing/FAQ.tsx
"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Hvor ofte genereres nytt innhold?",
    answer: "Du kan generere innhold når du vil, men vi anbefaler å bruke vår ukentlige innholdspakke for best resultat."
  },
  {
    question: "Støtter dere norsk språk?",
    answer: "Ja! MySocialBomb støtter norsk, svensk, dansk og engelsk. AI-en vår er trent på skandinavisk innhold."
  },
  {
    question: "Kan jeg avslutte abonnementet når som helst?",
    answer: "Absolutt. Du kan avslutte abonnementet med 30 dagers varsel, uten noen skjulte kostnader."
  },
  {
    question: "Hvilke plattformer støtter dere?",
    answer: "Vi støtter Instagram, TikTok, LinkedIn, Facebook, Twitter/X og YouTube."
  },
  {
    question: "Er det gratis prøveperiode?",
    answer: "Ja! Du får 14 dagers gratis prøveperiode uten binding."
  },
  {
    question: "Hvordan fungerer AI-innholdet?",
    answer: "Vår AI analyserer din målgruppe, bransje og tidligere innhold for å generere skreddersydde innlegg som faktisk engasjerer."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vanlige{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              spørsmål
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Har du spørsmål? Vi har svar.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}