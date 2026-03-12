import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, ShieldCheck, BarChart3, Building2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            Digital Product Passports
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Structured infrastructure data for smarter decisions.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            CircuFax enables asset owners and engineers to manage component data, verify infrastructure assets, and support lifecycle and procurement decisions using Digital Product Passports.
          </p>
          
          <Link href="/registry">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              Enter Platform
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Database}
              title="Component Registry"
              description="Centralized database of infrastructure components with detailed specifications and metadata."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Verification"
              description="Blockchain-anchored verification for trusted Digital Product Passports."
            />
            <FeatureCard
              icon={BarChart3}
              title="Condition Assessment"
              description="NEN 2767 compliant condition scoring for infrastructure lifecycle management."
            />
            <FeatureCard
              icon={Building2}
              title="Asset Management"
              description="Tools for asset owners to manage, track, and register infrastructure components."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string 
}) {
  return (
    <div className="p-6 rounded-lg border border-border bg-card">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
