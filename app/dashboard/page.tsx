"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Database, ShieldCheck, Activity, Recycle, FolderKanban, ArrowRight, Gauge } from "lucide-react"
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Infrastructure Overview</h1>
        <p className="text-muted-foreground">
          System-wide statistics and component distribution across your infrastructure portfolio.
        </p>
      </div>

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
            <CardTitle className="text-base">Procurement Readiness Overview</CardTitle>
            <Link href="/procurement-cases">
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
                      href={`/procurement-cases/${caseItem.id}`}
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
