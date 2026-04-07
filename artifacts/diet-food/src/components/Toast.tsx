import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  icon?: string;
  color?: string;
}

export function Toast({ message, visible, onClose, icon, color = "#22c55e" }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 bg-card border shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-3 max-w-sm"
          style={{ borderColor: `${color}30` }}
          data-testid="toast-notification"
        >
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <div className="p-1 rounded-full" style={{ background: `${color}20`, color }}>
              <CheckCircle className="w-5 h-5" />
            </div>
          )}
          <span className="flex-1 font-medium text-sm">{message}</span>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
