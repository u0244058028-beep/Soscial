// components/landing/Step.tsx
interface StepProps {
  number: string;
  title: string;
  description: string;
}

export function Step({ number, title, description }: StepProps) {
  return (
    <div className="relative text-center">
      {/* Sirkel med nummer */}
      <div className="flex justify-center mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold">
          {number}
        </div>
      </div>
      
      {/* Tittel og beskrivelse */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      
      {/* Piler mellom steg (skjules på mobil) */}
      {/* Dette er valgfritt – kan fjernes hvis du vil ha enklere design */}
    </div>
  );
}