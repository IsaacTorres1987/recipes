"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  FileText, 
  Download, 
  Building2, 
  Users, 
  Box, 
  Ruler, 
  ShieldCheck,
  ExternalLink,
  Printer,
  MapPin,
  Calendar,
  CheckCircle2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { procurementCases } from "@/lib/data"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"

export default function ProcurementReportPage() {
  const params = useParams()
  const { toast } = useToast()
  
  const caseData = procurementCases.find((c) => c.id === params.id)

  if (!caseData) {
    notFound()
  }

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your procurement report is being generated and will download shortly.",
    })
  }

  const handlePrint = () => {
    window.print()
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

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <Link 
        href={`/procurement-cases/${caseData.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Procurement Case
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Procurement Component Assessment Report
            </h1>
            <p className="text-muted-foreground text-sm">
              Generated on {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF} className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Download Procurement Summary
          </Button>
        </div>
      </div>

      {/* Project Information */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Project</p>
                <p className="font-semibold">{caseData.projectName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-semibold">{caseData.client}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Box className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Asset Type</p>
                <p className="font-semibold">{caseData.assetType}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{caseData.location}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Procurement Stage</p>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {caseData.procurementStage}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Design Life Requirement</p>
              <p className="font-semibold">{caseData.designLife}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Procurement Readiness</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-2xl font-bold",
                  caseData.readinessScore >= 80 ? "text-success" :
                  caseData.readinessScore >= 60 ? "text-yellow-600" : "text-destructive"
                )}>
                  {caseData.readinessScore}
                </span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Components */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Selected Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Component ID</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Span</TableHead>
                  <TableHead className="font-semibold text-center">Condition</TableHead>
                  <TableHead className="font-semibold">Verification</TableHead>
                  <TableHead className="font-semibold">Tender Relevance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseData.components.map((component) => (
                  <TableRow key={component.id}>
                    <TableCell className="font-mono font-medium">{component.id}</TableCell>
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

      {/* Verification Summary */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Verification Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-2xl font-bold text-primary">{caseData.selectedComponents}</p>
              <p className="text-sm text-muted-foreground">Total Selected</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-2xl font-bold text-success">{caseData.verifiedComponents}</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-2xl font-bold text-primary">{caseData.dppCoverage}%</p>
              <p className="text-sm text-muted-foreground">DPP Coverage</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <p className="text-2xl font-bold text-primary">{caseData.structuralEvidenceComplete}%</p>
              <p className="text-sm text-muted-foreground">Structural Evidence</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tender Relevance */}
      <Card className="mb-6 bg-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Tender Relevance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-2">
            The components selected for this procurement case have verified structural capacity and inspection records where applicable.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            They may be referenced in procurement documentation as reusable structural elements for infrastructure replacement projects. Verified components include Digital Product Passports that provide full traceability for tender requirements.
          </p>
          <div className="flex flex-wrap gap-2">
            {caseData.components.filter(c => c.verificationStatus === "Verified").map((component) => (
              <Badge key={component.id} variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {component.id}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Digital Product Passport */}
      <Card className="mb-6 border-success/30 bg-success/5">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            Digital Product Passport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-4">
            Complete verification records, inspection data, and structural assessments are available through the 
            component Digital Product Passports. These documents provide full traceability and can be included 
            in tender documentation as evidence of component suitability.
          </p>
          <Button variant="outline" className="gap-2">
            Open Digital Product Passports
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Report Reference */}
      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground mb-6">
        <p className="font-medium text-foreground mb-1">Report Reference</p>
        <p>Report ID: RPT-{caseData.id.toUpperCase()}-{Date.now().toString(36).toUpperCase()}</p>
        <p>Case ID: {caseData.id}</p>
        <p>Generated by CircuFax Infrastructure Component Intelligence Platform</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Link href={`/procurement-cases/${caseData.id}`}>
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Procurement Case
          </Button>
        </Link>
        <Button onClick={handleDownloadPDF} className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Download Procurement Summary
        </Button>
      </div>
    </div>
  )
}
