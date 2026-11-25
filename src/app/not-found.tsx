import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return <section className="container py-24 text-center">
        <p className="eyebrow">404</p><h1 className="section-title">This page isn’t in the plan.</h1>
        <p className="muted my-6">Let’s get you back to your workspace.</p>
        <Button asChild><Link href="/">Back to home</Link></Button>
    </section>;
}
