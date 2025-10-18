import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LogbookData } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Calendar, Car, Hash, Palette, User } from "lucide-react"

interface LogbookDetailsProps {
  data: LogbookData
  recordId: string
}

export function LogbookDetails({ data, recordId }: LogbookDetailsProps) {
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
                <span className="font-medium">Vehicle Number</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.vehicleNumber}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <User className="h-4 w-4" />
                <span className="font-medium">Owner Name</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.ownerName}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Hash className="h-4 w-4" />
                <span className="font-medium">Chassis Number</span>
              </div>
              <p className="text-base font-mono text-foreground">{data.chassisNumber}</p>
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
                <Car className="h-4 w-4" />
                <span className="font-medium">Model / Make</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.model}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Palette className="h-4 w-4" />
                <span className="font-medium">Color</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{data.color}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Date of Registration</span>
              </div>
              <p className="text-base text-foreground">{formatDate(data.dateOfRegistration)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Record Created</span>
              </div>
              <p className="text-base text-foreground">{formatDate(data.createdAt)}</p>
            </div>
          </div>

          {data.remarks && (
            <div className="mt-6 pt-6 border-t border-border space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Remarks</p>
              <p className="text-base text-foreground leading-relaxed">{data.remarks}</p>
            </div>
          )}
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
    </div>
  )
}
