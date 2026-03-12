"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"

export default function RegisterComponentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    componentId: "DEMO-GIRDER-NEW",
    bridgeId: "BR-N203-07",
    componentType: "Precast Concrete Girder",
    spanLength: "21.5",
    materialClass: "C40/50",
    conditionScore: "2",
    inspectionReport: "INS-2026-0342",
    verificationStatus: "Pending"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/register/success")
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Register Component</h1>
        <p className="text-muted-foreground">
          Register a new infrastructure component in the CircuFax platform.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <PlusCircle className="h-4 w-4 text-primary" />
            Component Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="componentId">Component ID</Label>
                <Input
                  id="componentId"
                  value={formData.componentId}
                  onChange={(e) => setFormData({ ...formData, componentId: e.target.value })}
                  placeholder="e.g., DEMO-GIRDER-01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bridgeId">Bridge ID</Label>
                <Input
                  id="bridgeId"
                  value={formData.bridgeId}
                  onChange={(e) => setFormData({ ...formData, bridgeId: e.target.value })}
                  placeholder="e.g., BR-N203-07"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="componentType">Component Type</Label>
                <Select
                  value={formData.componentType}
                  onValueChange={(value) => setFormData({ ...formData, componentType: value })}
                >
                  <SelectTrigger id="componentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Precast Concrete Girder">Precast Concrete Girder</SelectItem>
                    <SelectItem value="Prestressed Box Beam">Prestressed Box Beam</SelectItem>
                    <SelectItem value="Reinforced Concrete Slab">Reinforced Concrete Slab</SelectItem>
                    <SelectItem value="Precast Concrete Column">Precast Concrete Column</SelectItem>
                    <SelectItem value="Steel Plate Girder">Steel Plate Girder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spanLength">Span / Length (m)</Label>
                <Input
                  id="spanLength"
                  type="number"
                  step="0.1"
                  value={formData.spanLength}
                  onChange={(e) => setFormData({ ...formData, spanLength: e.target.value })}
                  placeholder="e.g., 24.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="materialClass">Material Class</Label>
                <Select
                  value={formData.materialClass}
                  onValueChange={(value) => setFormData({ ...formData, materialClass: value })}
                >
                  <SelectTrigger id="materialClass">
                    <SelectValue placeholder="Select material class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C30/37">C30/37</SelectItem>
                    <SelectItem value="C35/45">C35/45</SelectItem>
                    <SelectItem value="C40/50">C40/50</SelectItem>
                    <SelectItem value="C45/55">C45/55</SelectItem>
                    <SelectItem value="C50/60">C50/60</SelectItem>
                    <SelectItem value="S355 (Steel)">S355 (Steel)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditionScore">Condition Score (NEN 2767)</Label>
                <Select
                  value={formData.conditionScore}
                  onValueChange={(value) => setFormData({ ...formData, conditionScore: value })}
                >
                  <SelectTrigger id="conditionScore">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Excellent</SelectItem>
                    <SelectItem value="2">2 - Good</SelectItem>
                    <SelectItem value="3">3 - Reasonable</SelectItem>
                    <SelectItem value="4">4 - Moderate</SelectItem>
                    <SelectItem value="5">5 - Poor</SelectItem>
                    <SelectItem value="6">6 - Very Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspectionReport">Inspection Report Reference</Label>
                <Input
                  id="inspectionReport"
                  value={formData.inspectionReport}
                  onChange={(e) => setFormData({ ...formData, inspectionReport: e.target.value })}
                  placeholder="e.g., INS-2026-0001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verificationStatus">Verification Status</Label>
                <Select
                  value={formData.verificationStatus}
                  onValueChange={(value) => setFormData({ ...formData, verificationStatus: value })}
                >
                  <SelectTrigger id="verificationStatus">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Verified">Verified</SelectItem>
                    <SelectItem value="Unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="gap-2 bg-primary hover:bg-primary/90">
                <PlusCircle className="h-4 w-4" />
                Submit Component
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
