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
  dpp: "A Digital Product Passport (DPP) is a structured digital record containing all relevant technical, material, and lifecycle information about an infrastructure component, enabling traceability and informed reuse decisions.",
  verificationLayer: "The Verification Layer provides third-party validation of component data, ensuring that technical properties, condition assessments, and safety parameters have been independently verified.",
  procurementReadiness: "Procurement Readiness indicates how well-prepared a component or set of components is for inclusion in a public tender, based on verification status, documentation completeness, and technical suitability.",
  conditionScore: "The NEN 2767 Condition Score rates the physical state of an infrastructure component on a scale of 1 (excellent) to 6 (very poor), based on standardized inspection criteria.",
  reuseCandidate: "A Reuse Candidate is an infrastructure component that has been assessed as suitable for a second life in a new project, based on its condition, structural integrity, and remaining design life.",
  circularityMatch: "Circularity Match indicates how well a component aligns with circular economy principles, including potential for reuse, demountability, and material recovery."
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
