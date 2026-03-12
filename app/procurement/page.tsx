"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download, Building2, Users, Clock, ShieldCheck, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const selectedComponents = [
  {
    id: "DEMO-GIRDER-01",
    type: "Precast Girder",
    span: "24.5 m",
    conditionScore: 3,
    verificationStatus: "Verified",
    reusePotential: "Feasible",
  },
  {
    id: "DEMO-BEAM-02",
    type: "Box Beam",
    span: "18.0 m",
    conditionScore: 2,
    verificationStatus: "Verified",
    reusePotential: "Recommended",
  },
  {
    id: "DEMO-COLUMN-04",
    type: "Concrete Column",
    span: "8.5 m",
    conditionScore: 2,
    verificationStatus: "Verified",
    reusePotential: "Recommended",
  },
]

export default function ProcurementPage() {
  const router = useRouter()

  const handleExportPackage = () => {
    router.push("/procurement/report")
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
      case "Recommended":
        return "bg-success/10 text-success border-success/20"
      case "Feasible":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 2) return "text-success"
    if (score <= 3) return "text-yellow-600"
    return "text-destructive"
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Procurement Case</h1>
        </div>
        <p className="text-muted-foreground">
          Prepare procurement packages using verified component data and Digital Product Passports.
        </p>
      </div>

      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Name</p>
                <p className="font-semibold">Bridge Replacement - N203</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-semibold">Province of North Holland</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Procurement Stage</p>
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                  Tender Preparation
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedComponents.map((component) => (
                  <TableRow key={component.id} className="hover:bg-muted/30">
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
                      <Badge variant="outline" className={cn("font-medium", getPotentialColor(component.reusePotential))}>
                        {component.reusePotential}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Procurement Decision Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed mb-2">
            Selected components contain verified structural and condition data.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This information can support procurement teams when specifying reusable infrastructure elements in tender documentation.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleExportPackage} className="gap-2 bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Export Procurement Package
        </Button>
      </div>
    </div>
  )
}
