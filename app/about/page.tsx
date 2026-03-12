import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, ShieldCheck, Recycle, Users, Building2, FileCheck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            About CircuFax
          </h1>
          <p className="text-lg text-muted-foreground mb-6 text-pretty">
            CircuFax is a digital platform that helps infrastructure asset owners, engineers, and planners manage structured component data and make lifecycle and procurement decisions using verified Digital Product Passports.
          </p>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-sm text-foreground">
              <strong>Note:</strong> CircuFax is a data management and decision-support platform for infrastructure components. This is not a marketplace.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">Key Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CapabilityCard
              icon={Database}
              title="Component Registry"
              description="Centralized database for infrastructure components with detailed specifications, material properties, and geometric data."
            />
            <CapabilityCard
              icon={ShieldCheck}
              title="Digital Product Passports"
              description="Blockchain-anchored verification system ensuring data integrity and traceability for all component information."
            />
            <CapabilityCard
              icon={FileCheck}
              title="Condition Assessment"
              description="NEN 2767 compliant condition scoring system for standardized infrastructure lifecycle assessment."
            />
            <CapabilityCard
              icon={Recycle}
              title="Reuse Decision Support"
              description="Intelligent recommendations for component reuse feasibility based on verified inspection data and structural capacity."
            />
            <CapabilityCard
              icon={Building2}
              title="Asset Management"
              description="Tools for asset owners to register, track, and manage their infrastructure component portfolios."
            />
            <CapabilityCard
              icon={Users}
              title="Stakeholder Collaboration"
              description="Shared platform for engineers, inspectors, and planners to access verified component data."
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">How It Works</h2>
          <div className="space-y-4">
            <StepCard
              number={1}
              title="Register Components"
              description="Asset owners register infrastructure components with detailed specifications, material data, and geometric properties."
            />
            <StepCard
              number={2}
              title="Inspection & Assessment"
              description="Certified inspectors conduct NEN 2767 condition assessments and structural capacity evaluations."
            />
            <StepCard
              number={3}
              title="Verification & DPP Creation"
              description="Component data is verified and anchored to create tamper-proof Digital Product Passports."
            />
            <StepCard
              number={4}
              title="Decision Support"
              description="Engineers and planners access verified data to make informed lifecycle and procurement decisions."
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Standards & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium text-foreground mb-1">NEN 2767</p>
                <p className="text-sm text-muted-foreground">
                  Dutch standard for condition assessment of building and infrastructure elements.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Eurocode</p>
                <p className="text-sm text-muted-foreground">
                  European structural design standards for load calculations and capacity verification.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Digital Product Passport</p>
                <p className="text-sm text-muted-foreground">
                  EU initiative for circular economy traceability and material transparency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CapabilityCard({
  icon: Icon,
  title,
  description
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({
  number,
  title,
  description
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-primary-foreground">{number}</span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
