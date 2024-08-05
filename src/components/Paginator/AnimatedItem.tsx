"use client";

import { m } from "framer-motion";

export default function AnimatedItem({
  animated,
  index,
  children,
}: {
  animated?: boolean;
  index: number;
  children: React.ReactNode;
}) {
  if (animated) {
    return (
      <m.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: index * 0.15, ease: "easeOut" }}
      >
        {children}
      </m.div>
    );
  } else {
    return children;
  }
}
