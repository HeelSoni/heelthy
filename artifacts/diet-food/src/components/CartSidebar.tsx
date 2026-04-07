import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, CheckCircle } from "lucide-react";
import { Food } from "@/data/foods";
import { useState } from "react";

export interface CartItem {
  food: Food;
  qty: number;
}

interface CartSidebarProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (foodId: number, qty: number) => void;
  onRemove: (foodId: number) => void;
  onClearCart: () => void;
}

export function CartSidebar({ open, items, onClose, onUpdateQty, onRemove, onClearCart }: CartSidebarProps) {
  const [ordered, setOrdered] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.food.price * item.qty, 0);
  const delivery = items.length > 0 ? 2.99 : 0;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      onClearCart();
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-2xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            data-testid="cart-sidebar"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">Your Order</h2>
                  <p className="text-sm text-muted-foreground">{items.reduce((s, i) => s + i.qty, 0)} items</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
                data-testid="cart-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="text-7xl">🛒</div>
                  <h3 className="text-xl font-semibold">Your cart is empty</h3>
                  <p className="text-muted-foreground">Add some healthy dishes to get started!</p>
                  <button
                    className="mt-4 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                    onClick={onClose}
                  >
                    Browse Dishes
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.food.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        className="flex gap-3 p-3 rounded-2xl bg-muted/40 border border-border"
                        data-testid={`cart-item-${item.food.id}`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.food.image} alt={item.food.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-sm leading-tight">{item.food.name}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.food.nutrition.calories} kcal</p>
                            </div>
                            <button
                              onClick={() => onRemove(item.food.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                              data-testid={`remove-${item.food.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onUpdateQty(item.food.id, item.qty - 1)}
                                className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                                data-testid={`cart-qty-down-${item.food.id}`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-sm w-5 text-center">{item.qty}</span>
                              <button
                                onClick={() => onUpdateQty(item.food.id, item.qty + 1)}
                                className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                                data-testid={`cart-qty-up-${item.food.id}`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-primary">${(item.food.price * item.qty).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t border-border pt-2">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {ordered ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-600"
                    >
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">Order Placed Successfully!</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="checkout"
                      className="order-btn w-full flex items-center justify-center gap-2"
                      onClick={handleCheckout}
                      data-testid="btn-checkout"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Checkout · ${total.toFixed(2)}
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="text-center text-xs text-muted-foreground">
                  Free delivery on orders above $30 · Est. 30-45 min
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
