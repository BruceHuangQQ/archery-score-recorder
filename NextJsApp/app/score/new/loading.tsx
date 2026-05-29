import { Skeleton } from "@/components/ui/skeleton"

export default function NewScoreLoading() {
  return (
    <div className="w-full max-w-md mx-auto p-10 flex flex-col gap-6">
      <Skeleton className="h-8 w-32" />

      {/* Competition select */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Archer select */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Done button */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}