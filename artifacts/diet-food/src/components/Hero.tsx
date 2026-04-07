import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Leaf, Zap, Heart, Star } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

const floatingItems = [
  { emoji: "🥑", x: "6%", y: "18%", delay: 0, duration: 7 },
  { emoji: "🥗", x: "88%", y: "12%", delay: 1.2, duration: 8 },
  { emoji: "🫐", x: "12%", y: "68%", delay: 2, duration: 6.5 },
  { emoji: "🍋", x: "84%", y: "72%", delay: 0.6, duration: 9 },
  { emoji: "🥦", x: "48%", y: "6%", delay: 1.8, duration: 7.5 },
  { emoji: "🍓", x: "32%", y: "82%", delay: 0.9, duration: 8.5 },
  { emoji: "🌿", x: "74%", y: "50%", delay: 1.4, duration: 7 },
  { emoji: "🫛", x: "4%", y: "45%", delay: 2.3, duration: 9 },
  { emoji: "🍎", x: "93%", y: "40%", delay: 0.4, duration: 6 },
  { emoji: "🌾", x: "58%", y: "88%", delay: 1.6, duration: 8 },
  { emoji: "🥕", x: "22%", y: "35%", delay: 0.8, duration: 7 },
  { emoji: "🍇", x: "66%", y: "22%", delay: 2.1, duration: 9 },
];

export function Hero({ onExplore }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const stats = [
    { icon: <Leaf className="w-4 h-4" />, value: "25", label: "Dishes", color: "#22c55e" },
    { icon: <Zap className="w-4 h-4" />, value: "100%", label: "Pure Veg", color: "#f97316" },
    { icon: <Heart className="w-4 h-4" />, value: "30min", label: "Delivery", color: "#ec4899" },
    { icon: <Star className="w-4 h-4" />, value: "4.9★", label: "Rating", color: "#f59e0b" },
  ];

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-background to-amber-50/30 dark:from-emerald-950/30 dark:via-background dark:to-amber-950/10" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "50vw", height: "50vw",
          background: "radial-gradient(circle, hsl(142 70% 35% / 0.12), transparent 70%)",
          top: "-15%", left: "-10%",
          y: y1,
        }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, hsl(35 85% 52% / 0.10), transparent 70%)",
          bottom: "-10%", right: "-5%",
          y: y2,
        }}
      />
      <motion.div
        className="absolute rounded-full blur-2xl opacity-40"
        style={{
          width: "30vw", height: "30vw",
          background: "radial-gradient(circle, hsl(262 80% 60% / 0.07), transparent 70%)",
          top: "40%", left: "60%",
          y: y2,
        }}
      />

      {/* Floating food items */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-4xl"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -18, 0], rotate: [0, 4, -4, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY, opacity, scale }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 font-bold text-sm text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
        >
          <div className="flex items-center justify-center w-4 h-4 rounded-sm border-2 border-white/80">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          100% Pure Vegetarian · No Compromise
          <div className="flex items-center justify-center w-4 h-4 rounded-sm border-2 border-white/80">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black leading-none font-serif"
          >
            <span className="text-foreground">Eat</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-3">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black leading-none font-serif gradient-text"
          >
            Healthy.
          </motion.div>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-black leading-none font-serif text-foreground"
          >
            Live Better.
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          25 expertly crafted 100% vegetarian dishes — explore nutrition, 
          get exact recipes, and order fresh to your door.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button
            className="group relative flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl text-white font-bold text-lg overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              boxShadow: "0 8px 30px rgba(34, 197, 94, 0.4)",
            }}
            onClick={onExplore}
            data-testid="btn-explore"
          >
            <span>Explore 25 Dishes</span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </button>
          <button
            className="flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm font-bold text-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
            data-testid="btn-learn-more"
          >
            How It Works
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 py-4 px-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-card-border shadow-sm"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="font-black text-xl" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2.5 rounded-full bg-primary"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
