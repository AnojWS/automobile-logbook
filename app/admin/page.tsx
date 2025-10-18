'use client';

import { useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Copy, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [recordId, setRecordId] = useState<string>('');
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const { toast } = useToast();

  const generateQRCode = () => {
    const newRecordId = `VEH-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`;
    setRecordId(newRecordId);

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const url = `${baseUrl}/logbook/${newRecordId}`;
    setGeneratedUrl(url);

    toast({
      title: 'QR Code Generated',
      description: 'Your unique vehicle logbook QR code is ready',
    });
  };

  const copyToClipboard = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(generatedUrl);
      toast({
        title: 'Link Copied',
        description: 'The logbook URL has been copied to your clipboard',
      });
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = generatedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      toast({
        title: 'Copied (Fallback)',
        description: 'Clipboard API unavailable — used fallback method',
      });
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `logbook-${recordId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast({
        title: 'QR Code Downloaded',
        description: 'The QR code has been saved to your device',
      });
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

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
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              QR Code Generator
            </h1>
            <p className="text-muted-foreground">
              Generate unique QR codes for vehicle logbook entries
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generate New QR Code</CardTitle>
              <CardDescription>
                Create a unique identifier and QR code for a new vehicle logbook
                entry
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={generateQRCode}
                className="w-full gap-2"
                size="lg"
              >
                <RefreshCw className="h-5 w-5" />
                Generate QR Code
              </Button>

              {recordId && (
                <div className="space-y-6 pt-4 border-t border-border">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-card p-6 rounded-lg border-2 border-border">
                      <QRCodeSVG
                        id="qr-code-svg"
                        value={generatedUrl}
                        size={256}
                        level="H"
                        includeMargin
                      />
                    </div>

                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        Record ID
                      </p>
                      <p className="text-lg font-mono font-bold text-primary">
                        {recordId}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-2">
                        Logbook URL
                      </p>
                      <p className="text-sm text-muted-foreground break-all font-mono">
                        {generatedUrl}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="flex-1 gap-2 bg-transparent"
                      >
                        <Copy className="h-4 w-4" />
                        Copy Link
                      </Button>
                      <Button
                        onClick={downloadQRCode}
                        variant="outline"
                        className="flex-1 gap-2 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                        Download QR
                      </Button>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-accent-foreground">
                      <strong className="text-accent">{'Next Step:'}</strong>{' '}
                      <span className=" text-slate-700">
                      Share this QR code or URL. When scanned, users will be
                      able to register the vehicle details or view existing
                      records.</span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
