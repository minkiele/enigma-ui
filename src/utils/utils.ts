import { useCallback, useRef } from "react";

export const useScrollIntoView = <E extends HTMLElement>() => {
  const ref = useRef<E | null>(null);
  const scrollIntoView = useCallback(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return { scrollIntoView, ref };
};
