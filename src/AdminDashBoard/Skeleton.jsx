// components/ui/skeleton.jsx
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-muted rounded-md ${className}`}
    />
  );
}
