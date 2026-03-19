"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Database, ShieldCheck, Activity, Recycle, FolderKanban, ArrowRight, Gauge, Building2, Share2, Lightbulb, FileCheck, ChevronRight } from "lucide-react"
import { dashboardStats, procurementCases } from "@/lib/data"
import { cn } from "@/lib/utils"
import { InfoTooltip, tooltipDefinitions } from "@/components/info-tooltip"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts"

const conditionData = [
  { score: "1 (Excellent)", count: 12, fill: "#22c55e" },
  { score: "2 (Good)", count: 28, fill: "#4ade80" },
  { score: "3 (Reasonable)", count: 45, fill: "#facc15" },
  { score: "4 (Moderate)", count: 24, fill: "#fb923c" },
  { score: "5 (Poor)", count: 11, fill: "#f87171" },
  { score: "6 (Critical)", count: 4, fill: "#ef4444" },
]

const componentTypeData = [
  { name: "Bridge Girders", value: 42, fill: "#1B4D7A" },
  { name: "Bearings", value: 28, fill: "#2E9E6F" },
  { name: "Deck Slabs", value: 31, fill: "#64748b" },
  { name: "Other Structural", value: 23, fill: "#94a3b8" },
]

const workflowSteps = [
  {
    step: 1,
    icon: Database,
    title: "Register Components",
    description: "Capture geometry, materials, condition, and structural data.",
  },
  {
    step: 2,
    icon: ShieldCheck,
    title: "Link Verified DPPs",
    description: "Connect components to trusted verification via Circularise.",
  },
  {
    step: 3,
    icon: Share2,
    title: "Share Data",
    description: "Enable clients, contractors, and engineers to access information.",
  },
  {
    step: 4,
    icon: Recycle,
    title: "Evaluate Reuse",
    description: "Assess condition, verification status, and reuse feasibility.",
  },
  {
    step: 5,
    icon: FileCheck,
    title: "Support Projects",
    description: "Apply verified data to project planning and procurement.",
  },
]

const userJourneys = [
  {
    question: "I want to explore components",
    description: "Browse the registry to find infrastructure components with detailed technical data, condition assessments, and reuse potential.",
    href: "/registry",
    icon: Database,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30 hover:border-primary",
  },
  {
    question: "I want to verify data",
    description: "Access verified Digital Product Passports and ensure trusted, traceable information across stakeholders.",
    href: "/verification",
    icon: ShieldCheck,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30 hover:border-success",
  },
  {
    question: "I want to prepare a project",
    description: "Evaluate reusable components for your project and support decision-making with verified data.",
    href: "/projects",
    icon: FolderKanban,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30 hover:border-yellow-500",
  },
]

const statCards = [
  {
    title: "Total Registered Components",
    value: dashboardStats.totalComponents,
    icon: Database,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Verified Components",
    value: dashboardStats.verifiedComponents,
    icon: ShieldCheck,
    color: "text-success",
    bgColor: "bg-success/10",
    tooltip: tooltipDefinitions.verificationLayer,
  },
  {
    title: "Average Condition Score",
    value: dashboardStats.averageConditionScore,
    icon: Activity,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
    tooltip: tooltipDefinitions.conditionScore,
  },
  {
    title: "Reuse Candidates",
    value: dashboardStats.reuseCandidates,
    icon: Recycle,
    color: "text-primary",
    bgColor: "bg-primary/10",
    tooltip: tooltipDefinitions.reuseCandidate,
  },
]

export default function DashboardPage() {
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

  const avgReadiness = Math.round(
    procurementCases.reduce((sum, c) => sum + c.readinessScore, 0) / procurementCases.length
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">CircuFax</h1>
        <p className="text-lg text-muted-foreground">
          Infrastructure Component Data & Decision Support
        </p>
      </div>

      {/* Example Project Section */}
      <Card className="mb-6 border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Example Project</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Project:</span>
                <span className="text-sm font-semibold text-foreground text-right">Bridge Replacement – N203</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Client:</span>
                <span className="text-sm font-semibold text-foreground text-right">Province of North Holland</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Asset Type:</span>
                <span className="text-sm font-semibold text-foreground text-right">Road Bridge</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-muted-foreground">Stage:</span>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                  Tender Preparation
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Objective</p>
                <p className="text-sm text-muted-foreground">
                  Evaluate the reuse of existing infrastructure components to support circular design and reduce lifecycle costs.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Description</p>
                <p className="text-sm text-muted-foreground">
                  This project demonstrates how verified component data can be used to assess reuse potential and support project and procurement decisions.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/20">
            <Link href="/projects/case-n203">
              <Button variant="outline" size="sm" className="gap-2">
                View Full Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Circularise Separation - Hard Statement */}
      <Card className="mb-6 border-destructive/20 bg-destructive/5">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Important Distinction</p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">CircuFax does not provide Digital Product Passports.</span> Verification is handled by <span className="font-medium">Circularise</span>. CircuFax uses verified data for decision-making.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Journey Entry - Start Here */}
      <Card className="mb-8 border-2 border-primary/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            Start Here
          </CardTitle>
          <p className="text-sm text-muted-foreground">What do you want to do?</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userJourneys.map((journey) => (
              <Link key={journey.question} href={journey.href}>
                <Card className={cn("h-full transition-all cursor-pointer border-2", journey.borderColor)}>
                  <CardContent className="pt-6">
                    <div className={cn("p-3 rounded-lg w-fit mb-4", journey.bgColor)}>
                      <journey.icon className={cn("h-6 w-6", journey.color)} />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">{journey.question}</h3>
                    <p className="text-sm text-muted-foreground">{journey.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How CircuFax Works */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">How CircuFax Works</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            CircuFax supports circular infrastructure decisions by connecting component data, verified Digital Product Passports, and project workflows.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 border border-border h-full">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-3">
                    {step.step}
                  </div>
                  <step.icon className="h-5 w-5 text-primary mb-2" />
                  <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/50 z-10" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Project Scenario */}
      <Card className="mb-8 border-2 border-success/30 bg-success/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="outline" className="mb-2 bg-success/10 text-success border-success/20">
                Example Project
              </Badge>
              <CardTitle className="text-lg">Bridge Replacement – N203</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Client: Province of North Holland</p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-medium text-foreground">Objective:</span> Evaluate reuse of existing bridge components for circular reconstruction.
              </p>
            </div>
            <Link href="/projects/case-n203">
              <Button variant="outline" size="sm" className="gap-2">
                View Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Components Selected</p>
              <p className="text-lg font-bold">4</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Verified</p>
              <p className="text-lg font-bold text-success">3 / 4</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Avg. Condition</p>
              <p className="text-lg font-bold">2.75</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <p className="text-xs text-muted-foreground mb-1">Readiness Score</p>
              <p className="text-lg font-bold text-success">82%</p>
            </div>
          </div>
          
          {/* Decision Panel */}
          <div className="p-4 rounded-lg bg-background border-2 border-primary/20">
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              Decision Outcome
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Reuse Feasibility</p>
                <Badge className="bg-success/10 text-success border-success/20 font-semibold">HIGH</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Verification</p>
                <Badge className="bg-success/10 text-success border-success/20 font-semibold">75% COMPLETE</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Procurement Suitability</p>
                <Badge className="bg-success/10 text-success border-success/20 font-semibold">YES</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
              <span className="font-medium text-foreground">Recommended Use:</span> Suitable for reuse in bridge spans 20–30m with LM1 load class requirements.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {stat.title}
                    {stat.tooltip && <InfoTooltip content={stat.tooltip} />}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Procurement Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FolderKanban className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{procurementCases.length}</p>
                <p className="text-sm text-muted-foreground">Active Procurement Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <Gauge className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgReadiness}%</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  Avg Procurement Readiness
                  <InfoTooltip content={tooltipDefinitions.procurementReadiness} />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10">
                  <Activity className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {procurementCases.reduce((sum, c) => sum + c.selectedComponents, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Components in Cases</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Procurement Readiness Overview */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Project & Procurement Overview</CardTitle>
            <Link href="/projects">
              <Button variant="outline" size="sm" className="gap-2">
                View All Cases
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {procurementCases.map((caseItem) => (
              <div key={caseItem.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <Link 
                      href={`/projects/${caseItem.id}`}
                      className="font-semibold hover:text-primary transition-colors"
                    >
                      {caseItem.projectName}
                    </Link>
                    <Badge variant="outline" className={cn("text-xs", getStageColor(caseItem.procurementStage))}>
                      {caseItem.procurementStage}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>{caseItem.client}</span>
                    <span>|</span>
                    <span>{caseItem.selectedComponents} components</span>
                    <span>|</span>
                    <span>{caseItem.verificationCoverage}% verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={caseItem.readinessScore} className="flex-1 h-2" />
                    <span className={cn(
                      "text-sm font-semibold min-w-[50px] text-right",
                      caseItem.readinessScore >= 80 ? "text-success" :
                      caseItem.readinessScore >= 60 ? "text-yellow-600" : "text-destructive"
                    )}>
                      {caseItem.readinessScore}/100
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              NEN 2767 Condition Score Distribution
              <InfoTooltip content={tooltipDefinitions.conditionScore} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conditionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="score" 
                    tick={{ fontSize: 11 }}
                    angle={-30}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {conditionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Component Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={componentTypeData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {componentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Why This Matters */}
      <Card className="mt-6 border-success/20 bg-success/5">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-success" />
            Why This Matters
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Infrastructure projects often face challenges related to data availability, trust, and coordination.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">CircuFax helps to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
              <p className="text-sm text-muted-foreground">reduce transaction costs related to data exchange</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
              <p className="text-sm text-muted-foreground">improve transparency across stakeholders</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
              <p className="text-sm text-muted-foreground">enable circular infrastructure decisions</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-2 shrink-0" />
              <p className="text-sm text-muted-foreground">support collaboration between clients and contractors</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            By connecting verified data to real project contexts, CircuFax turns information into actionable decisions.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Component verified", id: "DEMO-GIRDER-01", time: "2 hours ago", type: "verification" },
              { action: "Added to procurement case", id: "DEMO-BEAM-02", time: "4 hours ago", type: "procurement" },
              { action: "New component registered", id: "DEMO-SLAB-03", time: "5 hours ago", type: "registration" },
              { action: "Procurement case created", id: "Bridge N203", time: "1 day ago", type: "procurement" },
              { action: "Inspection completed", id: "DEMO-COLUMN-04", time: "2 days ago", type: "inspection" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "verification" ? "bg-success" :
                    activity.type === "registration" ? "bg-primary" :
                    activity.type === "inspection" ? "bg-yellow-500" : "bg-primary"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.id}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
