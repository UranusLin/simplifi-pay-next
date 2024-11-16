import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    The Future of Payments is Here
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Secure, private, and seamless crypto payments for everyone. Built with privacy and compliance in mind.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link href="/login">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <a href="https://docs.simplifi-pay.com" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="lg">Documentation</Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
  )
}