import { DecisionSupportCaseList, DecisionSupportIntro, DecisionSupportView } from "@/components/decision-support-view"
import { procurementCases } from "@/lib/data"

export default async function DecisionSupportPage({ searchParams }: { searchParams: Promise<{ case?: string }> }) {
  const params = await searchParams
  const caseItem = procurementCases.find((item) => item.id === params.case) ?? procurementCases[0]

  return (
    <>
      <div className="border-b border-border bg-muted/20 px-6 py-4 lg:px-8">
        <h2 className="text-sm font-semibold text-foreground">Decision Support</h2>
        <DecisionSupportIntro />
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <DecisionSupportCaseList cases={procurementCases} />
      </div>
      <DecisionSupportView caseItem={caseItem} />
    </>
  )
}
