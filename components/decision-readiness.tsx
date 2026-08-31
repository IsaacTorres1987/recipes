import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, ShieldCheck, TriangleAlert } from "lucide-react"
import type { ProcurementCase } from "@/lib/data"

const stateStyles: Record<string, string> = {
  Ready: "bg-success/10 text-success border-success/20",
  "Ready with Restrictions": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "Not Ready": "bg-destructive/10 text-destructive border-destructive/20",
  Unknown: "bg-muted text-muted-foreground border-border",
}

export function DecisionReadinessPanel({ caseData }: { caseData: ProcurementCase }) {
  const readiness = caseData.decisionReadiness
  if (!readiness) return null
  const evidence = readiness.evidenceCoverage
  const fitness = caseData.evidenceFitness
  const assessments = caseData.specialistAssessments ?? []
  const restrictions = caseData.restrictions ?? []
  const actions = caseData.outstandingActions ?? []

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" />Decision Readiness</CardTitle>
            <Badge variant="outline" className={stateStyles[readiness.state]}>{readiness.state}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-foreground">{readiness.rationale}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <span><strong>{evidence.satisfied}/{evidence.total}</strong> evidence requirements satisfied</span>
            <span><strong>{assessments.filter((item) => item.required && item.status === "Complete").length}/{assessments.filter((item) => item.required).length || 0}</strong> required specialist assessments complete</span>
            <span><strong>{restrictions.filter((item) => item.status === "Open").length}</strong> open restrictions</span>
          </div>
          {readiness.uncertainty.length > 0 && <p className="text-sm text-muted-foreground">Uncertainty: {readiness.uncertainty.join("; ")}</p>}
        </CardContent>
      </Card>

      {fitness && <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Evidence Fitness</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {Object.entries(fitness).map(([key, value]) => <div key={key} className="flex items-start gap-3 rounded-lg border border-border p-3">
            {value.state === "Fit" ? <CheckCircle2 className="h-5 w-5 text-success shrink-0" /> : <TriangleAlert className="h-5 w-5 text-yellow-600 shrink-0" />}
            <div><p className="font-medium">{key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}</p><Badge variant="outline" className="mt-1">{value.state}</Badge><p className="mt-2 text-xs text-muted-foreground">{value.summary}</p></div>
          </div>)}
        </CardContent>
      </Card>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">Specialist Assessments</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{assessments.map((item) => <div key={item.id} className="flex items-start gap-3"><Circle className="mt-0.5 h-4 w-4 text-muted-foreground" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="font-medium text-sm">{item.name}</span><Badge variant="outline">{item.status}</Badge></div><p className="text-xs text-muted-foreground mt-1">{item.summary} Owner: {item.owner}.</p></div></div>)}</CardContent></Card>
        <Card><CardHeader className="pb-3"><CardTitle className="text-base">Restrictions & Outstanding Actions</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{[...restrictions.map((item) => ({ label: item.label, detail: item.rationale, status: item.status })), ...actions.map((item) => ({ label: item.label, detail: `Owner: ${item.owner}`, status: item.status }))].map((item, index) => <div key={`${item.label}-${index}`} className="flex items-start gap-3"><TriangleAlert className="mt-0.5 h-4 w-4 text-yellow-600" /><div><div className="flex flex-wrap items-center gap-2"><span className="font-medium text-sm">{item.label}</span><Badge variant="outline">{item.status}</Badge></div><p className="text-xs text-muted-foreground mt-1">{item.detail}</p></div></div>)}</CardContent></Card>
      </div>
    </div>
  )
}

export function DecisionPackagePanel({ caseData }: { caseData: ProcurementCase }) {
  const pkg = caseData.decisionPackage
  if (!pkg) return null
  return <Card className="mb-6"><CardHeader className="pb-3"><CardTitle className="text-base">Decision Package</CardTitle></CardHeader><CardContent className="flex flex-col gap-2 text-sm"><div className="flex flex-wrap justify-between gap-2"><span className="text-muted-foreground">Package</span><span className="font-mono">{pkg.packageId} · v{pkg.version}</span></div><div className="flex flex-wrap justify-between gap-2"><span className="text-muted-foreground">Scope</span><span>{pkg.scope}</span></div><p className="pt-2 text-xs leading-relaxed text-muted-foreground">{pkg.externalVerificationBoundary} {pkg.dppBoundary}</p></CardContent></Card>
}
