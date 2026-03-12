"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Printer
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProcurementReportPage() {
  const { toast } = useToast()

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download Started",
      description: "Your procurement report is being generated and will download shortly.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <Link 
        href="/procurement" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Procurement Case
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
                <p className="font-semibold">Bridge Replacement - N203</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-semibold">Province of North Holland</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Component Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Box className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Component ID</p>
                  <p className="font-mono font-semibold">DEMO-GIRDER-01</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Box className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Component Type</p>
                  <p className="font-semibold">Precast Concrete Girder</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Span</p>
                  <p className="font-semibold">24.5 m</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Condition Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                  <span className="text-sm text-muted-foreground">/ 6 (NEN 2767)</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Verification Status</p>
                <Badge className="mt-1 bg-success/10 text-success border-success/20">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Procurement Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommended Use</p>
              <p className="font-medium">Municipal bridge replacement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 bg-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Tender Relevance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-2">
            This component has verified structural capacity and inspection records.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It may be referenced in procurement documentation as a reusable structural element for infrastructure replacement projects.
          </p>
        </CardContent>
      </Card>

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
            component's Digital Product Passport. This document provides full traceability and can be included 
            in tender documentation.
          </p>
          <Button variant="outline" className="gap-2">
            Open Digital Product Passport
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Report Reference</p>
        <p>Report ID: RPT-{Date.now().toString(36).toUpperCase()}</p>
        <p>Generated by CircuFax Infrastructure Component Intelligence Platform</p>
      </div>
    </div>
  )
}
