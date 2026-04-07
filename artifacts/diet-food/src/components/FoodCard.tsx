import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Food } from "@/data/foods";
import { ShoppingCart, BookOpen, TrendingUp, TrendingDown, Minus, Flame } from "lucide-react";

interface FoodCardProps {
  food: Food;
  onSelect: (food: Food) => void;
  onOrder: (food: Food) => void;
  index: number;
}

function VegIndicator() {
  return (
    <div className="flex items-center justify-center w-5 h-5 rounded-sm border-2 border-green-600 bg-white flex-shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
    </div>
  );
}

export function FoodCard({ food, onSelect, onOrder, index }: FoodCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const weightConfig = {
    gain: { icon: <TrendingUp className="w-3 h-3" />, label: "Weight Gain", bg: "bg-blue-50 text-blue-600 border-blue-200", dark: "dark:bg-blue-900/30 dark:border-blue-700" },
    loss: { icon: <TrendingDown className="w-3 h-3" />, label: "Weight Loss", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dark: "dark:bg-emerald-900/30 dark:border-emerald-700" },
    maintain: { icon: <Minus className="w-3 h-3" />, label: "Maintain", bg: "bg-amber-50 text-amber-700 border-amber-200", dark: "dark:bg-amber-900/30 dark:border-amber-700" },
  };
  const wc = weightConfig[food.weightEffect];

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden cursor-pointer select-none group"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)"}`,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.2s ease"
          : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease",
        boxShadow: isHovered
          ? `0 28px 60px -12px rgba(0,0,0,0.22), 0 0 0 1px ${food.color}30, 0 8px 30px -8px ${food.color}40`
          : "0 4px 20px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.055, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-testid={`food-card-${food.id}`}
    >
      <div className="bg-card h-full flex flex-col rounded-3xl overflow-hidden">
        {/* Image area */}
        <div className="relative overflow-hidden h-52 flex-shrink-0">
          {/* Gradient overlay behind image */}
          <div
            className="absolute inset-0 z-[1] opacity-60"
            style={{ background: `linear-gradient(160deg, ${food.color}22 0%, transparent 60%)` }}
          />

          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            loading="lazy"
          />

          {/* Dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-[2]" />

          {/* Top row: veg indicator + weight badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-[3]">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 shadow-sm">
              <VegIndicator />
              <span className="text-green-700 text-xs font-bold tracking-wide">PURE VEG</span>
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border shadow-sm bg-white/95 ${wc.bg}`}>
              {wc.icon}
              {wc.label}
            </div>
          </div>

          {/* Bottom: name + price */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-[3]">
            <div className="flex items-end justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-2xl drop-shadow-md">{food.emoji}</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ background: `${food.color}cc` }}
                  >
                    {food.category}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg leading-tight drop-shadow-sm">{food.name}</h3>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-white font-black text-xl leading-none">${food.price.toFixed(2)}</div>
                <div className="flex items-center gap-1 mt-1 justify-end">
                  <Flame className="w-3 h-3 text-orange-300" />
                  <span className="text-white/80 text-xs font-medium">{food.nutrition.calories} kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 flex flex-col gap-3.5 flex-1">
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{food.description}</p>

          {/* Macro pills */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Protein", value: food.nutrition.protein, unit: "g", color: "#22c55e", bg: "bg-green-50 dark:bg-green-900/20" },
              { label: "Carbs", value: food.nutrition.carbs, unit: "g", color: "#f97316", bg: "bg-orange-50 dark:bg-orange-900/20" },
              { label: "Fat", value: food.nutrition.fat, unit: "g", color: "#a855f7", bg: "bg-purple-50 dark:bg-purple-900/20" },
            ].map(m => (
              <div key={m.label} className={`${m.bg} rounded-xl p-2 text-center`}>
                <div className="font-bold text-base" style={{ color: m.color }}>{m.value}{m.unit}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Macro bar */}
          <div>
            <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
              {(() => {
                const t = food.nutrition.protein + food.nutrition.carbs + food.nutrition.fat;
                return [
                  { pct: (food.nutrition.protein / t) * 100, color: "#22c55e" },
                  { pct: (food.nutrition.carbs / t) * 100, color: "#f97316" },
                  { pct: (food.nutrition.fat / t) * 100, color: "#a855f7" },
                ].map((seg, i) => (
                  <div key={i} className="h-full" style={{ width: `${seg.pct}%`, background: seg.color }} />
                ));
              })()}
            </div>
            <div className="text-xs text-muted-foreground mt-1 text-right">{food.servingSize}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {food.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: `${food.color}14`, color: food.color, border: `1px solid ${food.color}28` }}
              >
                {tag}
              </span>
            ))}
            {food.tags.length > 2 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-muted text-muted-foreground">
                +{food.tags.length - 2}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-sm font-semibold border-2 border-border bg-background hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); onSelect(food); }}
              data-testid={`btn-details-${food.id}`}
            >
              <BookOpen className="w-4 h-4" />
              Details
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-2xl text-white text-sm font-bold hover:opacity-90 active:scale-[0.97] transition-all duration-150 shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${food.color} 0%, ${food.color}bb 100%)`,
                boxShadow: `0 4px 14px ${food.color}40`,
              }}
              onClick={(e) => { e.stopPropagation(); onOrder(food); }}
              data-testid={`btn-order-${food.id}`}
            >
              <ShoppingCart className="w-4 h-4" />
              Order
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
