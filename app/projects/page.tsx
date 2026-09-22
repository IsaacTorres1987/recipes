"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  FolderKanban, 
  Building2, 
  Users, 
  Box, 
  ShieldCheck,
  ArrowRight,
  FileCheck2,
  ClipboardCheck,
  ListChecks,
  AlertTriangle
} from "lucide-react"
import { procurementCases } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ProcurementCasesPage() {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Tender Preparation":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Evaluation":
        return "bg-primary/10 text-primary border-primary/20"
      case "Selection":
        return "bg-success/10 text-success border-success/20"
      case "Contract Award":
        return "bg-success/10 text-success border-success/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getCircularityColor = (match: string) => {
    switch (match) {
      case "High":
        return "text-success"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FolderKanban className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Projects and Procurement</h1>
        </div>
        <p className="text-muted-foreground mb-4">
          This section demonstrates how infrastructure component data can be used in real project contexts.
        </p>
        <Card className="bg-muted/30 border-border">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-muted-foreground mb-3">
              Stakeholders can:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground mb-3">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                review available components
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                assess condition and verification
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                evaluate reuse potential
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                support project planning and procurement decisions
              </li>
            </ul>
            <p className="text-sm text-muted-foreground">
              The goal is to translate data into actionable insights.
            </p>
          </CardContent>
        </Card>
        <div className="mt-4">
          <Link href="/decision-support">
            <Button variant="outline" className="gap-2">
              Open Decision Support
              <ArrowRight data-icon="inline-end" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {procurementCases.map((caseItem) => (
          <Card key={caseItem.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base font-semibold line-clamp-2">
                  {caseItem.projectName}
                </CardTitle>
                <Badge 
                  variant="outline" 
                  className={cn("shrink-0 text-xs", getStageColor(caseItem.procurementStage))}
                >
                  {caseItem.procurementStage}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Client:</span>
                  <span className="font-medium truncate">{caseItem.client}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Asset Type:</span>
                  <span className="font-medium">{caseItem.assetType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Box className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Components:</span>
                  <span className="font-medium">{caseItem.selectedComponents} selected</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Verification:</span>
                  <span className="font-medium">{caseItem.verificationCoverage}% coverage</span>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-border bg-muted/20 p-3">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Decision Readiness</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {caseItem.decisionReadiness?.state ?? "Unknown"}
                    </p>
                  </div>
                  <Badge variant="outline">Case state</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 rounded-md bg-background/70 p-2">
                    <FileCheck2 className="h-4 w-4 text-muted-foreground" />
                    <span>
                      <span className="block font-medium text-foreground">
                        {caseItem.decisionReadiness?.evidenceCoverage.satisfied ?? 0} of {caseItem.decisionReadiness?.evidenceCoverage.total ?? 0}
                      </span>
                      <span className="text-muted-foreground">Evidence requirements</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-background/70 p-2">
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    <span>
                      <span className="block font-medium text-foreground">
                        {caseItem.specialistAssessments?.filter((assessment) => assessment.status === "Complete").length ?? 0} of {caseItem.specialistAssessments?.filter((assessment) => assessment.required).length ?? 0}
                      </span>
                      <span className="text-muted-foreground">Specialist assessments</span>
                    </span>
                  </div>
                </div>
                {(caseItem.restrictions?.length || caseItem.outstandingActions?.length) ? (
                  <div className="mt-3 flex items-start gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>
                      {caseItem.restrictions?.length ?? 0} restriction{caseItem.restrictions?.length === 1 ? "" : "s"} and {caseItem.outstandingActions?.length ?? 0} outstanding action{caseItem.outstandingActions?.length === 1 ? "" : "s"}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="mt-auto border-t border-border pt-4">
                <Link href={`/projects/${caseItem.id}`}>
                  <Button className="w-full gap-2">
                    Open Decision Case
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
