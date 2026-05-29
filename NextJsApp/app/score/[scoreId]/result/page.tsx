import { getScore } from "@/app/actions/scores"
import { getScoreResult } from "@/app/actions/scores"
import { EndResult } from "@/lib/types"

interface Props {
  params: Promise<{ scoreId: string }>
}

function arrowDisplay(score: number): string {
  if (score === 10) return "X"
  if (score === 0) return "M"
  return String(score)
}

export default async function ResultPage({ params }: Props) {
  const { scoreId } = await params
  const score = await getScore(Number(scoreId))
  const ends = await getScoreResult(Number(scoreId))

  const total = (ends as EndResult[])
  .flatMap((e) => e.arrows)
  .reduce((s, v) => s + v, 0)
  
  const maxScore = ends.length * 6 * 10

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">{score.Archer_Name}</h1>
        <p className="text-sm text-muted-foreground">
          {score.Round_Name} · {score.Equipment_Name} · {score.Comp_Name}
        </p>
      </div>

      {/* Total */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-5xl font-bold">{total}</span>
        <span className="text-muted-foreground text-lg">/ {maxScore}</span>
      </div>

      {/* End breakdown */}
      <div className="flex flex-col gap-2">
        {(ends as EndResult[]).map((end) => {
          const endTotal = end.arrows.reduce((s: number, v: number) => s + v, 0)
          return (
            <div key={end.End_ID} className="flex items-center justify-between border rounded-lg px-4 py-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  End {end.Sequence} · {end.Distance}m {end.Size_cm}cm
                </p>
                <div className="flex gap-2">
                  {end.arrows.map((arrow: number, i: number) => (
                    <span key={i} className="text-sm font-medium w-6 text-center">
                      {arrowDisplay(arrow)}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-bold">{endTotal}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}