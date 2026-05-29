"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RangeDefinition, ScoreDetail } from "@/lib/types"
import { useRouter } from "next/navigation"
import { createEnd, submitArrows } from "@/app/actions/ends"
import { completeScore } from "@/app/actions/scores"

interface EndRow {
  rangeId: number
  endNumber: number      // 1-based within the range
  totalEnds: number      // End_Count for this range
  distance: number
  faceCm: number
  arrowCount: number
}

interface Props {
    score: ScoreDetail
    ranges: RangeDefinition[]
}

// Expand ranges into individual end rows
function buildEndRows(ranges: RangeDefinition[]): EndRow[] {
  const rows: EndRow[] = []
  for (const range of ranges) {
    for (let i = 1; i <= range.End_Count; i++) {
      rows.push({
        rangeId: range.Range_ID,
        endNumber: i,
        totalEnds: range.End_Count,
        distance: range.Distance,
        faceCm: range.Size_cm,
        arrowCount: 6,
      })
    }
  }
  return rows
}

const ARROW_VALUES = ["X", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "M"]

function arrowToNumber(v: string): number {
  if (v === "X" || v === "10") return 10
  if (v === "M") return 0
  return parseInt(v)
}

export default function ScoreSheet({ score, ranges }: Props) {
  const endRows = buildEndRows(ranges)
  const router = useRouter()


  // Store submitted arrows per end index
  const [submitted, setSubmitted] = useState<Record<number, string[]>>({})

  // Modal state
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [arrows, setArrows] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const currentEnd = openIndex !== null ? endRows[openIndex] : null

  function openModal(index: number) {
    setOpenIndex(index)
    setArrows(submitted[index] ?? [])
  }

  function closeModal() {
    setOpenIndex(null)
    setArrows([])
  }

  function handleArrowKey(value: string) {
    if (!currentEnd) return
    if (arrows.length >= currentEnd.arrowCount) return

    // Enforce descending order — only allow values <= last entered
    const lastVal = arrows.length > 0 ? arrowToNumber(arrows[arrows.length - 1]) : 11
    if (arrowToNumber(value) > lastVal) return

    setArrows([...arrows, value])
  }

  function handleSave() {
    if (openIndex === null) return
    setSubmitted({ ...submitted, [openIndex]: arrows })
    closeModal()
  }

  async function handleFinish() {
    setSaving(true)
    try {
      for (let i = 0; i < endRows.length; i++) {
        const end = endRows[i]
        const arrows = submitted[i]
  
        const endResult = await createEnd(
          score.Score_ID,
          end.endNumber
        )
        await submitArrows(endResult.End_ID, arrows)
      }
  
      await completeScore(score.Score_ID)
      router.push(`/score/${score.Score_ID}/result`)
    } finally {
      setSaving(false)
    }
  }

  // Running total
  const total = Object.values(submitted)
    .flat()
    .reduce((sum, v) => sum + arrowToNumber(v), 0)

  const allDone = Object.keys(submitted).length === endRows.length

  return (
    <div className="flex flex-col gap-3">
      {endRows.map((end, i) => {
        const isLocked = i > 0 && submitted[i - 1] === undefined
        const endSubmitted = submitted[i]
        const endTotal = endSubmitted
          ? endSubmitted.reduce((s, v) => s + arrowToNumber(v), 0)
          : null

        return (
          <div
            key={i}
            className={`flex items-center justify-between border rounded-lg px-4 py-3 transition-opacity ${
              isLocked ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <div>
              <p className="font-medium text-sm">{score.Archer_Name}</p>
              <p className="text-xs text-muted-foreground">
                {end.endNumber}/{end.totalEnds} ({end.distance}m {end.faceCm}cm)
                {endSubmitted && (
                  <span className="ml-2 font-semibold text-foreground">
                    [{endSubmitted.join(" ")}] = {endTotal}
                  </span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => openModal(i)}
              disabled={isLocked}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        )
      })}

      {/* Running total */}
      <div className="flex justify-between items-center pt-2 border-t mt-2">
        <span className="text-sm text-muted-foreground">Running total</span>
        <span className="font-bold text-lg">{total}</span>
      </div>

      {/* Finish button */}
      {allDone && (
        <Button onClick={handleFinish} disabled={saving} className="mt-2">
            {saving ? "Saving..." : "Finish"}
        </Button>
        )}

      {/* Arrow entry modal */}
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-sm">
          {currentEnd && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {score.Archer_Name}, {score.Equipment_Name}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {currentEnd.distance}m {currentEnd.faceCm}cm · End {currentEnd.endNumber}
                </p>
              </DialogHeader>

              {/* Arrow slots */}
              <div className="flex gap-2 justify-center my-2">
                {Array.from({ length: currentEnd.arrowCount }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 border-2 rounded flex items-center justify-center text-sm font-bold"
                  >
                    {arrows[i] ?? ""}
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Total:{" "}
                <span className="font-bold text-foreground">
                  {arrows.reduce((s, v) => s + arrowToNumber(v), 0)}
                </span>
              </p>

              {/* Keypad */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {ARROW_VALUES.map((v) => {
                  const lastVal = arrows.length > 0
                    ? arrowToNumber(arrows[arrows.length - 1])
                    : 11
                  const disabled =
                    arrows.length >= currentEnd.arrowCount ||
                    arrowToNumber(v) > lastVal

                  return (
                    <Button
                      key={v}
                      variant="outline"
                      disabled={disabled}
                      onClick={() => handleArrowKey(v)}
                    >
                      {v}
                    </Button>
                  )
                })}
              </div>

              {/* Backspace + actions */}
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setArrows(arrows.slice(0, -1))}
                  disabled={arrows.length === 0}
                >
                  ← Back
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSave}
                  disabled={arrows.length < currentEnd.arrowCount}
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}