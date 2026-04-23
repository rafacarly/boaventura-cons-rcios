import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  // Convert to string and parse numeric value
  const valueStr = String(value);
  const numericValue = parseInt(valueStr.replace(/\D/g, "")) || 0;
  const hasPlus = valueStr.includes("+");
  const hasPercent = valueStr.includes("%");

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