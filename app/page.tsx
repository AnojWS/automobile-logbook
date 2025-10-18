import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, QrCode, Shield, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Automobile Logbook System</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground text-balance">Digital Vehicle Registration Management</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Secure, efficient, and modern vehicle logbook system powered by QR code technology. Each vehicle record is
              accessible via a unique QR code for instant verification.
            </p>
            <div className="pt-4">
              <Link href="/admin">
                <Button size="lg" className="gap-2">
                  <QrCode className="h-5 w-5" />
                  Admin: Generate QR Code
                </Button>
              </Link>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <QrCode className="h-10 w-10 text-primary mb-2" />
                <CardTitle>QR Code Access</CardTitle>
                <CardDescription>
                  Each vehicle record has a unique QR code for instant access and verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Storage</CardTitle>
                <CardDescription>
                  All vehicle data is securely stored in Firebase Firestore with real-time access
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Complete Records</CardTitle>
                <CardDescription>
                  Store comprehensive vehicle information including registration, owner, and technical details
                </CardDescription>
              </CardHeader>
            </Card>
          </section>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Generate QR Code</h3>
                  <p className="text-muted-foreground">Admin creates a unique QR code for each vehicle logbook entry</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Scan & Register</h3>
                  <p className="text-muted-foreground">
                    Scan the QR code to access the registration form and enter vehicle details
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">View Records</h3>
                  <p className="text-muted-foreground">
                    Once registered, the QR code provides instant access to the complete vehicle record
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
