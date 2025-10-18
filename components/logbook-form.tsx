"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { LogbookData } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"

interface LogbookFormProps {
  recordId: string
  onSubmit: (data: Omit<LogbookData, "createdAt">) => Promise<boolean>
}

export function LogbookForm({ recordId, onSubmit }: LogbookFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    ownerName: "",
    chassisNumber: "",
    engineNumber: "",
    model: "",
    color: "",
    dateOfRegistration: "",
    remarks: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !formData.vehicleNumber ||
      !formData.ownerName ||
      !formData.chassisNumber ||
      !formData.engineNumber ||
      !formData.model ||
      !formData.color ||
      !formData.dateOfRegistration
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    const success = await onSubmit(formData)
    setLoading(false)

    if (success) {
      toast({
        title: "Success",
        description: "Vehicle logbook has been registered successfully",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to save logbook data. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Registration Form</CardTitle>
        <CardDescription>
          Record ID: <span className="font-mono font-semibold text-foreground">{recordId}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">
                Vehicle Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="e.g., ABC-1234"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName">
                Owner Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerName"
                name="ownerName"
                placeholder="Full name of owner"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chassisNumber">
                Chassis Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="chassisNumber"
                name="chassisNumber"
                placeholder="17-digit chassis number"
                value={formData.chassisNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineNumber">
                Engine Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="engineNumber"
                name="engineNumber"
                placeholder="Engine identification number"
                value={formData.engineNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">
                Model / Make <span className="text-destructive">*</span>
              </Label>
              <Input
                id="model"
                name="model"
                placeholder="e.g., Toyota Camry 2024"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">
                Color <span className="text-destructive">*</span>
              </Label>
              <Input
                id="color"
                name="color"
                placeholder="Vehicle color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfRegistration">
                Date of Registration <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dateOfRegistration"
                name="dateOfRegistration"
                type="date"
                value={formData.dateOfRegistration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks (Optional)</Label>
            <Textarea
              id="remarks"
              name="remarks"
              placeholder="Additional notes or comments"
              value={formData.remarks}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Submitting...
              </>
            ) : (
              "Submit Registration"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
