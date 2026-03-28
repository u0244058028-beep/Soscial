// components/landing/HowItWorks.tsx
const steps = [
  {
    number: "1",
    title: "Connect your platforms",
    description: "Connect Instagram, TikTok, LinkedIn or Facebook in 2 minutes."
  },
  {
    number: "2",
    title: "AI analyzes your profile",
    description: "Our AI studies your audience, past content, and competitors."
  },
  {
    number: "3",
    title: "Get tailored content",
    description: "Receive weekly content packages optimized for your profile."
  },
  {
    number: "4",
    title: "Publish and grow",
    description: "Publish directly or let us automate the process."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MySocialBomb
            </span>{" "}
            works
          </h2>
          <p className="text-xl text-gray-600">
            Get started in under 10 minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}