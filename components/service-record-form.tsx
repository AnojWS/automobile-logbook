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
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface ServiceRecordFormProps {
  recordId: string
  onSuccess: () => void
}

export function ServiceRecordForm({ recordId, onSuccess }: ServiceRecordFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
    serviceDate: "",
    cost: "",
    technician: "",
    notes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.serviceType || !formData.description || !formData.serviceDate || !formData.technician) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await addDoc(collection(db, "records"), {
        recordId,
        serviceType: formData.serviceType,
        description: formData.description,
        serviceDate: formData.serviceDate,
        cost: formData.cost,
        technician: formData.technician,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      })

      toast({
        title: "Success",
        description: "Service record added successfully",
      })

      setFormData({
        serviceType: "",
        description: "",
        serviceDate: "",
        cost: "",
        technician: "",
        notes: "",
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
              <Label htmlFor="serviceType">
                Service Type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="serviceType"
                name="serviceType"
                placeholder="e.g., Oil Change, Tire Rotation"
                value={formData.serviceType}
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
              <Label htmlFor="technician">
                Technician Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="technician"
                name="technician"
                placeholder="Name of technician"
                value={formData.technician}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost (Optional)</Label>
              <Input id="cost" name="cost" placeholder="e.g., $50.00" value={formData.cost} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed description of the service performed"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes or observations"
              value={formData.notes}
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
