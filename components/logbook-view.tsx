"use client"

import { useEffect, useState } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { LogbookData } from "@/lib/types"
import { LogbookForm } from "./logbook-form"
import { LogbookDetails } from "./logbook-details"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface LogbookViewProps {
  recordId: string
}

export function LogbookView({ recordId }: LogbookViewProps) {
  const [loading, setLoading] = useState(true)
  const [logbookData, setLogbookData] = useState<LogbookData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogbook = async () => {
      try {
        const docRef = doc(db, "logbooks", recordId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setLogbookData(docSnap.data() as LogbookData)
        }
      } catch (err) {
        setError("Failed to load logbook data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogbook()
  }, [recordId])

  const handleSubmit = async (data: Omit<LogbookData, "createdAt">) => {
    try {
      const docRef = doc(db, "logbooks", recordId)
      const newData: LogbookData = {
        ...data,
        createdAt: new Date().toISOString(),
      }

      await setDoc(docRef, newData)
      setLogbookData(newData)
      return true
    } catch (err) {
      console.error("Error saving logbook:", err)
      return false
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <Spinner className="h-8 w-8" />
            <p className="text-muted-foreground">Loading logbook data...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {logbookData ? (
            <LogbookDetails data={logbookData} recordId={recordId} />
          ) : (
            <LogbookForm recordId={recordId} onSubmit={handleSubmit} />
          )}
        </div>
      </main>
    </div>
  )
}
