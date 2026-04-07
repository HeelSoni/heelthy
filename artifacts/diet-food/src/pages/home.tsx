import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Hero } from "@/components/Hero";
import { FoodCard } from "@/components/FoodCard";
import { FoodModal } from "@/components/FoodModal";
import { CartSidebar, CartItem } from "@/components/CartSidebar";
import { Navbar } from "@/components/Navbar";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { Toast } from "@/components/Toast";
import { foods, CATEGORIES, Food } from "@/data/foods";
import { Search, TrendingDown, TrendingUp, Minus, X, SlidersHorizontal, LayoutGrid } from "lucide-react";

type WeightFilter = "all" | "loss" | "gain" | "maintain";

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [weightFilter, setWeightFilter] = useState<WeightFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ visible: boolean; message: string; food?: Food }>({ visible: false, message: "" });

  const dishesRef = useRef<HTMLDivElement>(null);
  const dishesInView = useInView(dishesRef, { once: true, amount: 0.05 });

  const showToast = useCallback((message: string, food?: Food) => {
    setToast({ visible: true, message, food });
    setTimeout(() => setToast(p => ({ ...p, visible: false })), 3200);
  }, []);

  const handleOrder = useCallback((food: Food) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.food.id === food.id);
      if (existing) return prev.map(i => i.food.id === food.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { food, qty: 1 }];
    });
    showToast(`${food.name} added to cart!`, food);
  }, [showToast]);

  const handleUpdateQty = useCallback((foodId: number, qty: number) => {
    if (qty <= 0) setCartItems(prev => prev.filter(i => i.food.id !== foodId));
    else setCartItems(prev => prev.map(i => i.food.id === foodId ? { ...i, qty } : i));
  }, []);

  const handleRemove = useCallback((foodId: number) => {
    setCartItems(prev => prev.filter(i => i.food.id !== foodId));
  }, []);

  const filteredFoods = foods.filter(food => {
    const matchCat = activeCategory === "All" || food.category === activeCategory;
    const matchWeight = weightFilter === "all" || food.weightEffect === weightFilter;
    const matchSearch = !searchQuery ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchWeight && matchSearch;
  });

  const hasFilters = activeCategory !== "All" || weightFilter !== "all" || searchQuery !== "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItems={cartItems} onCartOpen={() => setCartOpen(true)} />

      <Hero onExplore={() => dishesRef.current?.scrollIntoView({ behavior: "smooth" })} />

      <HowItWorks />

      {/* ——— Dishes section ——— */}
      <section id="dishes" ref={dishesRef} className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={dishesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={dishesInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-6 text-white"
              style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
            >
              <LayoutGrid className="w-4 h-4" />
              Our Pure-Veg Menu
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black font-serif mb-4">
              25 <span className="gradient-text">Healthy</span> Dishes
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Every dish is crafted to nourish your body and delight your taste buds —
              real food, real nutrition, real results.
            </p>
          </motion.div>

          {/* Filter panel */}
          <motion.div
            className="mb-10 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={dishesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search dishes, ingredients, tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-border bg-card text-sm font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 placeholder:text-muted-foreground/60"
                data-testid="search-input"
              />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`category-chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  data-testid={`category-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Weight goal filter */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                <SlidersHorizontal className="w-4 h-4" />
                Goal:
              </div>
              {([
                { value: "all" as const, label: "All Goals" },
                { value: "loss" as const, label: "Weight Loss", icon: <TrendingDown className="w-3.5 h-3.5" /> },
                { value: "gain" as const, label: "Weight Gain", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                { value: "maintain" as const, label: "Maintain", icon: <Minus className="w-3.5 h-3.5" /> },
              ]).map(f => (
                <button
                  key={f.value}
                  className={`flex items-center gap-1.5 category-chip ${weightFilter === f.value ? "active" : ""}`}
                  onClick={() => setWeightFilter(f.value)}
                  data-testid={`weight-filter-${f.value}`}
                >
                  {"icon" in f && f.icon}
                  {f.label}
                </button>
              ))}
            </div>

            {/* Active filter summary + clear */}
            {hasFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center justify-center gap-3"
              >
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">{filteredFoods.length}</strong> of {foods.length} dishes
                </span>
                <button
                  className="text-xs font-semibold text-primary hover:text-primary/70 underline-offset-2 hover:underline transition-colors"
                  onClick={() => { setActiveCategory("All"); setWeightFilter("all"); setSearchQuery(""); }}
                  data-testid="clear-filters"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Food grid */}
          {filteredFoods.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-3">No dishes found</h3>
              <p className="text-muted-foreground mb-8">Try a different search or category</p>
              <button
                className="px-8 py-3.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-md"
                style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.35)" }}
                onClick={() => { setActiveCategory("All"); setWeightFilter("all"); setSearchQuery(""); }}
              >
                Show All Dishes
              </button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredFoods.map((food, i) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  index={i}
                  onSelect={setSelectedFood}
                  onOrder={handleOrder}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Benefits />

      {/* Footer */}
      <footer className="py-14 px-6 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                🌿
              </div>
              <div>
                <div className="font-black text-xl gradient-text">Heelthy</div>
                <div className="text-xs text-muted-foreground">100% Pure Vegetarian</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center w-4 h-4 rounded-sm border-2 border-green-600">
                <div className="w-2 h-2 rounded-full bg-green-600" />
              </div>
              <span className="text-green-700 dark:text-green-400 text-sm font-semibold">All 25 dishes are 100% Pure Vegetarian</span>
            </div>
            <p className="text-muted-foreground/60 text-sm">
              © 2025 Heelthy. Made with 💚
            </p>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <FoodModal
        food={selectedFood}
        onClose={() => setSelectedFood(null)}
        onOrder={food => { handleOrder(food); setSelectedFood(null); }}
      />

      <CartSidebar
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClearCart={() => setCartItems([])}
      />

      <Toast
        visible={toast.visible}
        message={toast.message}
        icon={toast.food?.emoji}
        color={toast.food?.color}
        onClose={() => setToast(p => ({ ...p, visible: false }))}
      />
    </div>
  );
}
