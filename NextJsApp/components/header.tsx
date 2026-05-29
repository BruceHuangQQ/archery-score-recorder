import { ModeToggle } from "@/components/theme-mode-toggle"
import { Github, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b px-6 py-3 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-lg">Archery Score Recorder</h1>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" aria-label="Home">
            <Home className="w-5 h-5" />
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="https://github.com/BruceHuangQQ/archery-score-recorder" target="_blank">
            <Github className="w-5 h-5" />
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}