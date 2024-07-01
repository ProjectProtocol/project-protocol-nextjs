"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

export default function AnimatedList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation}>
      {React.Children.map(children, (child, index) => (
        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: index * 0.15, ease: "easeOut" }}
        >
          {child}
        </m.div>
      ))}
    </LazyMotion>
  );
}
