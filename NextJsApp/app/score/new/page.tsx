import { getCompetitions } from "@/app/actions/competitions"
import { getArchers } from "@/app/actions/archers"
import { getEquipment } from "@/app/actions/equipment"
import NewScoreForm from "./form"

export default async function NewScorePage() {
  const [competitions, archers, equipment] = await Promise.all([
    getCompetitions(),
    getArchers(),
    getEquipment(),
  ])

  return (
    <div className="w-full max-w-md mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">New Score</h1>
      <NewScoreForm competitions={competitions} archers={archers} equipment={equipment} />
    </div>
  )
}