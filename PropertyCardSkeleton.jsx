// src/components/ui/PropertyCardSkeleton.jsx
export default function PropertyCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      {/* Image */}
      <div className="shimmer aspect-[4/3] w-full" />
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="shimmer h-5 w-3/4 rounded-lg" />
        <div className="shimmer h-4 w-1/2 rounded-lg" />
        <div className="flex gap-2 pt-1">
          <div className="shimmer h-6 w-16 rounded-full" />
          <div className="shimmer h-6 w-16 rounded-full" />
          <div className="shimmer h-6 w-16 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-surface-border">
          <div className="shimmer h-7 w-28 rounded-lg" />
          <div className="shimmer h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
