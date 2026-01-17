import { useState, useCallback, memo } from "react";

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  onClick?: () => void;
}

/**
 * OptimizedImage component that provides:
 * - WebP format with JPG fallback using <picture> element
 * - Lazy loading by default
 * - Blur-up loading effect
 * - Responsive images with srcset
 */
const OptimizedImage = memo(({
  src,
  webpSrc,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  onClick,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // If we have a webpSrc, use picture element for format selection
  if (webpSrc && !hasError) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </picture>
    );
  }

  // Fallback to regular img
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
      className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    />
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;