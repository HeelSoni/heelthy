import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, BarChart3, ChefHat, ShoppingCart, Clock, Zap, Check } from "lucide-react";
import { Food } from "@/data/foods";

interface FoodModalProps {
  food: Food | null;
  onClose: () => void;
  onOrder: (food: Food) => void;
}

type Tab = "nutrition" | "recipe" | "order";

function VegDot() {
  return (
    <div className="flex items-center justify-center w-5 h-5 rounded-sm border-2 border-green-600 bg-white flex-shrink-0">
      <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
    </div>
  );
}

export function FoodModal({ food, onClose, onOrder }: FoodModalProps) {
  const [tab, setTab] = useState<Tab>("nutrition");
  const [qty, setQty] = useState(1);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    if (!food) return;
    for (let i = 0; i < qty; i++) onOrder(food);
    setOrdered(true);
    setTimeout(() => { setOrdered(false); onClose(); setQty(1); }, 1400);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "nutrition", label: "Nutrition", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "recipe", label: "Recipe", icon: <ChefHat className="w-4 h-4" /> },
    { id: "order", label: "Order", icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const macroTotal = food ? food.nutrition.protein + food.nutrition.carbs + food.nutrition.fat : 1;

  const macros = food ? [
    { label: "Protein", value: food.nutrition.protein, color: "#22c55e", bg: "#22c55e15" },
    { label: "Carbs", value: food.nutrition.carbs, color: "#f97316", bg: "#f9731615" },
    { label: "Fat", value: food.nutrition.fat, color: "#a855f7", bg: "#a855f715" },
    { label: "Fiber", value: food.nutrition.fiber, color: "#06b6d4", bg: "#06b6d415" },
  ] : [];

  return (
    <AnimatePresence>
      {food && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="relative bg-card rounded-3xl overflow-hidden shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col border border-border"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
          >
            {/* Header image */}
            <div className="relative h-56 flex-shrink-0 overflow-hidden">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Veg badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 shadow-sm">
                <VegDot />
                <span className="text-green-700 text-xs font-bold">PURE VEG</span>
              </div>

              {/* Close button */}
              <button
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/50 hover:bg-black/70 flex items-center justify-center text-white backdrop-blur-sm transition-colors"
                onClick={onClose}
                data-testid="modal-close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Food info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl drop-shadow">{food.emoji}</span>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full font-bold text-white"
                        style={{ background: `${food.color}cc` }}
                      >
                        {food.category}
                      </span>
                    </div>
                    <h2 className="text-white font-black text-2xl leading-tight drop-shadow">{food.name}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-3xl leading-none">${food.price.toFixed(2)}</div>
                    <div className="flex items-center gap-1 mt-1.5 justify-end">
                      <Flame className="w-3.5 h-3.5 text-orange-300" />
                      <span className="text-white/80 text-sm font-semibold">{food.nutrition.calories} kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-3 px-5 py-3 bg-muted/30 border-b border-border flex-wrap">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">{food.prepTime}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-sm">{food.difficulty}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="text-xs text-muted-foreground">{food.servingSize}</span>
              <div className="flex-1" />
              <div className="flex flex-wrap gap-1">
                {food.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${food.color}15`, color: food.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 py-3 border-b border-border bg-card">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    tab === t.id
                      ? "text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  style={tab === t.id ? { background: `linear-gradient(135deg, ${food.color}, ${food.color}bb)` } : {}}
                  data-testid={`tab-${t.id}`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {/* NUTRITION TAB */}
                {tab === "nutrition" && (
                  <motion.div
                    key="nutrition"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    {/* Calorie highlight */}
                    <div
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: `linear-gradient(135deg, ${food.color}18, ${food.color}08)`, border: `1px solid ${food.color}25` }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                        style={{ background: `${food.color}20` }}
                      >
                        <Flame className="w-5 h-5" style={{ color: food.color }} />
                        <span className="text-xs font-bold mt-0.5" style={{ color: food.color }}>kcal</span>
                      </div>
                      <div>
                        <div className="font-black text-4xl leading-none" style={{ color: food.color }}>{food.nutrition.calories}</div>
                        <div className="text-sm text-muted-foreground mt-1">calories per serving</div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-xs text-muted-foreground">Sugar</div>
                        <div className="font-bold text-xl">{food.nutrition.sugar}g</div>
                      </div>
                    </div>

                    {/* Macro grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {macros.map(m => (
                        <div key={m.label} className="macro-pill rounded-2xl" style={{ background: m.bg }}>
                          <span className="font-black text-xl" style={{ color: m.color }}>{m.value}g</span>
                          <span className="text-xs font-semibold text-muted-foreground">{m.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Macro bars */}
                    <div className="space-y-3">
                      {macros.map(m => (
                        <div key={m.label}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-sm font-semibold">{m.label}</span>
                            <span className="text-sm font-bold" style={{ color: m.color }}>{m.value}g</span>
                          </div>
                          <div className="nutrition-bar">
                            <motion.div
                              className="nutrition-bar-fill"
                              style={{ background: m.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((m.value / macroTotal) * 100 * 3.2, 100)}%` }}
                              transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Weight goal */}
                    <div
                      className="rounded-2xl p-4 flex gap-3 items-start"
                      style={{ background: `${food.color}10`, border: `1px solid ${food.color}20` }}
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 text-base"
                        style={{ background: food.color }}>
                        💪
                      </div>
                      <div>
                        <div className="font-bold text-sm mb-1" style={{ color: food.color }}>
                          Best for: {food.weightEffect === "loss" ? "Weight Loss" : food.weightEffect === "gain" ? "Weight Gain" : "Maintain Weight"}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{food.weightEffectDesc}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* RECIPE TAB */}
                {tab === "recipe" && (
                  <motion.div
                    key="recipe"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-4"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">{food.description}</p>

                    <div>
                      <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                        <ChefHat className="w-4 h-4" style={{ color: food.color }} />
                        Ingredients
                        <span className="ml-auto text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                          {food.ingredients.length} items
                        </span>
                      </h3>
                      <div className="space-y-2">
                        {food.ingredients.map((ing, i) => (
                          <motion.div
                            key={ing.name}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="flex items-center justify-between py-2.5 px-4 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: food.color }}
                              />
                              <span className="font-medium text-sm">{ing.name}</span>
                            </div>
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded-lg"
                              style={{ background: `${food.color}15`, color: food.color }}
                            >
                              {ing.amount} {ing.unit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ORDER TAB */}
                {tab === "order" && (
                  <motion.div
                    key="order"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    {/* Item summary card */}
                    <div className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-border">
                      <img src={food.image} alt={food.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          <VegDot />
                          <h3 className="font-bold text-sm leading-tight">{food.name}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{food.description}</p>
                        <div className="flex items-center gap-1.5">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span className="text-xs font-semibold">{food.nutrition.calories} kcal</span>
                        </div>
                      </div>
                    </div>

                    {/* Qty selector */}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Quantity</span>
                      <div className="qty-input">
                        <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))} data-testid="qty-decrease">−</button>
                        <span className="font-black text-lg w-8 text-center">{qty}</span>
                        <button className="qty-btn" onClick={() => setQty(q => q + 1)} data-testid="qty-increase">+</button>
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="rounded-2xl border border-border overflow-hidden">
                      {[
                        { label: "Unit price", val: `$${food.price.toFixed(2)}` },
                        { label: "Quantity", val: `× ${qty}` },
                        { label: "Delivery", val: "Free", green: true },
                      ].map(row => (
                        <div key={row.label} className="flex justify-between items-center px-4 py-3 bg-muted/20 border-b border-border last:border-b-0">
                          <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
                          <span className={`font-bold ${row.green ? "text-green-600" : ""}`}>{row.val}</span>
                        </div>
                      ))}
                      <div
                        className="flex justify-between items-center px-4 py-4 border-t"
                        style={{ borderColor: `${food.color}40`, background: `${food.color}08` }}
                      >
                        <span className="font-bold">Total</span>
                        <span className="font-black text-2xl" style={{ color: food.color }}>
                          ${(food.price * qty).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order CTA */}
                    <button
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white font-black text-base transition-all duration-300"
                      style={{
                        background: ordered
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : `linear-gradient(135deg, ${food.color}, ${food.color}bb)`,
                        boxShadow: ordered
                          ? "0 8px 28px rgba(34,197,94,0.45)"
                          : `0 8px 28px ${food.color}45`,
                        transform: ordered ? "scale(1)" : "scale(1)",
                      }}
                      onClick={handleOrder}
                      data-testid="btn-add-to-cart"
                    >
                      <AnimatePresence mode="wait">
                        {ordered ? (
                          <motion.span
                            key="done"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Check className="w-5 h-5" /> Added to Cart!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0 }}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            Add {qty > 1 ? `${qty} × ` : ""}to Cart · ${(food.price * qty).toFixed(2)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
