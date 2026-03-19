"use client"

import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface InfoTooltipProps {
  content: string
  className?: string
}

export const tooltipDefinitions = {
  dpp: "A structured digital record containing verified information about a component, including materials, condition, and lifecycle data.",
  verificationLayer: "Confirmation that component data is accurate and traceable, typically provided through trusted external systems like Circularise.",
  procurementReadiness: "How well-prepared a component or set of components is for inclusion in a project or tender, based on verification status and documentation completeness.",
  conditionScore: "The NEN 2767 Condition Score rates the physical state of an infrastructure component on a scale of 1 (excellent) to 6 (very poor).",
  reuseCandidate: "A component assessed as suitable for a second life in a new project, based on condition, structural integrity, and remaining design life.",
  reuseFeasibility: "An assessment of whether a component can be reused based on condition, structural capacity, and project requirements.",
  circularityMatch: "How well a component aligns with circular economy principles, including potential for reuse, demountability, and material recovery.",
}

export function InfoTooltip({ content, className }: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          type="button"
          className={`inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${className}`}
        >
          <Info className="h-3.5 w-3.5" />
          <span className="sr-only">More information</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
