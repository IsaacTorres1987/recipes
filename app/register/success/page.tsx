"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Eye, LayoutDashboard } from "lucide-react"

export default function ComponentRegisteredPage() {
  const router = useRouter()

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-xl mx-auto mt-12">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </div>
            <CardTitle className="text-xl">Component Registered</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2 mb-8">
              <p className="text-foreground">
                Component successfully registered.
              </p>
              <p className="text-foreground">
                Verification status: <span className="font-medium text-yellow-600">Pending</span>.
              </p>
              <p className="text-muted-foreground">
                The component record has been created and is ready for review.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => router.push("/registry/DEMO-GIRDER-NEW")}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Eye className="h-4 w-4" />
                View Component
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Back to Asset Owner Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
