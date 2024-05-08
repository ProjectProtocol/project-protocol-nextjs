"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

const ImageWithFallback = ({
  fallbackImage,
  src,
  alt,
  ...props
}: ImageProps & { fallbackImage: string }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={(e) => setError(true)}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
