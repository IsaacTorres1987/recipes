"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { components } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function RegistryPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [conditionFilter, setConditionFilter] = useState<string>("all")
  const [verificationFilter, setVerificationFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredComponents = components.filter((component) => {
    if (typeFilter !== "all" && !component.componentType.toLowerCase().includes(typeFilter.toLowerCase())) {
      return false
    }
    if (conditionFilter !== "all" && component.conditionScore !== parseInt(conditionFilter)) {
      return false
    }
    if (verificationFilter !== "all" && component.verificationStatus !== verificationFilter) {
      return false
    }
    if (searchQuery && !component.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !component.componentType.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    return true
  })

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

  const getConditionLabel = (score: number) => {
    switch (score) {
      case 1: return "Excellent"
      case 2: return "Good"
      case 3: return "Reasonable"
      case 4: return "Moderate"
      case 5: return "Poor"
      case 6: return "Very Poor"
      default: return "Unknown"
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Component Registry</h1>
        <p className="text-muted-foreground">
          Browse and manage infrastructure components with Digital Product Passports.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Component Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="girder">Girder</SelectItem>
                <SelectItem value="beam">Beam</SelectItem>
                <SelectItem value="slab">Slab</SelectItem>
                <SelectItem value="column">Column</SelectItem>
              </SelectContent>
            </Select>
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Condition Score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="1">1 - Excellent</SelectItem>
                <SelectItem value="2">2 - Good</SelectItem>
                <SelectItem value="3">3 - Reasonable</SelectItem>
                <SelectItem value="4">4 - Moderate</SelectItem>
                <SelectItem value="5">5 - Poor</SelectItem>
                <SelectItem value="6">6 - Very Poor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Verification Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Verified">Verified</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component ID</TableHead>
                <TableHead>Component Type</TableHead>
                <TableHead>Span / Length</TableHead>
                <TableHead>Condition Score (NEN 2767)</TableHead>
                <TableHead>Verification Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComponents.map((component) => (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">{component.id}</TableCell>
                  <TableCell>{component.componentType}</TableCell>
                  <TableCell>{component.spanLength}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="font-medium">{component.conditionScore}</span>
                      <span className="text-muted-foreground text-sm">
                        ({getConditionLabel(component.conditionScore)})
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn("font-medium", getStatusColor(component.verificationStatus))}
                    >
                      {component.verificationStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{component.owner}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/registry/${component.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filteredComponents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No components found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
