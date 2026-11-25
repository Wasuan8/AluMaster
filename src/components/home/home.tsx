"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Calculator, Layers, Scissors, FileText, WifiOff, Building2, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { features, faqs } from "@/constants/content";
import { Button } from "@/components/ui/button";
import { Pricing } from "@/components/pricing/pricing";

const icons = { calculator: Calculator, layers: Layers, scissors: Scissors, file: FileText, wifi: WifiOff, building: Building2 };
const screenshots = ["Login", "Dashboard", "Estimation", "History", "Settings", "PDF Preview"];

function Preview({ screen = "Dashboard" }: { screen?: string }) {
    return <div className="overflow-hidden rounded-2xl border bg-white text-slate-900 shadow-2xl shadow-slate-900/10">
        <div className="flex items-center justify-between border-b bg-slate-50 px-5 py-3 text-xs"><span className="font-semibold">▦ AluMaster</span><span className="text-slate-500">Product concept · {screen}</span></div>
        <div className="flex min-h-80">
            <div className="hidden w-36 shrink-0 space-y-5 border-r bg-slate-50 p-4 text-[11px] text-slate-500 sm:block">
                {["Overview", "Projects", "Estimation", "Team", "Settings"].map((x, i) => <div key={x} className={i === 0 ? "rounded-lg bg-sky-100 p-2 font-semibold text-sky-700" : "px-2"}>{x}</div>)}
            </div>
            <div className="min-w-0 flex-1 p-5">
                <p className="text-xs text-slate-500">YOUR WORKSPACE</p><h3 className="mt-1 text-xl font-bold">{screen === "Dashboard" ? "Good morning, Rajesh 👋" : screen}</h3>
                <div className="my-5 grid grid-cols-3 gap-2">
                    {[["Projects", "24"], ["Estimates", "₹4.8L"], ["Material saved", "12%"]].map(([label, value]) => <div key={label} className="rounded-xl border p-3"><p className="text-[10px] text-slate-500">{label}</p><p className="mt-1 text-lg font-bold">{value}</p></div>)}
                </div>
                <div className="flex items-center justify-between"><h4 className="text-sm font-semibold">Sunrise Residency</h4><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">In progress</span></div>
                <div className="mt-4 grid grid-cols-[1fr_1.4fr] gap-4">
                    <div className="relative flex h-32 items-center justify-center rounded-lg bg-slate-50">
                        <div className="grid h-24 w-20 grid-cols-2 border-[3px] border-slate-600 p-1"><div className="border-r-2 border-slate-500 bg-sky-100/70" /><div className="bg-sky-100/70" /></div>
                        <span className="absolute bottom-1 text-[9px] text-slate-500">1200 × 1500 mm</span>
                    </div>
                    <div className="space-y-3 py-2 text-[11px]">{[["Aluminium", "18.6 kg"], ["Glass area", "1.8 m²"], ["Hardware", "1 set"]].map(([a, b]) => <div key={a} className="flex justify-between border-b pb-2"><span className="text-slate-500">{a}</span><strong>{b}</strong></div>)}</div>
                </div>
                <p className="mt-3 text-[9px] text-slate-400">Illustrative values, not an engineering estimate.</p>
            </div>
        </div>
    </div>;
}

export function FAQ() {
    return <section className="section container max-w-4xl" id="faq">
        <div className="mb-10 text-center"><p className="eyebrow">A little more clarity</p><h2 className="section-title">Questions? We’ve got you.</h2></div>
        <div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="card group !p-5"><summary className="font-semibold">{question}</summary><p className="muted mt-3 text-sm leading-7">{answer}</p></details>)}</div>
    </section>;
}

export function Home() {
    const [slide, setSlide] = useState(0);
    return <>
        <section className="hero-grid relative overflow-hidden">
            <div className="pointer-events-none absolute -right-32 top-12 h-[550px] w-[550px] rounded-full bg-sky-400/10 blur-3xl" />
            <div className="container relative grid items-center gap-16 pb-16 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-28">
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <span className="badge"><span className="h-1.5 w-1.5 rounded-full bg-sky-500" /> Built for aluminium professionals</span>
                    <h1 className="mt-7 max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-6xl">Professional Aluminium Estimation <span className="text-sky-500">Made Simple.</span></h1>
                    <p className="muted mt-6 max-w-lg text-lg leading-8">Calculate material requirements, generate quotations, optimize cutting plans and manage projects in minutes.</p>
                    <div className="mt-8 flex flex-wrap gap-3"><Button asChild><Link href="/register">Start Free Trial <ArrowRight size={17} /></Link></Button><Button asChild variant="outline"><Link href="/pricing">View Pricing</Link></Button></div>
                    <div className="muted mt-5 flex flex-wrap gap-5 text-xs"><span className="flex items-center gap-1"><Check size={14} className="text-emerald-500" /> No card needed for demo</span><span className="flex items-center gap-1"><Check size={14} className="text-emerald-500" /> Free plan available</span></div>
                    <div className="mt-9 flex items-center gap-3 border-t pt-6"><ShieldCheck className="text-sky-500" size={24} /><p className="muted text-sm">Your workshop. Your workflow.<br /><span className="font-medium text-slate-800 dark:text-slate-200">One connected workspace.</span></p></div>
                </motion.div>
                <motion.div className="relative pb-10" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <Preview />
                    <motion.div className="card absolute -bottom-2 left-2 !flex items-center gap-3 !p-4 sm:-left-5" initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="rounded-xl bg-emerald-100 p-3 text-emerald-600"><FileText size={20} /></span><div><p className="text-sm font-bold">Quotation ready</p><p className="muted text-xs">A professional first impression.</p></div>
                    </motion.div>
                    <div className="absolute -right-2 -top-7 rounded-2xl border border-slate-700 bg-slate-900 p-3 text-white shadow-xl sm:right-3"><div className="mx-auto mb-2 h-1 w-6 rounded bg-slate-600" /><p className="text-[9px] text-sky-400">ALUMASTER MOBILE</p><p className="mt-2 text-xs font-bold">On site. In sync.</p><div className="mt-3 h-16 rounded bg-gradient-to-br from-sky-500/40 to-slate-800 p-2 text-[10px]">24 projects<br /><span className="text-emerald-400">✓ Ready to estimate</span></div></div>
                </motion.div>
            </div>
            <div className="border-y bg-white/60 py-6 dark:bg-slate-900/40"><div className="container flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-medium"><span className="muted text-xs uppercase tracking-widest">Made for your trade</span><span>Window specialists</span><span>Door fabricators</span><span>Independent mistris</span><span>Growing teams</span></div></div>
        </section>

        <section className="section container" id="features">
            <div className="mx-auto mb-12 max-w-2xl text-center"><p className="eyebrow">From measurements to momentum</p><h2 className="section-title">Everything your next<br className="hidden sm:block" /> project needs.</h2><p className="muted mt-4">A simpler way to plan materials, prepare quotations, and keep work moving.</p></div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([title, description, icon]) => {
                const Icon = icons[icon];
                return <motion.article key={title} whileHover={{ y: -4 }} className="card"><span className="inline-flex rounded-xl bg-sky-50 p-3 text-sky-500 dark:bg-sky-950"><Icon size={23} /></span><h3 className="mb-2 mt-5 text-lg font-semibold">{title}</h3><p className="muted text-sm leading-7">{description}</p></motion.article>;
            })}</div>
            <p className="muted mt-5 text-center text-xs">Feature descriptions represent the planned product. This website demonstrates the commercial and management flows.</p>
        </section>

        <section id="how-it-works" className="section border-y bg-slate-50 dark:bg-slate-900/40">
            <div className="container"><div className="mb-12 text-center"><p className="eyebrow">A better workflow</p><h2 className="section-title">Five steps. One professional result.</h2></div>
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-5">{["Create Project", "Add Window Dimensions", "Calculate Materials", "Generate PDF", "Share With Client"].map((step, i) => <motion.div key={step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative"><div className="mb-5 flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-200 bg-sky-50 font-bold text-sky-600 dark:border-sky-800 dark:bg-sky-950">0{i + 1}</span><span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" /></div><h3 className="font-semibold">{step}</h3></motion.div>)}</div>
            </div>
        </section>

        <section className="section container"><p className="eyebrow">Built around you</p><h2 className="section-title">Whatever your role,<br />make room for better work.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[
            ["Mistri", "Spend more time making.", "Access the project details you need and keep measurements organized."],
            ["Contractor", "Keep every project in view.", "Manage your team, prepare quotations, and coordinate the next job."],
            ["Fabricator", "Make every material count.", "Plan aluminium profiles, glass, and hardware before production begins."],
        ].map(([role, title, text]) => <article key={role} className="card"><p className="eyebrow">{role}</p><h3 className="mb-3 mt-5 text-xl font-bold">{title}</h3><p className="muted text-sm leading-7">{text}</p></article>)}</div></section>

        <section className="section border-y bg-sky-50/50 dark:bg-slate-900/40"><div className="container max-w-4xl"><div className="mb-9 text-center"><p className="eyebrow">Meet your new workspace</p><h2 className="section-title">Simple on the surface.<br />Powerful where it matters.</h2><p className="muted mt-3 text-sm">Illustrative interface concepts</p></div><div aria-live="polite"><Preview screen={screenshots[slide]} /></div><div className="mt-6 flex items-center justify-center gap-5"><Button variant="outline" aria-label="Previous preview" onClick={() => setSlide((slide + 5) % 6)}><ChevronLeft size={16} /></Button><span className="min-w-32 text-center text-sm">{screenshots[slide]} · {slide + 1}/6</span><Button variant="outline" aria-label="Next preview" onClick={() => setSlide((slide + 1) % 6)}><ChevronRight size={16} /></Button></div></div></section>

        <section className="section container"><div className="text-center"><p className="eyebrow">The experience we’re building</p><h2 className="section-title">Less admin. More craftsmanship.</h2><p className="muted mt-3 text-sm">Sample testimonials for layout demonstration — not customer endorsements.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[
            ["“Having measurements and quotations together would make my day much simpler.”", "Rajesh K.", "Sample contractor"],
            ["“A clear cutting plan is exactly the kind of tool our workshop needs.”", "Imran S.", "Sample fabricator"],
            ["“I want project details that are easy to read when I’m on site.”", "Mahesh P.", "Sample mistri"],
        ].map(([quote, name, role]) => <figure className="card" key={name}><div className="mb-5 text-amber-500" aria-label="Illustrative five-star rating">★★★★★</div><blockquote className="leading-7">{quote}</blockquote><figcaption className="mt-6 border-t pt-4 text-sm"><strong>{name}</strong><span className="muted block text-xs">{role}</span></figcaption></figure>)}</div></section>

        <Pricing preview />
        <FAQ />
        <section className="container pb-20"><div className="relative overflow-hidden rounded-3xl bg-slate-900 px-7 py-16 text-center text-white"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" /><p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Your next chapter starts here</p><h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Start Growing Your Aluminium Business Today</h2><p className="mt-5 text-slate-400">Start with a free workspace. Grow at your own pace.</p><Button asChild className="relative mt-8"><Link href="/register">Start Free Trial <ArrowRight size={16} /></Link></Button></div></section>
    </>;
}
