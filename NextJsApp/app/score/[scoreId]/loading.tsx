import { Skeleton } from "@/components/ui/skeleton"

export default function ScoreLoading() {
  return (
    <div className="w-full max-w-lg mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* End rows */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border rounded-lg px-4 py-3">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}