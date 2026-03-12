"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, ShieldCheck, Activity, Recycle } from "lucide-react"
import { dashboardStats } from "@/lib/data"
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
  },
  {
    title: "Average Condition Score",
    value: dashboardStats.averageConditionScore,
    icon: Activity,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Reuse Candidates",
    value: dashboardStats.reuseCandidates,
    icon: Recycle,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export default function DashboardPage() {
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
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">NEN 2767 Condition Score Distribution</CardTitle>
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
              { action: "New component registered", id: "DEMO-SLAB-03", time: "5 hours ago", type: "registration" },
              { action: "Inspection completed", id: "DEMO-BEAM-02", time: "1 day ago", type: "inspection" },
              { action: "Added to procurement case", id: "DEMO-COLUMN-04", time: "2 days ago", type: "procurement" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === "verification" ? "bg-success" :
                    activity.type === "registration" ? "bg-primary" :
                    activity.type === "inspection" ? "bg-yellow-500" : "bg-muted-foreground"
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
