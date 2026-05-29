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
      <Button asChild size="lg" className="w-full">
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