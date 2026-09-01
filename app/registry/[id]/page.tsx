import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, ShieldCheck, Box, Layers, Activity, Gauge, FileText, Lightbulb } from "lucide-react"
import { components } from "@/lib/data"
import { cn } from "@/lib/utils"
import { AddToProcurementButton } from "@/components/add-to-procurement-button"
import { InfoTooltip, tooltipDefinitions } from "@/components/info-tooltip"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { id } = await params
  const component = components.find((c) => c.id === id)

  if (!component) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
      case "VERIFIED":
        return "bg-success/10 text-success border-success/20"
      case "Pending":
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <Link 
        href="/registry" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Registry
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Component ID: {component.id}
            </h1>
            <p className="text-muted-foreground">
              Owner: {component.owner}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm py-1.5 px-3">
              {component.availability}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("text-sm py-1.5 px-3 font-medium", getStatusColor(component.verificationStatus))}
            >
              <ShieldCheck className="h-4 w-4 mr-1.5" />
              {component.verificationStatus.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Box className="h-4 w-4 text-primary" />
              Geometry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <DataRow label="Length" value={component.geometry.length} />
              <DataRow label="Height" value={component.geometry.height} />
              <DataRow label="Width" value={component.geometry.width} />
              <DataRow label="Weight" value={component.geometry.weight} />
              <DataRow label="Cross-section" value={component.geometry.crossSection} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              Material
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <DataRow label="Concrete class" value={component.material.concreteClass} />
              <DataRow label="Exposure class" value={component.material.exposureClass} />
              <DataRow label="Prestressing" value={component.material.prestressing} />
              <DataRow label="Reinforcement" value={component.material.reinforcement} />
              <DataRow label="Cover thickness" value={component.material.coverThickness} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Condition Assessment (NEN 2767)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <DataRow 
                label="Web" 
                value={`${component.condition.web.description} – score ${component.condition.web.score}`} 
              />
              <DataRow 
                label="Flange" 
                value={`${component.condition.flange.description} – score ${component.condition.flange.score}`} 
              />
              <DataRow 
                label="Anchorage" 
                value={`${component.condition.anchorage.description} – score ${component.condition.anchorage.score}`} 
              />
              <div className="pt-2 border-t border-border">
                <DataRow 
                  label="Overall condition" 
                  value={`${component.condition.overall.score} (${component.condition.overall.label})`}
                  highlight
                />
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              Structural Capacity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <DataRow label="Design load" value={component.structural.designLoad} />
              <DataRow label="Residual capacity" value={component.structural.residualCapacity} />
              <DataRow label="Bending capacity" value={component.structural.bendingCapacity} />
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Decision Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommended option</p>
              <p className="font-medium text-success">{component.decision.recommendation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Suitable application</p>
              <p className="font-medium">{component.decision.application}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Risk level</p>
              <p className="font-medium">{component.decision.riskLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role in Supply Chain */}
      <Card className="mb-8 bg-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Role in Supply Chain
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-2">
            This component is part of the infrastructure supply chain and can be evaluated for reuse, 
            repurposing, or replacement.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Its technical properties, condition assessment, and verification status enable stakeholders 
            to make informed lifecycle decisions.
          </p>
        </CardContent>
      </Card>

      {/* Decision Summary - Final conclusion after viewing all data */}
      <Card className="mb-8 border-2 border-success/30 bg-success/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Gauge className="h-4 w-4 text-success" />
            Decision Summary
          </CardTitle>
          <p className="text-sm text-muted-foreground">Based on the component data above</p>
        </CardHeader>
        <CardContent>
          {/* Decision Indicators */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-lg bg-background border-2 border-success/20">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Reuse Feasibility</p>
              <Badge className={cn(
                "text-sm px-3 py-1 font-bold",
                component.conditionScore <= 2
                  ? "bg-success text-success-foreground" 
                  : component.conditionScore === 3
                    ? "bg-yellow-500 text-white"
                    : "bg-destructive text-destructive-foreground"
              )}>
                {component.conditionScore <= 2 ? "HIGH" : component.conditionScore === 3 ? "MEDIUM" : "LOW"}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Verification</p>
              <Badge className={cn(
                "text-sm px-3 py-1 font-bold",
                component.verificationStatus === "Verified" 
                  ? "bg-success text-success-foreground" 
                  : "bg-yellow-500 text-white"
              )}>
                {component.verificationStatus === "Verified" ? "COMPLETE" : "PENDING"}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">Procurement Suitability</p>
              <Badge className={cn(
                "text-sm px-3 py-1 font-bold",
                component.verificationStatus === "Verified" && component.conditionScore <= 3
                  ? "bg-success text-success-foreground" 
                  : "bg-yellow-500 text-white"
              )}>
                {component.verificationStatus === "Verified" && component.conditionScore <= 3 ? "YES" : "CONDITIONAL"}
              </Badge>
            </div>
          </div>
          
          {/* Recommended Use - Very Important */}
          <div className="p-4 rounded-lg bg-background border-2 border-success/30 mb-4">
            <p className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-success" />
              Recommended Use
            </p>
            <p className="text-sm font-medium text-foreground">
              {component.conditionScore <= 2 
                ? `Suitable for reuse in bridge spans ${component.geometry.length} with compatible load requirements.` 
                : component.conditionScore === 3 
                  ? "May be suitable for secondary infrastructure or projects with reduced load requirements."
                  : "Recommended for material recovery or recycling rather than direct structural reuse."}
            </p>
          </div>
          
          {/* Supporting Data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Condition Score</p>
              <p className="text-lg font-bold">{component.conditionScore}</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Evidence</p>
              <p className="text-lg font-bold">{component.verificationStatus === "Verified" ? "80%" : "40%"}</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Span</p>
              <p className="text-lg font-bold">{component.geometry.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Weight</p>
              <p className="text-lg font-bold">{component.geometry.weight}</p>
            </div>
          </div>
          
          <AddToProcurementButton componentId={component.id} />
        </CardContent>
      </Card>

      {/* Project and Procurement Context */}
      <Card className="mb-8 bg-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Project and Procurement Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-4">
            This component may be used in infrastructure projects where reuse is feasible.
            Verified data and condition assessments can support:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-muted-foreground">project planning decisions</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-muted-foreground">engineering evaluation</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span className="text-muted-foreground">procurement preparation</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            This enables more transparent and circular infrastructure development.
          </p>
        </CardContent>
      </Card>

      <Card className="border-success/30 bg-success/5">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            Verification
            <InfoTooltip content={tooltipDefinitions.verificationLayer} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verification Status</p>
              <Badge 
                variant="outline" 
                className={cn("font-medium", getStatusColor(component.verification.status))}
              >
                {component.verification.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Anchored Hash</p>
              <p className="font-mono text-sm">{component.verification.hash}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verified by</p>
              <p className="font-medium">{component.verification.verifier}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
              <p className="font-medium">{component.verification.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              Open Digital Product Passport
              <ExternalLink className="h-4 w-4" />
            </Button>
            <InfoTooltip content={tooltipDefinitions.dpp} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DataRow({ 
  label, 
  value, 
  highlight = false 
}: { 
  label: string
  value: string
  highlight?: boolean 
}) {
  return (
    <div className="flex justify-between items-center">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className={cn("text-sm font-medium", highlight && "text-primary")}>{value}</dd>
    </div>
  )
}
