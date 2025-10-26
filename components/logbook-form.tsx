"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    identifierNumber: "",
    vehicleType: "",
    bodyType: "",
    colour: "",
    registrationPlateNumber: "",
    registrationExpiry: "",
    yearOfManufacture: "",
    identifierType: "",
    make: "",
    model: "",
    engineNumber: "",
    stateVehicleRegistered: "",
    yearMonthCompliance: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.identifierNumber ||
      !formData.vehicleType ||
      !formData.bodyType ||
      !formData.colour ||
      !formData.registrationPlateNumber ||
      !formData.registrationExpiry ||
      !formData.yearOfManufacture ||
      !formData.identifierType ||
      !formData.make ||
      !formData.model ||
      !formData.engineNumber ||
      !formData.stateVehicleRegistered ||
      !formData.yearMonthCompliance
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
              <Label htmlFor="identifierNumber">
                Identifier Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="identifierNumber"
                name="identifierNumber"
                placeholder="e.g., ID-12345"
                value={formData.identifierNumber}
                onChange={handleChange}
                required
              />
            </div>

                        <div className="space-y-2">
              <Label htmlFor="identifierType">
                Identifier Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="identifierType"
                name="identifierType"
                placeholder="e.g., VIN, Chassis Number"
                value={formData.identifierType}
                onChange={handleChange}
                required
              />
            </div>

                        <div className="space-y-2">
              <Label htmlFor="registrationPlateNumber">
                Registration Plate Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="registrationPlateNumber"
                name="registrationPlateNumber"
                placeholder="e.g., ABC-1234"
                value={formData.registrationPlateNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationExpiry">
                Registration Expiry <span className="text-destructive">*</span>
              </Label>
              <Input
                id="registrationExpiry"
                name="registrationExpiry"
                type="date"
                value={formData.registrationExpiry}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">
                Vehicle Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="vehicleType"
                name="vehicleType"
                placeholder="e.g., Car, Truck, Motorcycle"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyType">
                Body Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="bodyType"
                name="bodyType"
                placeholder="e.g., Sedan, SUV, Hatchback"
                value={formData.bodyType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="colour">
                Colour <span className="text-destructive">*</span>
              </Label>
              <Input
                id="colour"
                name="colour"
                placeholder="Vehicle colour"
                value={formData.colour}
                onChange={handleChange}
                required
              />
            </div>



            <div className="space-y-2">
              <Label htmlFor="yearOfManufacture">
                Year of Manufacture <span className="text-destructive">*</span>
              </Label>
              <Input
                id="yearOfManufacture"
                name="yearOfManufacture"
                placeholder="e.g., 2024"
                value={formData.yearOfManufacture}
                onChange={handleChange}
                required
              />
            </div>



            <div className="space-y-2">
              <Label htmlFor="make">
                Make <span className="text-destructive">*</span>
              </Label>
              <Input
                id="make"
                name="make"
                placeholder="e.g., Toyota, Honda"
                value={formData.make}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">
                Model <span className="text-destructive">*</span>
              </Label>
              <Input
                id="model"
                name="model"
                placeholder="e.g., Camry, Civic"
                value={formData.model}
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
              <Label htmlFor="stateVehicleRegistered">
                State Vehicle Registered <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stateVehicleRegistered"
                name="stateVehicleRegistered"
                placeholder="e.g., California, Texas"
                value={formData.stateVehicleRegistered}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearMonthCompliance">
                Year/Month of Compliance <span className="text-destructive">*</span>
              </Label>
              <Input
                id="yearMonthCompliance"
                name="yearMonthCompliance"
                placeholder="e.g., 2024-01"
                value={formData.yearMonthCompliance}
                onChange={handleChange}
                required
              />
            </div>
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
