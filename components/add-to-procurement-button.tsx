"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"

interface AddToProcurementButtonProps {
  componentId: string
}

export function AddToProcurementButton({ componentId }: AddToProcurementButtonProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleClick = () => {
    toast({
      title: "Component Added",
      description: `${componentId} has been added to the procurement case.`,
    })
    router.push("/procurement-cases/case-n203")
  }

  return (
    <Button onClick={handleClick} className="gap-2 bg-primary hover:bg-primary/90">
      <Plus className="h-4 w-4" />
      Add to Procurement Case
    </Button>
  )
}
