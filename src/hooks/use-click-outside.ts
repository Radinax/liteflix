import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(cb: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!ref.current?.contains(e.target)) cb();
    };

    window.addEventListener("mousedown", listener);
    window.addEventListener("touchstart", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
      window.removeEventListener("touchstart", listener);
    };
  }, [cb]);

  return ref;
}
