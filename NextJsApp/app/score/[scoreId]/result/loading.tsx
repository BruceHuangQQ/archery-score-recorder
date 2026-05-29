import { Skeleton } from "@/components/ui/skeleton"

export default function ResultLoading() {
  return (
    <div className="w-full max-w-lg mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Total */}
      <div className="flex items-baseline gap-2 mb-6">
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>

      {/* End rows */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}