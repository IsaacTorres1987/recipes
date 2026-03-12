"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  Building2,
  ShieldCheck,
  ArrowRight
} from "lucide-react"
import { procurementCases } from "@/lib/data"
import { cn } from "@/lib/utils"

const reportTypes = [
  {
    title: "Procurement Assessment Reports",
    description: "Component assessment reports for active procurement cases",
    icon: FileText,
    count: procurementCases.length,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Verification Reports",
    description: "Structural verification and inspection summaries",
    icon: ShieldCheck,
    count: 12,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Asset Condition Reports",
    description: "NEN 2767 condition assessments across infrastructure",
    icon: Building2,
    count: 8,
    color: "text-yellow-600",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Analytics Reports",
    description: "Portfolio analytics and trend analysis",
    icon: BarChart3,
    count: 4,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export default function ReportsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        </div>
        <p className="text-muted-foreground">
          Access procurement reports, verification summaries, and infrastructure analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reportTypes.map((report) => (
          <Card key={report.title} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${report.bgColor}`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{report.title}</h3>
                    <Badge variant="outline">{report.count} reports</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Procurement Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {procurementCases.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{caseItem.projectName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/procurement-cases/${caseItem.id}/report`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      View Report
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
