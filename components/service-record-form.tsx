"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface ServiceRecordFormProps {
  recordId: string
  onSuccess: () => void
}

const SERVICE_TYPES = [
  "Initial / First Service",
  "Minor Service",
  "Intermediate Service",
  "Major Service",
  "Annual Service",
  "Kilometer-based Service",
]

export function ServiceRecordForm({ recordId, onSuccess }: ServiceRecordFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    serviceId: "",
    serviceDate: "",
    serviceType: "",
    serviceCenterDealerName: "",
    cost: "",
    odometerReading: "",
    nextServiceDue: "",
    serviceDescription: "",
    technicianMechanicName: "",
    additionalNotes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.serviceId ||
      !formData.serviceDate ||
      !formData.serviceType ||
      !formData.serviceCenterDealerName ||
      !formData.odometerReading ||
      !formData.serviceDescription ||
      !formData.technicianMechanicName
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const docRef = doc(collection(db, "records"), formData.serviceId)
      await setDoc(docRef, {
        recordId,
        serviceDate: formData.serviceDate,
        serviceType: formData.serviceType,
        serviceCenterDealerName: formData.serviceCenterDealerName,
        cost: formData.cost,
        odometerReading: formData.odometerReading,
        nextServiceDue: formData.nextServiceDue,
        serviceDescription: formData.serviceDescription,
        technicianMechanicName: formData.technicianMechanicName,
        additionalNotes: formData.additionalNotes,
        createdAt: new Date().toISOString(),
      })

      toast({
        title: "Success",
        description: "Service record added successfully",
      })

      setFormData({
        serviceId: "",
        serviceDate: "",
        serviceType: "",
        serviceCenterDealerName: "",
        cost: "",
        odometerReading: "",
        nextServiceDue: "",
        serviceDescription: "",
        technicianMechanicName: "",
        additionalNotes: "",
      })

      onSuccess()
    } catch (err) {
      console.error("Error adding service record:", err)
      toast({
        title: "Error",
        description: "Failed to add service record",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Service Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="serviceId">
                Service ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="serviceId"
                name="serviceId"
                placeholder="e.g., SRV-001"
                value={formData.serviceId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDate">
                Service Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="serviceDate"
                name="serviceDate"
                type="date"
                value={formData.serviceDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">
                Service Type <span className="text-destructive">*</span>
              </Label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="">Select a service type</option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceCenterDealerName">
                Service Center / Dealer Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="serviceCenterDealerName"
                name="serviceCenterDealerName"
                placeholder="Name of service center"
                value={formData.serviceCenterDealerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input id="cost" name="cost" placeholder="e.g., $150.00" value={formData.cost} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="odometerReading">
                Odometer Reading (km) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="odometerReading"
                name="odometerReading"
                placeholder="e.g., 50000"
                value={formData.odometerReading}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextServiceDue">Next Service Due (Date / km)</Label>
              <Input
                id="nextServiceDue"
                name="nextServiceDue"
                placeholder="e.g., 2025-01-15 / 60000 km"
                value={formData.nextServiceDue}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicianMechanicName">
                Technician / Mechanic Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="technicianMechanicName"
                name="technicianMechanicName"
                placeholder="Name of technician"
                value={formData.technicianMechanicName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceDescription">
              Service Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="serviceDescription"
              name="serviceDescription"
              placeholder="Detailed description of the service performed"
              value={formData.serviceDescription}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Any additional notes or observations"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Adding Record...
              </>
            ) : (
              "Add Service Record"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
