import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Car } from "lucide-react";

export default function ScrollCarAnimation({ label = "Boaventura | Consórcios" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Car moves from 0% to 100% of the track as the section scrolls
  const carX = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);

  return (
    <div ref={ref} className="w-full mb-6">
      {/* Track */}
      <div className="relative flex items-center w-full">
        {/* Left dashes */}
        <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-0.5 flex-1 bg-brown-caramel/40 rounded-full" />
          ))}
        </div>

        {/* Moving car icon */}
        <motion.div
          style={{ left: carX }}
          className="absolute"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full bg-brown-caramel flex items-center justify-center shadow-lg shadow-brown-caramel/40"
          >
            <Car className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>

        {/* Right dashes */}
        <div className="flex-1 flex items-center gap-1.5 overflow-hidden ml-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-0.5 flex-1 bg-brown-caramel/40 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}