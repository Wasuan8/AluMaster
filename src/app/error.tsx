"use client";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
    return <section className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Something went wrong.</h1>
        <p className="muted my-5">Please try loading this page again.</p>
        <Button onClick={reset}>Try again</Button>
    </section>;
}
