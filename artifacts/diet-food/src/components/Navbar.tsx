import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { CartItem } from "./CartSidebar";

interface NavbarProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
}

export function Navbar({ cartItems, onCartOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-30 px-4 pt-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="glass rounded-2xl px-5 py-3 flex items-center justify-between border transition-all duration-300"
          style={{
            borderColor: scrolled ? "hsl(var(--border))" : "rgba(255,255,255,0.3)",
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.1)" : "0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
            >
              🌿
            </div>
            <div>
              <span className="font-black text-xl gradient-text leading-none">Heelthy</span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex items-center justify-center w-3 h-3 rounded-sm border border-green-600 bg-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                </div>
                <span className="text-green-700 dark:text-green-500 text-[10px] font-bold tracking-wide">PURE VEG</span>
              </div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Dishes", id: "dishes" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Benefits", id: "benefits" },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              className="relative p-2.5 rounded-xl bg-muted/70 hover:bg-muted transition-all duration-200"
              onClick={onCartOpen}
              data-testid="cart-btn"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", damping: 14, stiffness: 300 }}
                    className="cart-badge"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2.5 rounded-xl bg-muted/70 hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(m => !m)}
              data-testid="menu-toggle"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 glass rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              {[
                { label: "Dishes", id: "dishes" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Benefits", id: "benefits" },
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left px-6 py-4 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b last:border-b-0 border-border/50"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
