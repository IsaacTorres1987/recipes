import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, ShieldCheck, Box, Layers, Activity, Gauge, FileText } from "lucide-react"
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

      <Card className="mb-8 bg-muted/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Procurement Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-2">
            This verified infrastructure component may be considered for reuse in bridge replacement tenders.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Engineering validation, condition assessment, and inspection evidence are available through the Digital Product Passport.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 rounded-lg bg-background border border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Technical Fit</p>
              <Badge variant="outline" className={cn(
                "font-medium",
                component.verificationStatus === "Verified" 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
              )}>
                {component.verificationStatus === "Verified" ? "Yes" : "Pending"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verification Complete</p>
              <Badge variant="outline" className={cn(
                "font-medium",
                component.verificationStatus === "Verified" 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
              )}>
                {component.verificationStatus === "Verified" ? "Yes" : "Pending"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reuse Feasible</p>
              <Badge variant="outline" className={cn(
                "font-medium",
                component.conditionScore <= 3
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
              )}>
                {component.conditionScore <= 2 ? "High" : component.conditionScore === 3 ? "Medium" : "Low"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Tender Suitability</p>
              <Badge variant="outline" className={cn(
                "font-medium",
                component.verificationStatus === "Verified" && component.conditionScore <= 3
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
              )}>
                {component.verificationStatus === "Verified" && component.conditionScore <= 3 ? "Suitable" : "Conditional"}
              </Badge>
            </div>
          </div>
          
          <AddToProcurementButton componentId={component.id} />
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
