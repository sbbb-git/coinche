import { useEffect, useState } from "react";

/** Réagit à une media query (ex. paysage téléphone à faible hauteur). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Vrai sur les écrans bas (typiquement téléphone en paysage) : on compacte l'UI. */
export function useCompactHeight(): boolean {
  return useMediaQuery("(max-height: 560px)");
}
