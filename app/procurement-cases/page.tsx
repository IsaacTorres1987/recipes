"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  FolderKanban, 
  Building2, 
  Users, 
  Box, 
  ShieldCheck, 
  ArrowRight,
  Clock
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
          <h1 className="text-2xl font-bold text-foreground">Procurement Cases</h1>
        </div>
        <p className="text-muted-foreground">
          Manage active procurement cases and prepare tender documentation using verified component data.
        </p>
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

              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Procurement Readiness</span>
                  <span className={cn(
                    "text-sm font-semibold",
                    caseItem.readinessScore >= 80 ? "text-success" :
                    caseItem.readinessScore >= 60 ? "text-yellow-600" : "text-destructive"
                  )}>
                    {caseItem.readinessScore}/100
                  </span>
                </div>
                <Progress 
                  value={caseItem.readinessScore} 
                  className="h-2 mb-4"
                />
                <Link href={`/procurement-cases/${caseItem.id}`}>
                  <Button className="w-full gap-2">
                    Open Case
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
