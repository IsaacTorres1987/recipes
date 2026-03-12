"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface AddToProcurementButtonProps {
  componentId: string
}

export function AddToProcurementButton({ componentId }: AddToProcurementButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push("/procurement")
  }

  return (
    <Button onClick={handleClick} className="gap-2 bg-primary hover:bg-primary/90">
      <Plus className="h-4 w-4" />
      Add to Procurement Case
    </Button>
  )
}
