import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Info, ShoppingCart, Package } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-7 h-7" />,
    title: "Browse Dishes",
    description: "Explore our curated collection of 25 healthy diet dishes, filtered by category, weight goal, or dietary preference.",
    color: "#22c55e",
    step: "01",
  },
  {
    icon: <Info className="w-7 h-7" />,
    title: "Check Nutrition",
    description: "Click any dish to see full macro breakdown — calories, protein, carbs, fat, fiber — and how it supports your weight goals.",
    color: "#f97316",
    step: "02",
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    title: "Cook or Order",
    description: "View the exact ingredients and quantities to make it yourself, or place an order and get it delivered fresh to your door.",
    color: "#3b82f6",
    step: "03",
  },
  {
    icon: <Package className="w-7 h-7" />,
    title: "Eat & Thrive",
    description: "Receive your freshly prepared meal within 30-45 minutes and enjoy the benefits of eating right for your body.",
    color: "#a855f7",
    step: "04",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="how-it-works" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-6">
            Simple Process
          </div>
          <h2 className="text-5xl font-black font-serif mb-4">How It <span className="gradient-text">Works</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From discovery to delivery, we make healthy eating simple, transparent and delicious.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-green-400 via-orange-400 via-blue-400 to-purple-400 opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 relative z-10 shadow-lg"
                style={{ background: `${step.color}18`, border: `2px solid ${step.color}30`, color: step.color }}
              >
                {step.icon}
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
                  style={{ background: step.color }}
                >
                  {step.step}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
