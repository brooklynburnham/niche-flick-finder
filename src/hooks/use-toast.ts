
// This file now simply re-exports the toast function from sonner
// to maintain compatibility with existing code
import { toast } from "sonner";

export { toast };

// Export a dummy useToast that returns an object with toast function
// for backward compatibility
export function useToast() {
  return {
    toast,
    toasts: [],
    dismiss: () => {},
  };
}
