"use client"

import { useState, useEffect } from "react"
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { ServiceRecord } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Eye } from "lucide-react"
import { ServiceRecordModal } from "./service-record-modal"

interface ServiceRecordsListProps {
  recordId: string
}

export function ServiceRecordsList({ recordId }: ServiceRecordsListProps) {
  const [records, setRecords] = useState<ServiceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRecord, setSelectedRecord] = useState<ServiceRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecords()
  }, [recordId])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, "records"), where("recordId", "==", recordId))
      const querySnapshot = await getDocs(q)
      const fetchedRecords: ServiceRecord[] = []
      querySnapshot.forEach((doc) => {
        fetchedRecords.push({ id: doc.id, ...doc.data() } as ServiceRecord)
      })
      // Sort by date descending (newest first)
      fetchedRecords.sort((a, b) => new Date(b.serviceDate).getTime() - new Date(a.serviceDate).getTime())
      setRecords(fetchedRecords)
    } catch (err) {
      console.error("Error fetching records:", err)
      toast({
        title: "Error",
        description: "Failed to load service records",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (recordId: string) => {
    if (!confirm("Are you sure you want to delete this service record?")) return

    try {
      await deleteDoc(doc(db, "records", recordId))
      setRecords(records.filter((r) => r.id !== recordId))
      toast({
        title: "Success",
        description: "Service record deleted successfully",
      })
    } catch (err) {
      console.error("Error deleting record:", err)
      toast({
        title: "Error",
        description: "Failed to delete service record",
        variant: "destructive",
      })
    }
  }

  const handleViewDetails = (record: ServiceRecord) => {
    setSelectedRecord(record)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Spinner className="h-6 w-6" />
        </CardContent>
      </Card>
    )
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No service records yet. Add one to get started!
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{record.serviceType}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.serviceDate).toLocaleDateString()} • {record.technician}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(record)} className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(record.id)} className="gap-2">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedRecord && (
        <ServiceRecordModal
          record={selectedRecord}
          recordId={recordId}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedRecord(null)
          }}
          onUpdate={() => {
            fetchRecords()
            setIsModalOpen(false)
            setSelectedRecord(null)
          }}
        />
      )}
    </>
  )
}
