import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  MapPin, 
  Clock, 
  Calendar,
  FileText,
  ShieldCheck,
  Box,
  Download,
  CheckCircle2,
  Circle,
  Info,
  Ruler,
  Recycle,
  ClipboardCheck
} from "lucide-react"
import { procurementCases } from "@/lib/data"
import { cn } from "@/lib/utils"
import { InfoTooltip, tooltipDefinitions } from "@/components/info-tooltip"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProcurementCaseDetailPage({ params }: PageProps) {
  const { id } = await params
  const caseData = procurementCases.find((c) => c.id === id)

  if (!caseData) {
    notFound()
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Tender Preparation":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Evaluation":
        return "bg-primary/10 text-primary border-primary/20"
      case "Selection":
        return "bg-success/10 text-success border-success/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-success/10 text-success border-success/20"
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case "High":
        return "bg-success/10 text-success border-success/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Low":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "Suitable":
        return "bg-success/10 text-success border-success/20"
      case "Conditional":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-destructive/10 text-destructive border-destructive/20"
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 2) return "text-success"
    if (score <= 3) return "text-yellow-600"
    return "text-destructive"
  }

  const evidenceItems = [
    { key: "inspectionReport", label: "Inspection Report", checked: caseData.evidenceChecklist.inspectionReport },
    { key: "structuralCapacity", label: "Structural Capacity Assessment", checked: caseData.evidenceChecklist.structuralCapacity },
    { key: "materialVerification", label: "Material Verification", checked: caseData.evidenceChecklist.materialVerification },
    { key: "dppLink", label: "DPP Link", checked: caseData.evidenceChecklist.dppLink },
    { key: "verifierIdentified", label: "Verifier Identified", checked: caseData.evidenceChecklist.verifierIdentified },
  ]

  const completedEvidence = evidenceItems.filter(item => item.checked).length
  const evidencePercentage = Math.round((completedEvidence / evidenceItems.length) * 100)

  return (
    <div className="p-6 lg:p-8">
      <Link 
        href="/procurement-cases" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Procurement Cases
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {caseData.projectName}
              </h1>
              <p className="text-muted-foreground">Procurement Case Workspace</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn("text-sm py-1.5 px-3", getStageColor(caseData.procurementStage))}
          >
            <Clock className="h-4 w-4 mr-1.5" />
            {caseData.procurementStage}
          </Badge>
        </div>
      </div>

      {/* Project Metadata */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            Project Metadata
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Project Name</p>
              <p className="font-semibold">{caseData.projectName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Client</p>
              <p className="font-semibold">{caseData.client}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Asset Type</p>
              <p className="font-semibold">{caseData.assetType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-semibold">{caseData.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Procurement Procedure</p>
              <p className="font-semibold">{caseData.procurementProcedure}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Procurement Stage</p>
              <Badge variant="outline" className={cn("mt-1", getStageColor(caseData.procurementStage))}>
                {caseData.procurementStage}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Design Life Requirement</p>
              <p className="font-semibold">{caseData.designLife}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tender Requirements */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Tender Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Technical Requirements */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Technical Requirements</h4>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Minimum Span</dt>
                  <dd className="font-medium">{caseData.tenderRequirements.technical.minSpan}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Design Standard</dt>
                  <dd className="font-medium">{caseData.tenderRequirements.technical.designStandard}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Load Class</dt>
                  <dd className="font-medium">{caseData.tenderRequirements.technical.loadClass}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Concrete Class</dt>
                  <dd className="font-medium">{caseData.tenderRequirements.technical.concreteClass}</dd>
                </div>
              </dl>
            </div>

            {/* Circularity Requirements */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Recycle className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Circularity Requirements</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.circularity.reusePreferred ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Reuse preferred where feasible</span>
                </li>
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.circularity.demountabilityRequired ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Demountability required</span>
                </li>
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.circularity.lifecycleExtension ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Lifecycle extension preferred</span>
                </li>
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.circularity.co2ReductionConsidered ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>CO2 reduction considered</span>
                </li>
              </ul>
            </div>

            {/* Evidence Requirements */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Evidence Requirements</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.evidence.inspectionReport ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Inspection report available</span>
                </li>
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.evidence.structuralRecalculation ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Structural recalculation available</span>
                </li>
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.evidence.dppAvailable ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>DPP available</span>
                </li>
                <li className="flex items-center gap-2">
                  {caseData.tenderRequirements.evidence.verificationAuthority ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span>Verification authority identified</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Components Table */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Box className="h-4 w-4 text-primary" />
            Selected Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Component ID</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Span</TableHead>
                  <TableHead className="font-semibold text-center">Condition Score</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                  <TableHead className="font-semibold">Reuse Potential</TableHead>
                  <TableHead className="font-semibold">Procurement Relevance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseData.components.map((component) => (
                  <TableRow key={component.id} className="hover:bg-muted/30">
                    <TableCell>
                      <Link 
                        href={`/registry/${component.id}`}
                        className="font-mono font-medium text-primary hover:underline"
                      >
                        {component.id}
                      </Link>
                    </TableCell>
                    <TableCell>{component.type}</TableCell>
                    <TableCell>{component.span}</TableCell>
                    <TableCell className="text-center">
                      <span className={cn("font-semibold", getScoreColor(component.conditionScore))}>
                        {component.conditionScore}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-medium", getStatusColor(component.verificationStatus))}>
                        {component.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-medium", getPotentialColor(component.reusePotential))}>
                        {component.reusePotential}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-medium", getRelevanceColor(component.procurementRelevance))}>
                        {component.procurementRelevance}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Procurement Decision Support */}
      <Card className="mb-6 bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Procurement Decision Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-2">
            Verified engineering data and condition assessments support procurement teams in evaluating reuse opportunities and preparing tender documentation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Components in this case have been selected based on technical fit, verification status, and circularity potential. Digital Product Passports provide full traceability for tender requirements.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Evidence Completeness Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-primary" />
              Evidence Completeness Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {evidenceItems.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  {item.checked ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={cn(
                    "text-sm",
                    item.checked ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Completion Status</span>
                <span className="font-medium">{completedEvidence}/{evidenceItems.length} items</span>
              </div>
              <Progress value={evidencePercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Procurement Readiness Panel */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Procurement Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Components Selected</span>
                <span className="font-semibold">{caseData.selectedComponents}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Verified Components</span>
                <span className="font-semibold">{caseData.verifiedComponents}/{caseData.selectedComponents}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  DPP Coverage
                  <InfoTooltip content={tooltipDefinitions.dpp} />
                </span>
                <span className="font-semibold">{caseData.dppCoverage}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Structural Evidence Complete</span>
                <span className="font-semibold">{caseData.structuralEvidenceComplete}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  Circularity Match
                  <InfoTooltip content={tooltipDefinitions.circularityMatch} />
                </span>
                <Badge variant="outline" className={cn("font-medium", getPotentialColor(caseData.circularityMatch))}>
                  {caseData.circularityMatch}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold flex items-center gap-1">
                  Procurement Readiness Score
                  <InfoTooltip content={tooltipDefinitions.procurementReadiness} />
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-4xl font-bold",
                  caseData.readinessScore >= 80 ? "text-success" :
                  caseData.readinessScore >= 60 ? "text-yellow-600" : "text-destructive"
                )}>
                  {caseData.readinessScore}
                </span>
                <span className="text-2xl text-muted-foreground">/ 100</span>
              </div>
              <Progress 
                value={caseData.readinessScore} 
                className="h-3 mt-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Link href={`/procurement-cases/${caseData.id}/report`}>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Export Procurement Package
          </Button>
        </Link>
      </div>
    </div>
  )
}
