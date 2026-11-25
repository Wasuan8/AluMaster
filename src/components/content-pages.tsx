"use client";

import Link from "next/link";
import { z } from "zod";
import { BookOpen, PlayCircle, MessageCircle, MapPin } from "lucide-react";
import { SmartForm } from "@/components/ui/form";
import { contactApi } from "@/services/api/contact";
import { FAQ } from "@/components/home/home";

export function Contact() {
    return <section className="section container"><p className="eyebrow">Let’s talk</p><h1 className="section-title">Good work starts<br />with a conversation.</h1><div className="mt-10 grid gap-10 lg:grid-cols-2"><div className="card"><SmartForm submitLabel="Submit demo message" fields={[
        { name: "name", label: "Name", rule: z.string().trim().min(2) },
        { name: "email", label: "Email", type: "email", rule: z.string().email() },
        { name: "phone", label: "Phone", type: "tel", rule: z.string().regex(/^\+?[\d\s-]{7,18}$/, "Enter a phone number.") },
        { name: "message", label: "Message", type: "textarea", rule: z.string().trim().min(10, "Please include at least 10 characters.").max(3000) },
    ]} onSubmit={async v => (await contactApi.send({ name: v.name, email: v.email, phone: v.phone, message: v.message })).message} /></div><div className="space-y-5"><div className="card"><h2 className="font-bold">Contact channels</h2><dl className="muted mt-5 space-y-4 text-sm"><div><dt className="font-semibold">WhatsApp</dt><dd>Business number to be configured</dd></div><div><dt className="font-semibold">Email</dt><dd>Support email to be configured</dd></div><div><dt className="font-semibold">Business address</dt><dd>Verified business address to be provided</dd></div></dl></div><div className="hero-grid flex min-h-60 flex-col items-center justify-center rounded-2xl border bg-slate-100 dark:bg-slate-900"><MapPin className="text-sky-500" size={34} /><p className="mt-3 font-semibold">Google Map placeholder</p><p className="muted mt-2 text-xs">Add the verified business location before launch.</p></div></div></div></section>;
}

export function Support() {
    return <><section className="section container"><div className="text-center"><p className="eyebrow">A little help goes a long way</p><h1 className="section-title">How can we help?</h1></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[
        [BookOpen, "Documentation", "Get familiar with your workspace.", "#documentation"],
        [PlayCircle, "Tutorials", "Follow a simple walkthrough.", "#tutorials"],
        [MessageCircle, "Contact support", "Share your question with us.", "/contact"],
    ].map(([Icon, title, description, href]) => { const Component = Icon as typeof BookOpen; return <Link key={String(title)} href={String(href)} className="card transition hover:border-sky-500"><Component className="text-sky-500" /><h2 className="mt-5 font-bold">{String(title)}</h2><p className="muted mt-2 text-sm">{String(description)}</p></Link>; })}</div>
        <article id="documentation" className="card mt-10"><h2 className="text-xl font-bold">Documentation: your first project</h2><ol className="muted mt-5 list-inside list-decimal space-y-3 text-sm"><li>Start a demo session using a phone number and code 123456.</li><li>Open Projects and choose New project.</li><li>Add a name, client, and window count.</li><li>Use Pricing to simulate an upgrade.</li><li>On Contractor, open Team Members to create pending invitations.</li></ol></article>
        <article id="tutorials" className="card mt-5"><h2 className="text-xl font-bold">Tutorial: choose the right plan</h2><p className="muted mt-4 text-sm leading-7">Start with Free to explore up to five projects. Choose Pro to remove the project limit. Choose Contractor to try team invitation management. Open Subscription to review your demo renewal date, and Billing to see simulated purchase records.</p></article>
    </section><FAQ /></>;
}

export function About() {
    return <section className="section container max-w-5xl"><p className="eyebrow">Our mission</p><h1 className="mt-5 max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">Digitizing India’s<br /><span className="text-sky-500">Aluminium Industry.</span></h1><div className="mt-10 grid gap-8 md:grid-cols-2"><p className="muted text-lg leading-9">Aluminium professionals turn measurements into spaces people live and work in. Their tools should make the business behind that craftsmanship easier.</p><p className="muted text-lg leading-9">AluMaster’s vision brings estimation, material planning, quotations, and team coordination into a clear, approachable workspace — from an independent mistri to a growing fabrication company.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[["Clarity", "Make project information easy to understand."], ["Craftsmanship", " professionals work."], ["Growth", "Help businesses build repeatable processes."]].map(([title, text]) => <div className="card" key={title}><h2 className="font-bold">{title}</h2><p className="muted mt-3 text-sm leading-7">{text}</p></div>)}</div><p className="muted mt-10 text-sm">Company history, founding team, and verified business details should be added before publication.</p></section>;
}

export function Legal({ kind }: { kind: "privacy" | "terms" }) {
    const privacy = kind === "privacy";
    const sections = privacy ? [
        ["Data collection", "This prototype stores demo account, project, team, profile, and subscription records in this browser’s local storage. Demo OTP challenges use session storage. The contact form does not transmit its contents."],
        ["Use of information", "Local records support the interactive demonstration. Hosting providers may process technical request information; the production policy must identify the actual providers and their practices."],
        ["User rights and retention", "You can remove local demo records by clearing this site’s browser storage. Production access, correction, deletion, retention, and complaint processes must be documented after the responsible business and data flows are confirmed."],
        ["Cookies and analytics", "This prototype uses browser storage for the theme and demo workspace. No analytics integration is included. Document any additional cookies, analytics, and consent requirements before adding those services."],
        ["Subscriptions and refunds", "Checkout is simulated. No payments are taken, and there are no demo charges to refund. Production billing, cancellation, renewal, tax, and refund terms remain to be defined."],
        ["Contact information", "The responsible business entity, verified address, and privacy contact have not been provided. Add these details before publishing a production policy."],
    ] : [
        ["Service scope", "AluMaster in this project is an interactive demonstration of a proposed SaaS product. It does not provide live payments, real identity verification, engineering calculations, or production PDF generation."],
        ["Accounts and access", "Demo access uses a fixed verification code and browser records. It is not a secure authentication system. Production account eligibility, responsibilities, and role enforcement must be specified."],
        ["Acceptable use", "Use this demonstration for evaluating the interface and workflows. Do not enter confidential client information or rely on sample measurements for fabrication."],
        ["Plans and billing", "Listed plans illustrate the proposed commercial offer. Annual pricing applies the displayed 20% discount. Demo checkout does not create a paid contract or automatic renewal."],
        ["Cancellation and refunds", "No money is collected in this demonstration. A production cancellation and refund policy has not been selected and must be added before live purchases are enabled."],
        ["Accuracy and responsibility", "Sample material quantities and interface previews are illustrative. Production estimates must be validated against the actual profiles, dimensions, fabrication requirements, and supplier specifications."],
        ["Business and legal details", "The contracting entity, applicable jurisdiction, dispute process, liability provisions, and support channels require business decisions and legal review before publication."],
    ];
    return <section className="section container max-w-5xl"><p className="eyebrow">Legal information</p><h1 className="section-title">{privacy ? "Privacy Policy" : "Terms & Conditions"}</h1><p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">Draft for this prototype. This page describes demo behavior and is not a completed production legal document.</p><div className="mt-10 grid gap-10 md:grid-cols-[210px_1fr]"><nav aria-label="Page contents" className="muted space-y-3 text-sm">{sections.map(([title], i) => <a key={title} href={"#legal-" + i} className="block">{i + 1}. {title}</a>)}</nav><div className="space-y-9">{sections.map(([title, text], i) => <article id={"legal-" + i} key={title}><h2 className="text-xl font-bold">{i + 1}. {title}</h2><p className="muted mt-3 leading-8">{text}</p></article>)}</div></div></section>;
}
