"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type NotificationType = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  message: string;
  type: NotificationType;
}

interface ToastContextValue {
  show: (message: string, type?: NotificationType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const show = useCallback(
    (message: string, type: NotificationType = "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toasts.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`rounded-lg px-6 py-3 shadow-lg ${
                toast.type === "success"
                  ? "bg-green-600 text-white"
                  : toast.type === "error"
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-white"
              }`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
