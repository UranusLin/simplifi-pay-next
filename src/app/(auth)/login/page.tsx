'use client'

import { useWeb3Auth } from '@/providers/web3auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const { login, isLoading, isAuthenticated } = useWeb3Auth()
    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }, [isAuthenticated, router])

    return (
        <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-primary" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Icons.logo className="mr-2 h-6 w-6" />
                    SimpliFi Pay
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &quot;The future of payments is here - secure, private, and seamless.&quot;
                        </p>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Card className="border-none shadow-none">
                        <CardHeader>
                            <CardTitle>Welcome back</CardTitle>
                            <CardDescription>
                                Sign in with your account to continue
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="outline"
                                onClick={login}
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Icons.google className="mr-2 h-4 w-4" />
                                )}
                                Continue with Google
                            </Button>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Notice
                  </span>
                                </div>
                            </div>
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <a href="#" className="underline underline-offset-4 hover:text-primary">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="underline underline-offset-4 hover:text-primary">
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}