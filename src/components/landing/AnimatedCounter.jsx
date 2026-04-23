import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  // Parse numeric value from string like "+2.000", "15+", "100%"
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const endValue = numericValue;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * endValue);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue, duration]);

  const formatNumber = (n) => {
    if (n >= 1000) return n.toLocaleString("pt-BR");
    return n.toString();
  };

  return (
    <span ref={ref}>
      {prefix}
      {hasPlus && "+"}
      {formatNumber(count)}
      {hasPercent && "%"}
      {suffix}
    </span>
  );
}