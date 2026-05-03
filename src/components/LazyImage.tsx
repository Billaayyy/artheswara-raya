import { useState } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export default function LazyImage({
  className,
  wrapperClassName,
  onLoad,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted", wrapperClassName)}>
      <div
        className={cn(
          "absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]",
          "bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10",
          loaded && "hidden"
        )}
      />
      <img
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  );
}
