'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { Icons } from "@components/icons"

interface PaymentStatusProps {
    status: 'pending' | 'processing' | 'completed' | 'failed'
    onComplete?: () => void
}

const statusSteps = {
    pending: 0,
    processing: 50,
    completed: 100,
    failed: 100,
}

export function PaymentStatus({ status, onComplete }: PaymentStatusProps) {
    const [progress, setProgress] = useState(statusSteps[status])

    useEffect(() => {
        setProgress(statusSteps[status])
        if (status === 'completed' && onComplete) {
            onComplete()
        }
    }, [status, onComplete])

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                    <Progress value={progress} className="w-full" />
                    {status === 'processing' && (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    )}
                    {status === 'completed' && (
                        <Icons.check className="h-4 w-4 text-green-500" />
                    )}
                    {status === 'failed' && (
                        <Icons.error className="h-4 w-4 text-red-500" />
                    )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground text-center capitalize">
                    {status}
                </p>
            </CardContent>
        </Card>
    )
}