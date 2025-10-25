"use client"

import type React from "react"

import { useState } from "react"
import type { ServiceRecord } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { X } from "lucide-react"

interface ServiceRecordModalProps {
  record: ServiceRecord
  recordId: string
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

export function ServiceRecordModal({ record, recordId, isOpen, onClose, onUpdate }: ServiceRecordModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    serviceType: record.serviceType,
    description: record.description,
    serviceDate: record.serviceDate,
    cost: record.cost,
    technician: record.technician,
    notes: record.notes || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = async () => {
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
      const docRef = doc(db, "records", record.id)
      await updateDoc(docRef, {
        serviceType: formData.serviceType,
        description: formData.description,
        serviceDate: formData.serviceDate,
        cost: formData.cost,
        technician: formData.technician,
        notes: formData.notes,
      })

      toast({
        title: "Success",
        description: "Service record updated successfully",
      })

      setIsEditing(false)
      onUpdate()
    } catch (err) {
      console.error("Error updating record:", err)
      toast({
        title: "Error",
        description: "Failed to update service record",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{isEditing ? "Edit Service Record" : "Service Record Details"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Input id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceDate">Service Date</Label>
                  <Input
                    id="serviceDate"
                    name="serviceDate"
                    type="date"
                    value={formData.serviceDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technician">Technician Name</Label>
                  <Input id="technician" name="technician" value={formData.technician} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Cost</Label>
                  <Input id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave} disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4 mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-semibold text-foreground">{record.serviceType}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Service Date</p>
                  <p className="font-semibold text-foreground">{new Date(record.serviceDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Technician</p>
                  <p className="font-semibold text-foreground">{record.technician}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Cost</p>
                  <p className="font-semibold text-foreground">{record.cost || "N/A"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-foreground whitespace-pre-wrap">{record.description}</p>
              </div>

              {record.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Additional Notes</p>
                  <p className="text-foreground whitespace-pre-wrap">{record.notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  Edit Record
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Close
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
