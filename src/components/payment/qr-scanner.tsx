'use client'

import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import { Icons } from "@components/icons"

interface QRScannerProps {
    onScan: (data: string) => void
}

export function QRScanner({ onScan }: QRScannerProps) {
    const [open, setOpen] = useState(false)

    const handleScan = (result: any) => {
        if (result) {
            onScan(result?.text)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Icons.scan className="mr-2 h-4 w-4" />
                    Scan QR Code
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Scan Payment QR Code</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <QrReader
                        onResult={handleScan}
                        constraints={{ facingMode: 'environment' }}
                        className="w-full"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}