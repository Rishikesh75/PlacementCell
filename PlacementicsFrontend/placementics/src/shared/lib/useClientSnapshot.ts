import { useCallback, useRef, useSyncExternalStore } from "react";

function subscribeNever() {
  return () => {};
}

export { subscribeNever };

export function useClientSnapshot<T>(read: () => T): T {
  const cacheRef = useRef<{ serialized: string; value: T } | null>(null);

  const getSnapshot = useCallback(() => {
    const value = read();
    const serialized = JSON.stringify(value);

    if (cacheRef.current?.serialized === serialized) {
      return cacheRef.current.value;
    }

    cacheRef.current = { serialized, value };
    return value;
  }, [read]);

  return useSyncExternalStore(subscribeNever, getSnapshot, getSnapshot);
}
