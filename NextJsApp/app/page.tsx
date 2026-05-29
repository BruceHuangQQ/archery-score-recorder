import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getRecentScores } from "@/app/actions/scores"
import { RecentScore } from "@/lib/types"
import { ChevronRight } from "lucide-react"

export default async function Home() {
  const recentScores = await getRecentScores() as RecentScore[]

  return (
    <div className="w-full max-w-lg mx-auto p-6 flex flex-col gap-8">
      {/* Start new score */}
      <Button
        asChild
        size="lg"
        className="group relative isolate w-full overflow-hidden ring-1 ring-primary before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-primary-foreground/20 before:opacity-80 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-primary-foreground/10 after:to-transparent after:mix-blend-overlay"
      >
        <Link href="/score/new">+ Start New Score</Link>
      </Button>

      {/* Recent scores */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Recent Scores
        </h2>
        <div className="flex flex-col gap-2">
          {recentScores.length === 0 && (
            <p className="text-sm text-muted-foreground">No scores recorded yet.</p>
          )}
          {recentScores.map((score) => (
            <Link
              key={score.Score_ID}
              href={`/score/${score.Score_ID}/result`}
              className="flex items-center justify-between border rounded-lg px-4 py-3 hover:bg-muted transition-colors"
            >
              <div>
                <p className="font-medium text-sm">{score.Archer_Name}</p>
                <p className="text-xs text-muted-foreground">
                  {score.Round_Name} · {score.Equipment_Name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold">{score.Total}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(score.Score_Date).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}