import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, TrendingUp, Minus, Shield, Zap, Heart } from "lucide-react";

const benefits = [
  {
    icon: <TrendingDown className="w-8 h-8" />,
    title: "Weight Loss",
    description: "High fiber, low calorie dishes that keep you full and satisfied while creating a natural caloric deficit.",
    stat: "Up to 500",
    statLabel: "Fewer calories/day",
    color: "#22c55e",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Muscle Gain",
    description: "Protein-rich dishes with optimal macro ratios to fuel workouts and support healthy muscle growth.",
    stat: "38g+",
    statLabel: "Protein per serving",
    color: "#3b82f6",
  },
  {
    icon: <Minus className="w-8 h-8" />,
    title: "Weight Maintain",
    description: "Balanced dishes designed for long-term sustainability — eating right without feeling restricted.",
    stat: "100%",
    statLabel: "Whole ingredients",
    color: "#f97316",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Anti-Inflammatory",
    description: "Turmeric, ginger, and antioxidant-rich ingredients proven to reduce inflammation and boost immunity.",
    stat: "15+",
    statLabel: "Superfood ingredients",
    color: "#a855f7",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Sustained Energy",
    description: "Complex carbs and slow-release foods keep blood sugar stable and energy levels consistent all day.",
    stat: "8h+",
    statLabel: "Sustained energy",
    color: "#eab308",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Heart Health",
    description: "Omega-3 rich dishes, Mediterranean staples and plant-based options scientifically linked to heart health.",
    stat: "0",
    statLabel: "Trans fats",
    color: "#ef4444",
  },
];

export function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="benefits" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm mb-6">
            Science-Backed
          </div>
          <h2 className="text-5xl font-black font-serif mb-4">
            Why Eat <span className="gradient-text">Healthy</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dish is crafted with a specific health goal in mind — because food is medicine.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-3xl bg-card border border-card-border hover:shadow-lg transition-all duration-300 group"
              style={{
                ["--hover-border" as string]: `${benefit.color}40`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${benefit.color}15`, color: benefit.color }}
              >
                {benefit.icon}
              </div>

              {/* Stat */}
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-black" style={{ color: benefit.color }}>
                  {benefit.stat}
                </span>
                <span className="text-sm text-muted-foreground mb-1.5">{benefit.statLabel}</span>
              </div>

              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>

              {/* Bottom accent */}
              <div
                className="h-1 rounded-full mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${benefit.color}, ${benefit.color}55)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
