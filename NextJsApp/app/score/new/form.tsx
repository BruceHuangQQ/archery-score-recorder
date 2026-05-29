"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Competition, Archer, Equipment } from "@/lib/types";
import { useRouter } from "next/navigation"
import { createScore } from "@/app/actions/scores"

interface Props {
  competitions: Competition[];
  archers: Archer[];
  equipment: Equipment[];
}

export default function NewScoreForm({ competitions, archers, equipment }: Props) {
  const [compId, setCompId] = useState<string>("");
  const [archerId, setArcherId] = useState<string>("");
  const [equipmentId, setEquipmentId] = useState<string>("");

  const selectedComp = competitions.find((c) => String(c.Comp_ID) === compId);
  const selectedArcher = archers.find((a) => String(a.Archer_ID) === archerId);

  const router = useRouter()

  function handleArcherChange(value: string) {
    setArcherId(value);
    const archer = archers.find((a) => String(a.Archer_ID) === value);
    if (archer) setEquipmentId(String(archer.Def_Equipment_ID));
  }

  async function handleDone() {
    if (!compId || !archerId || !equipmentId) return;
    const score = await createScore(
      Number(archerId),
      Number(compId),
      Number(equipmentId)
    )
    router.push(`/score/${score.Score_ID}`)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Competition */}
      <div className="flex flex-col gap-2">
        <Label>Choose Competition</Label>
        <Select onValueChange={setCompId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a competition" />
          </SelectTrigger>
          <SelectContent>
            {competitions.map((c) => (
              <SelectItem key={c.Comp_ID} value={String(c.Comp_ID)}>
                {c.Comp_Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Show round under selected competition */}
        {selectedComp && (
          <p className="text-sm text-muted-foreground pl-1">
            Round: {selectedComp.Round_Name}
          </p>
        )}
      </div>

      {/* Archer */}
      <div className="flex flex-col gap-2">
        <Label>Choose Archer</Label>
        <Select onValueChange={handleArcherChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an archer" />
          </SelectTrigger>
          <SelectContent>
            {archers.map((a) => (
              <SelectItem key={a.Archer_ID} value={String(a.Archer_ID)}>
                {a.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Equipment — shows after archer selected, can be changed */}
      {selectedArcher && (
        <div className="flex flex-col gap-2">
          <Label>Equipment</Label>
          <Select value={equipmentId} onValueChange={setEquipmentId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select equipment" />
            </SelectTrigger>
            <SelectContent>
              {equipment.map((e) => (
                <SelectItem key={e.Equipment_ID} value={String(e.Equipment_ID)}>
                  {e.Equipment_Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button onClick={handleDone} disabled={!compId || !archerId || !equipmentId}>
        Done
      </Button>
    </div>
  )
}