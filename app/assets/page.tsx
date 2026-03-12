"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Map, ShieldCheck, Activity, Database, ArrowRight, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

const infrastructureAssets = [
  {
    id: "BRG-NH-203",
    name: "Bridge N203 - Haarlem",
    type: "Highway Bridge",
    componentCount: 12,
    avgConditionScore: 3.1,
    verificationStatus: "Partially Verified",
    coordinates: { x: 25, y: 30 },
  },
  {
    id: "BRG-AMS-A10",
    name: "A10 Overpass - Amsterdam",
    type: "Overpass",
    componentCount: 8,
    avgConditionScore: 2.4,
    verificationStatus: "Verified",
    coordinates: { x: 55, y: 25 },
  },
  {
    id: "BRG-UT-12",
    name: "Canal Bridge - Utrecht",
    type: "Canal Bridge",
    componentCount: 6,
    avgConditionScore: 2.8,
    verificationStatus: "Verified",
    coordinates: { x: 65, y: 55 },
  },
  {
    id: "BRG-RTM-A15",
    name: "A15 Viaduct - Rotterdam",
    type: "Viaduct",
    componentCount: 18,
    avgConditionScore: 3.5,
    verificationStatus: "Pending",
    coordinates: { x: 30, y: 70 },
  },
]

export default function AssetsPage() {
  const [selectedAsset, setSelectedAsset] = useState<typeof infrastructureAssets[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-success/10 text-success border-success/20"
      case "Partially Verified":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getScoreColor = (score: number) => {
    if (score <= 2) return "text-success"
    if (score <= 3) return "text-yellow-600"
    return "text-orange-500"
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Map className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Infrastructure Asset Map</h1>
        </div>
        <p className="text-muted-foreground">
          View and manage infrastructure assets across your portfolio. Click on an asset marker to view details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Asset Locations - Netherlands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-muted/30 rounded-lg border border-border overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Netherlands outline simplified */}
                  <path
                    d="M20 15 L45 10 L60 15 L75 20 L80 35 L75 50 L70 65 L55 80 L40 85 L25 75 L20 55 L15 35 Z"
                    fill="#e5e7eb"
                    stroke="#cbd5e1"
                    strokeWidth="0.5"
                  />
                  
                  {/* Water areas */}
                  <ellipse cx="35" cy="30" rx="8" ry="5" fill="#bfdbfe" opacity="0.5" />
                  <ellipse cx="50" cy="45" rx="5" ry="3" fill="#bfdbfe" opacity="0.5" />
                  
                  {/* Asset markers */}
                  {infrastructureAssets.map((asset) => (
                    <g
                      key={asset.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <circle
                        cx={asset.coordinates.x}
                        cy={asset.coordinates.y}
                        r={selectedAsset?.id === asset.id ? 4 : 3}
                        className="transition-all"
                        fill={
                          asset.verificationStatus === "Verified" ? "#22c55e" :
                          asset.verificationStatus === "Partially Verified" ? "#eab308" : "#9ca3af"
                        }
                        stroke="white"
                        strokeWidth="1"
                      />
                      <circle
                        cx={asset.coordinates.x}
                        cy={asset.coordinates.y}
                        r="6"
                        fill="transparent"
                        className="hover:fill-primary/10"
                      />
                    </g>
                  ))}
                </svg>
                
                {/* Legend */}
                <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <p className="text-xs font-medium mb-2">Verification Status</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-success" />
                      <span className="text-xs text-muted-foreground">Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <span className="text-xs text-muted-foreground">Partially Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {selectedAsset ? (
            <Card className="border-primary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {selectedAsset.id}
                  </CardTitle>
                  <Badge variant="outline" className={cn("text-xs", getStatusColor(selectedAsset.verificationStatus))}>
                    {selectedAsset.verificationStatus}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-1">{selectedAsset.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{selectedAsset.type}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Component Count
                    </span>
                    <span className="font-semibold">{selectedAsset.componentCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Avg. Condition Score
                    </span>
                    <span className={cn("font-semibold", getScoreColor(selectedAsset.avgConditionScore))}>
                      {selectedAsset.avgConditionScore}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Verification
                    </span>
                    <Badge variant="outline" className={cn("text-xs", getStatusColor(selectedAsset.verificationStatus))}>
                      {selectedAsset.verificationStatus}
                    </Badge>
                  </div>
                </div>
                
                <Link href="/registry">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                    View Component Registry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Click on an asset marker to view details
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">All Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {infrastructureAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-colors",
                      selectedAsset?.id === asset.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-medium">{asset.id}</span>
                      <span className="text-xs text-muted-foreground">{asset.componentCount} components</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{asset.name}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
