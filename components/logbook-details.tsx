"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LogbookData } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Car, Hash, Palette, Plus } from "lucide-react"
import { ServiceRecordForm } from "./service-record-form"
import { ServiceRecordsList } from "./service-records-list"

interface LogbookDetailsProps {
  data: LogbookData
  recordId: string
}

export function LogbookDetails({ data, recordId }: LogbookDetailsProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">Vehicle Logbook</CardTitle>
              <CardDescription className="mt-2">
                Record ID: <span className="font-mono font-semibold text-foreground">{recordId}</span>
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              Registered
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Identifier Number</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.identifierNumber}</p>
            </div>

                        <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Identifier Type</span>
              </div>
              <p className="text-base text-foreground">{data.identifierType}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Car className="h-4 w-4" />
                <span className="font-medium">Vehicle Type</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.vehicleType}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Car className="h-4 w-4" />
                <span className="font-medium">Body Type</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.bodyType}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Palette className="h-4 w-4" />
                <span className="font-medium">Colour</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.colour}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Registration Plate Number</span>
              </div>
              <p className="text-base font-mono text-foreground">{data.registrationPlateNumber}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Registration Expiry</span>
              </div>
              <p className="text-base text-foreground">{formatDate(data.registrationExpiry)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Year of Manufacture</span>
              </div>
              <p className="text-base text-foreground">{data.yearOfManufacture}</p>
            </div>



            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Car className="h-4 w-4" />
                <span className="font-medium">Make</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.make}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Car className="h-4 w-4" />
                <span className="font-medium">Model</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.model}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Engine Number</span>
              </div>
              <p className="text-base font-mono text-foreground">{data.engineNumber}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">State Vehicle Registered</span>
              </div>
              <p className="text-base text-foreground">{data.stateVehicleRegistered}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Year/Month of Compliance</span>
              </div>
              <p className="text-base text-foreground">{data.yearMonthCompliance}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Record Created</span>
              </div>
              <p className="text-base text-foreground">{formatDate(data.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            This is an official vehicle logbook record. All information is stored securely and can be accessed via the
            unique QR code.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Service Records</h2>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="gap-2"
            variant={showAddForm ? "outline" : "default"}
          >
            <Plus className="h-4 w-4" />
            {showAddForm ? "Cancel" : "Add Service Record"}
          </Button>
        </div>

        {showAddForm && <ServiceRecordForm recordId={recordId} onSuccess={() => setShowAddForm(false)} />}

        <ServiceRecordsList recordId={recordId} />
      </div>
    </div>
  )
}
