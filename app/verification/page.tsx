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
import { ExternalLink, ShieldCheck } from "lucide-react"
import { verificationRecords } from "@/lib/data"
import { cn } from "@/lib/utils"
import { InfoTooltip, tooltipDefinitions } from "@/components/info-tooltip"

export default function VerificationPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-success/10 text-success border-success/20"
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Verification Registry</h1>
          <InfoTooltip content={tooltipDefinitions.verificationLayer} />
        </div>
        <p className="text-muted-foreground">
          Track and verify Digital Product Passports with blockchain-anchored hashes for all infrastructure components.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-success/10">
                <ShieldCheck className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">92</p>
                <p className="text-sm text-muted-foreground">Verified Components</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/10">
                <ShieldCheck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Pending Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted">
                <ShieldCheck className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">14</p>
                <p className="text-sm text-muted-foreground">Unverified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Verified Infrastructure Components</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Component ID</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                  <TableHead className="font-semibold">Verifier</TableHead>
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">Digital Product Passport</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationRecords.map((record) => (
                  <TableRow key={record.componentId} className="hover:bg-muted/30">
                    <TableCell className="font-mono font-medium">{record.componentId}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn("font-medium", getStatusColor(record.status))}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.verifier}</TableCell>
                    <TableCell className="text-muted-foreground">{record.timestamp}</TableCell>
                    <TableCell>
                      {record.status === "VERIFIED" ? (
                        <a 
                          href="https://circularise.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-2">
                            Open Digital Product Passport
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 border-success/30 bg-success/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-success/10">
              <ShieldCheck className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">About Verification</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Verified components have undergone inspection and assessment according to NEN 2767 standards. 
                Each verification is anchored to a blockchain hash, ensuring tamper-proof records that can be 
                independently validated through the Digital Product Passport.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
