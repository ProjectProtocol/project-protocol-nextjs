"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";
import AnimatedItem from "./Paginator/AnimatedItem";

export default function AnimatedList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation}>
      {React.Children.map(children, (child, index) => (
        <AnimatedItem key={`animated-item-${index}`} index={index} animated>
          {child}
        </AnimatedItem>
      ))}
    </LazyMotion>
  );
}
