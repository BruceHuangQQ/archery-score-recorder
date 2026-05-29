import { getScore } from "@/app/actions/scores"
import { getRangesByRound } from "@/app/actions/rounds"
import ScoreSheet from "./score-sheet"

interface Props {
  params: Promise<{ scoreId: string }>
}

export default async function ScorePage({ params }: Props) {
  const { scoreId } = await params
  const score = await getScore(Number(scoreId))
  const ranges = await getRangesByRound(score.Round_ID)

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">{score.Archer_Name}</h1>
        <p className="text-sm text-muted-foreground">
          {score.Round_Name} · {score.Equipment_Name} · {score.Comp_Name}
        </p>
      </div>

      <ScoreSheet score={score} ranges={ranges} />
    </div>
  )
}