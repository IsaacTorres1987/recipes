import Link from "next/link"
import {
  ArrowRight,
  ClipboardCheck,
  ExternalLink,
  FileCheck2,
  History,
  PackageCheck,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { ProcurementCase } from "@/lib/data"

function stateClass(state: string) {
  if (state === "Ready") return "border-success/30 bg-success/10 text-success"
  if (state === "Ready with Restrictions") return "border-amber-500/30 bg-amber-500/10 text-amber-700"
  if (state === "Not Ready") return "border-destructive/30 bg-destructive/10 text-destructive"
  return "border-border bg-muted text-muted-foreground"
}

function statusClass(status: string) {
  if (["Complete", "Fit", "Satisfied", "Resolved"].includes(status)) return "text-success"
  if (["Pending", "Partial", "Open", "In Progress", "Unresolved"].includes(status)) return "text-amber-700"
  return "text-muted-foreground"
}

export function DecisionSupportView({ caseItem }: { caseItem: ProcurementCase }) {
  const readiness = caseItem.decisionReadiness
  const evidence = caseItem.evidenceFitness
  const assessments = caseItem.specialistAssessments ?? []
  const restrictions = caseItem.restrictions ?? []
  const actions = caseItem.outstandingActions ?? []
  const pkg = caseItem.decisionPackage
  const satisfied = readiness?.evidenceCoverage.satisfied ?? 0
  const total = readiness?.evidenceCoverage.total ?? 0

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" /> Decision Support
          </div>
          <h1 className="text-2xl font-bold text-foreground">{caseItem.projectName}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">A structured decision basis connecting the existing CircuFax component record, evidence, assessments, restrictions, and package.</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{caseItem.id}</Badge>
            <span>{pkg?.packageId ?? "Decision package not issued"}</span>
            <span aria-hidden="true">·</span>
            <span>Version {pkg?.version ?? "Unknown"}</span>
          </div>
        </div>
        <Link href={`/projects/${caseItem.id}`}>
          <Button variant="outline" className="gap-2">Open project decision overview <ArrowRight data-icon="inline-end" /></Button>
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>Decision overview</CardTitle>
                <CardDescription>Decision Readiness is derived from evidence coverage, required assessments, restrictions, uncertainty, and outstanding actions.</CardDescription>
              </div>
              <Badge className={cn("w-fit", stateClass(readiness?.state ?? "Unknown"))}>{readiness?.state ?? "Unknown"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border bg-muted/20 p-4"><p className="text-xs text-muted-foreground">Evidence Requirements</p><p className="mt-1 text-2xl font-semibold">{satisfied} of {total}</p><p className="mt-1 text-xs text-muted-foreground">{readiness?.evidenceCoverage.unresolved.join(", ") || "No unresolved requirement recorded"}</p></div>
            <div className="rounded-lg border bg-muted/20 p-4"><p className="text-xs text-muted-foreground">Specialist Assessments</p><p className="mt-1 text-2xl font-semibold">{assessments.filter((item) => item.status === "Complete").length} of {assessments.filter((item) => item.required).length}</p><p className="mt-1 text-xs text-muted-foreground">Required assessment status</p></div>
            <div className="rounded-lg border bg-muted/20 p-4"><p className="text-xs text-muted-foreground">Restrictions</p><p className="mt-1 text-2xl font-semibold">{restrictions.filter((item) => item.status === "Open").length}</p><p className="mt-1 text-xs text-muted-foreground">Open conditions on use</p></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Decision basis</CardTitle><CardDescription>Communicates the decision without authorizing engineering or procurement action.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Conclusion</p><p className="mt-1 text-sm">{caseItem.decisionSynthesis?.conclusion ?? "No decision synthesis recorded."}</p></div>
            <Separator />
            <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Responsible scope</p><p className="mt-1 text-sm">{pkg?.scope ?? "Unknown"}</p></div>
            <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Uncertainty</p><ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{(caseItem.decisionSynthesis?.uncertainty ?? readiness?.uncertainty ?? ["Unknown"]).map((item) => <li key={item}>{item}</li>)}</ul></div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Evidence Requirements</CardTitle><CardDescription>Requirement → acceptance condition → evidence reference → coverage.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {[{ id: "inspection-report", label: "Inspection Report", satisfied: caseItem.evidenceChecklist.inspectionReport, evidenceId: "EV-N203-INS-01", version: "v2.1" }, { id: "structural-capacity", label: "Structural Capacity Assessment", satisfied: caseItem.evidenceChecklist.structuralCapacity, evidenceId: "EV-N203-CAP-01", version: "v1.4" }, { id: "material-verification", label: "Material Verification", satisfied: caseItem.evidenceChecklist.materialVerification, evidenceId: "EV-N203-MAT-01", version: "v1.2" }, { id: "dpp-link", label: "DPP Link", satisfied: caseItem.evidenceChecklist.dppLink, evidenceId: "DPP-N203-01", version: "External reference" }, { id: "verifier", label: "Verifier Identified", satisfied: caseItem.evidenceChecklist.verifierIdentified, evidenceId: "Not assigned", version: "Unknown" }].map((item) => <div key={item.id} className="flex items-start gap-3 rounded-lg border p-3"><FileCheck2 className={cn("mt-0.5 size-4", item.satisfied ? "text-success" : "text-amber-700")} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-medium">{item.label}</p><span className={cn("text-xs", statusClass(item.satisfied ? "Satisfied" : "Unresolved"))}>{item.satisfied ? "Satisfied" : "Unresolved"}</span></div><p className="mt-1 text-xs text-muted-foreground">Acceptance condition is recorded against {item.evidenceId} · {item.version}</p></div></div>)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Evidence Fitness</CardTitle><CardDescription>Fitness is assessed across three distinct dimensions.</CardDescription></CardHeader>
          <CardContent className="space-y-3">{[{ label: "Reliability and Assurance", value: evidence?.reliabilityAndAssurance }, { label: "Relevance and Contextual Fit", value: evidence?.relevanceAndContextualFit }, { label: "Sufficiency and Gaps", value: evidence?.sufficiencyAndGaps }].map((item) => <div key={item.label} className="rounded-lg border p-3"><div className="flex items-center justify-between gap-3"><p className="font-medium">{item.label}</p><span className={cn("text-xs font-medium", statusClass(item.value?.state ?? "Unknown"))}>{item.value?.state ?? "Unknown"}</span></div><p className="mt-1 text-sm text-muted-foreground">{item.value?.summary ?? "No assessment recorded."}</p></div>)}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Specialist Assessment Instances</CardTitle><CardDescription>Required specialist work is separate from Evidence Requirement coverage.</CardDescription></CardHeader>
          <CardContent className="space-y-3">{assessments.length ? assessments.map((item) => <div key={item.id} className="flex items-start gap-3 rounded-lg border p-3"><ClipboardCheck className="mt-0.5 size-4 text-muted-foreground" /><div className="flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{item.name}</p><span className={cn("text-xs font-medium", statusClass(item.status))}>{item.status}</span></div><p className="mt-1 text-sm text-muted-foreground">{item.summary}</p><p className="mt-1 text-xs text-muted-foreground">Responsible role: {item.owner}</p></div></div>) : <p className="text-sm text-muted-foreground">Unknown — no specialist assessment instances recorded.</p>}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Restrictions and outstanding actions</CardTitle><CardDescription>Conditions that shape permitted use of this decision basis.</CardDescription></CardHeader>
          <CardContent className="space-y-4">{restrictions.map((item) => <div key={item.id} className="flex gap-3"><TriangleAlert className="mt-0.5 size-4 text-amber-700" /><div><p className="font-medium">{item.label} <span className="text-xs font-normal text-amber-700">· {item.status}</span></p><p className="text-sm text-muted-foreground">{item.rationale}</p></div></div>)}<Separator />{actions.map((item) => <div key={item.id} className="flex gap-3"><ClipboardCheck className="mt-0.5 size-4 text-muted-foreground" /><div><p className="font-medium">{item.label} <span className="text-xs font-normal text-muted-foreground">· {item.status}</span></p><p className="text-sm text-muted-foreground">Owner: {item.owner}</p></div></div>)}</CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Decision Package and history</CardTitle><CardDescription>Package references preserve the decision chain without duplicating authoritative component records.</CardDescription></CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3 text-sm"><div className="flex items-start gap-3"><PackageCheck className="mt-0.5 size-4 text-primary" /><div><p className="font-medium">{pkg?.packageId ?? "Unknown package"} · v{pkg?.version ?? "Unknown"}</p><p className="text-muted-foreground">Prepared for {pkg?.preparedFor ?? "Unknown"} on {pkg?.preparedAt ?? "Unknown"}. {pkg?.scope ?? "Scope unknown."}</p></div></div><div className="flex items-start gap-3"><ExternalLink className="mt-0.5 size-4 text-muted-foreground" /><p className="text-muted-foreground">{pkg?.externalVerificationBoundary ?? "External verification boundary unknown."}</p></div><div className="flex items-start gap-3"><ExternalLink className="mt-0.5 size-4 text-muted-foreground" /><p className="text-muted-foreground">{pkg?.dppBoundary ?? "DPP boundary unknown."}</p></div></div>
          <div className="rounded-lg border bg-muted/20 p-4"><div className="flex items-center gap-2"><History className="size-4 text-muted-foreground" /><p className="font-medium">Decision history</p></div><p className="mt-2 text-sm text-muted-foreground">Version {pkg?.version ?? "Unknown"} is the current recorded package. Future revisions should retain the case, requirement, evidence, assessment, and authorization references.</p></div>
        </CardContent>
      </Card>
    </div>
  )
}

export function DecisionSupportCaseList({ cases }: { cases: ProcurementCase[] }) {
  return <div className="mb-6 flex flex-wrap gap-2">{cases.map((item) => <Link key={item.id} href={`/decision-support?case=${item.id}`}><Button variant={item.id === "case-n203" ? "default" : "outline"} size="sm">{item.projectName}</Button></Link>)}</div>
}

export function ComponentReference({ componentId }: { componentId: string }) {
  return <Link className="text-sm text-primary underline-offset-4 hover:underline" href={`/registry/${componentId}`}>View component record <ArrowRight className="inline size-3" /></Link>
}

export function DecisionSupportIntro() {
  return <p className="text-sm text-muted-foreground">Decision Support organizes the decision basis; professional decision authority remains with responsible actors.</p>
}
