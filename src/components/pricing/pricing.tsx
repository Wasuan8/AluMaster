"use client";

import React, { useState, Fragment } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    ArrowRight,
    Sparkles,
    Zap,
    ShieldCheck,
    Scissors,
    FileText,
    Users,
    Layers,
    Wifi,
    Building2,
    Calculator,
    ChevronDown,
    TrendingUp,
    Clock,
    Coins,
    Sliders,
    CheckCircle2,
    PhoneCall,
    Award,
    HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
    plans,
    facilitiesDetailed,
    howItWorksSteps,
    comparisonFeatures,
    faqs,
} from "@/constants/content";
import { money } from "@/lib/utils";
import type { Cycle, PlanId } from "@/types";
import { authApi } from "@/services/api/auth";
import { subscriptionApi } from "@/services/api/subscription";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

const facilityIcons = {
    scissors: Scissors,
    file: FileText,
    users: Users,
    layers: Layers,
    calculator: Calculator,
    wifi: Wifi,
    building: Building2,
};

export function Pricing({ preview = false }: { preview?: boolean }) {
    const [cycle, setCycle] = useState<Cycle>("monthly");
    const [selected, setSelected] = useState<PlanId | null>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [activeFacilityTab, setActiveFacilityTab] = useState<string>("all");
    const [monthlyKg, setMonthlyKg] = useState<number>(800);

    const router = useRouter();
    const plan = plans.find((p) => p.id === selected);

    async function choose(id: PlanId) {
        setError("");
        if (!(await authApi.me())) {
            router.push("/register?plan=" + id + "&cycle=" + cycle);
            return;
        }
        setSelected(id);
    }

    // Interactive ROI Calculations
    const aluminiumPricePerKg = 265; // average price in INR
    const scrapSavedPct = 0.13; // ~13% average scrap saved by FFD algorithm
    const scrapKgSaved = Math.round(monthlyKg * scrapSavedPct);
    const monthlyScrapRupeesSaved = scrapKgSaved * aluminiumPricePerKg;
    const hoursSavedPerMonth = Math.round((monthlyKg / 100) * 2.5); // ~2.5 hrs saved per 100kg
    const proCostMonthly = cycle === "yearly" ? 399 : 499;
    const netMonthlyProfit = monthlyScrapRupeesSaved - proCostMonthly;
    const roiMultiplier = Math.max(1, Math.round(monthlyScrapRupeesSaved / proCostMonthly));

    return (
        <section className="section container relative" id="pricing">
            {/* Background Ambient Glows */}
            <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-96 w-[700px] rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/5" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-14 max-w-3xl text-center"
            >
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                    <Sparkles size={14} className="animate-pulse text-sky-500" />
                    <span>Transparent, Fabricator-First Pricing</span>
                </div>

                {preview ? (
                    <h2 className="section-title text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
                        Simple Plans. <span className="text-sky-500">Massive Savings.</span>
                    </h2>
                ) : (
                    <h1 className="section-title text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
                        The Right Tools.<br />
                        <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300">
                            At The Right Price.
                        </span>
                    </h1>
                )}

                <p className="muted mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
                    Slash aluminium scrap offcuts by up to 18%, generate professional client quotations in 60 seconds, and streamline workshop mistri cut-lists.
                </p>

                {/* Animated Billing Toggle */}
                <div className="mt-8 inline-flex items-center rounded-full border border-slate-200/90 bg-white/90 p-1.5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
                    {(["monthly", "yearly"] as const).map((value) => {
                        const active = cycle === value;
                        return (
                            <button
                                key={value}
                                aria-pressed={active}
                                onClick={() => setCycle(value)}
                                className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                                    active
                                        ? "text-white dark:text-slate-900"
                                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                            >
                                {active && (
                                    <motion.div
                                        layoutId="billingPill"
                                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                                        className="absolute inset-0 rounded-full bg-slate-900 shadow-md dark:bg-white"
                                    />
                                )}
                                <span className="relative z-10 capitalize">
                                    {value === "monthly" ? "Monthly Billing" : "Annual Billing"}
                                </span>
                            </button>
                        );
                    })}

                    <span className="ml-1 mr-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                        <Zap size={12} className="fill-current" /> Save 20% + 2 Mo Free
                    </span>
                </div>
            </motion.div>

            {/* Pricing Cards Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
                {plans.map((item, index) => {
                    const isPro = item.id === "pro";
                    const isContractor = item.id === "contractor";
                    const effectiveMonthlyPrice = cycle === "yearly" ? item.price * 0.8 : item.price;
                    const annualTotal = item.price * 12 * 0.8;

                    return (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.12 }}
                            whileHover={{ y: -6 }}
                            className={`card relative flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                                isPro
                                    ? "!border-sky-500/90 ring-2 ring-sky-500 shadow-2xl shadow-sky-500/15 dark:ring-sky-400"
                                    : "hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                        >
                            {/* Pro Spotlight Banner */}
                            {isPro && (
                                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-sky-500 to-blue-600 px-12 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-md">
                                    POPULAR
                                </div>
                            )}

                            <div>
                                {/* Card Header */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="badge text-[11px] font-bold">
                                            {item.badge}
                                        </span>
                                        <h3 className="mt-2.5 text-2xl font-black tracking-tight">{item.name}</h3>
                                    </div>
                                    <div className="rounded-2xl bg-sky-50 p-3 text-sky-600 dark:bg-sky-950/80 dark:text-sky-400">
                                        {item.id === "free" ? (
                                            <Award size={24} />
                                        ) : isPro ? (
                                            <Zap size={24} />
                                        ) : (
                                            <Users size={24} />
                                        )}
                                    </div>
                                </div>

                                <p className="muted mt-3 text-xs font-medium leading-relaxed">
                                    {item.tagline}
                                </p>

                                {/* Price Box */}
                                <div className="my-6 rounded-2xl bg-slate-50/90 p-4 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                                            {money(effectiveMonthlyPrice)}
                                        </span>
                                        <span className="muted text-sm font-semibold">/ month</span>
                                    </div>

                                    <p className="muted mt-2 text-xs font-medium">
                                        {item.price === 0
                                            ? "Free forever · No credit card required"
                                            : cycle === "yearly"
                                            ? `${money(annualTotal)} billed annually (Save ₹${money(item.price * 12 * 0.2).replace("₹", "")})`
                                            : "Billed monthly · Cancel anytime"}
                                    </p>
                                </div>

                                {/* Ideal For Callout */}
                                <div className="mb-6 rounded-xl border border-dashed border-slate-200 bg-white/50 p-3 text-xs dark:border-slate-800 dark:bg-slate-900/50">
                                    <span className="font-semibold text-sky-600 dark:text-sky-400">Ideal for: </span>
                                    <span className="muted">{item.idealFor}</span>
                                </div>

                                {/* Feature List */}
                                <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                                        What's Included:
                                    </p>
                                    <ul className="space-y-3">
                                        {item.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm">
                                                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                                    <Check size={11} strokeWidth={3} />
                                                </div>
                                                <span className="text-slate-700 dark:text-slate-300 font-medium">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-8 pt-4">
                                <Button
                                    variant={isPro ? "default" : "outline"}
                                    className={`w-full py-6 text-sm font-bold shadow-md transition-transform active:scale-[0.98] ${
                                        isPro
                                            ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                                            : ""
                                    }`}
                                    onClick={() => void choose(item.id)}
                                >
                                    {item.id === "free"
                                        ? "Get Started Free"
                                        : isPro
                                        ? "Upgrade to Pro"
                                        : "Choose Contractor"}
                                    <ArrowRight size={16} />
                                </Button>
                            </div>
                        </motion.article>
                    );
                })}
            </div>

            {/* Enterprise Tier Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="card mt-10 relative overflow-hidden !p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 !text-white border-slate-800"
            >
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-bold text-sky-300 border border-sky-500/30 mb-3">
                            <Building2 size={13} /> LARGE FACTORIES & ALUMINIUM EXTRUSION DISTRIBUTORS
                        </div>
                        <h3 className="text-2xl font-bold">Enterprise & Custom Integrations</h3>
                        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                            Need custom CNC saw cut-file exports, ERP / Tally accounting integration, multi-branch factory licenses, or dedicated on-site staff training? We create custom plans for high-scale glazing contractors.
                        </p>
                    </div>
                    <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                        <Button asChild className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6">
                            <Link href="/contact">Talk to Enterprise Sales <ArrowRight size={16} /></Link>
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* If in Home Preview mode, show link to full pricing */}
            {preview ? (
                <div className="mt-12 text-center">
                    <Button asChild variant="outline" className="px-8 py-6 text-sm font-bold">
                        <Link href="/pricing">
                            View Detailed Features & Facilities Breakdown <ArrowRight size={16} />
                        </Link>
                    </Button>
                </div>
            ) : (
                <>
                    {/* SECTION: Interactive Scrap & Profit ROI Calculator */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-20 rounded-3xl border border-sky-100 bg-gradient-to-b from-sky-50/60 to-white/90 p-8 sm:p-10 shadow-lg backdrop-blur-md dark:border-sky-950 dark:from-slate-900 dark:to-slate-950"
                    >
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                <TrendingUp size={14} /> Interactive ROI Calculator
                            </div>
                            <h2 className="section-title mt-3 text-3xl sm:text-4xl">
                                See How Much Money AluMaster Saves Your Workshop
                            </h2>
                            <p className="muted mt-2 text-sm sm:text-base">
                                Drag the slider to your monthly aluminium fabrication volume and discover your estimated raw material scrap savings.
                            </p>
                        </div>

                        {/* Slider Controller */}
                        <div className="mx-auto mt-8 max-w-2xl">
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="volume-slider" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Monthly Aluminium Consumption:
                                </label>
                                <span className="rounded-xl bg-sky-500 px-3 py-1 text-sm font-extrabold text-white">
                                    {monthlyKg} kg / month
                                </span>
                            </div>
                            <input
                                id="volume-slider"
                                type="range"
                                min={200}
                                max={3000}
                                step={50}
                                value={monthlyKg}
                                onChange={(e) => setMonthlyKg(Number(e.target.value))}
                                className="h-3 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-sky-500 dark:bg-slate-800"
                            />
                            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                                <span>200 kg (Small jobs)</span>
                                <span>1,500 kg (Active workshop)</span>
                                <span>3,000+ kg (Commercial team)</span>
                            </div>
                        </div>

                        {/* Metrics Cards */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="card !bg-white/90 p-5 text-center dark:!bg-slate-900 border-slate-200 dark:border-slate-800">
                                <span className="inline-flex p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 mb-2">
                                    <Scissors size={20} />
                                </span>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Scrap Aluminium Saved</p>
                                <p className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                                    ~{scrapKgSaved} kg
                                </p>
                                <p className="muted mt-1 text-[11px]">Via First-Fit linear cut optimizer</p>
                            </div>

                            <div className="card !bg-white/90 p-5 text-center dark:!bg-slate-900 border-slate-200 dark:border-slate-800">
                                <span className="inline-flex p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-2">
                                    <Coins size={20} />
                                </span>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Estimated Material Cost Saved</p>
                                <p className="mt-1 text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                    ₹{monthlyScrapRupeesSaved.toLocaleString("en-IN")}
                                </p>
                                <p className="muted mt-1 text-[11px]">Calculated @ ₹{aluminiumPricePerKg}/kg profile rate</p>
                            </div>

                            <div className="card !bg-white/90 p-5 text-center dark:!bg-slate-900 border-slate-200 dark:border-slate-800">
                                <span className="inline-flex p-2 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 mb-2">
                                    <Clock size={20} />
                                </span>
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Mistri & Calc Time Saved</p>
                                <p className="mt-1 text-2xl sm:text-3xl font-black text-sky-600 dark:text-sky-400">
                                    ~{hoursSavedPerMonth} hours
                                </p>
                                <p className="muted mt-1 text-[11px]">Instant automated BOM & cutting lists</p>
                            </div>
                        </div>

                        {/* Bottom Summary Callout */}
                        <div className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 p-4 text-center text-white shadow-md">
                            <p className="text-sm font-bold">
                                💡 At {monthlyKg} kg/mo, AluMaster delivers a <span className="underline font-black">{roiMultiplier}x Return on Investment</span> compared to the ₹{proCostMonthly}/mo Pro subscription!
                            </p>
                        </div>
                    </motion.div>

                    {/* SECTION: How It Works Visual Step Pipeline */}
                    <section className="mt-24">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <p className="eyebrow">Seamless 4-Step Workflow</p>
                            <h2 className="section-title">How AluMaster Works in Your Workshop</h2>
                            <p className="muted mt-3 text-sm sm:text-base">
                                From on-site window measurements to client quotation and workshop cutting dispatch in under 3 minutes.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {howItWorksSteps.map((step, idx) => {
                                const IconComponent = facilityIcons[step.icon as keyof typeof facilityIcons] || Calculator;
                                return (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        whileHover={{ y: -4 }}
                                        className="card relative flex flex-col justify-between !p-6"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 font-black text-sky-600 dark:bg-sky-950 dark:text-sky-400 text-sm">
                                                    {step.step}
                                                </span>
                                                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    <IconComponent size={20} />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {step.title}
                                            </h3>
                                            <p className="muted mt-2 text-xs leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* SECTION: Deep-Dive Facilities & Capabilities */}
                    <section className="mt-24">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <p className="eyebrow">Workshop Facilities Provided</p>
                            <h2 className="section-title">Engineered Specifically for Aluminium Fabricators</h2>
                            <p className="muted mt-3 text-sm sm:text-base">
                                Unlike generic accounting software, AluMaster understands profile dies, bar lengths, glass deductions, and workshop mistri workflows.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {facilitiesDetailed.map((facility, idx) => {
                                const Icon = facilityIcons[facility.icon as keyof typeof facilityIcons] || Calculator;
                                return (
                                    <motion.div
                                        key={facility.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                                        whileHover={{ y: -5 }}
                                        className="card flex flex-col justify-between !p-6 hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="rounded-2xl bg-sky-100/70 p-3 text-sky-600 dark:bg-sky-950/80 dark:text-sky-400">
                                                    <Icon size={24} />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-full">
                                                    {facility.tag}
                                                </span>
                                            </div>

                                            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                                                {facility.title}
                                            </h3>
                                            <p className="muted mt-2 text-xs leading-relaxed">
                                                {facility.description}
                                            </p>

                                            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                                                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Highlights:</p>
                                                <ul className="space-y-2">
                                                    {facility.benefits.map((benefit, bIdx) => (
                                                        <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                                                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>

                    {/* SECTION: Comprehensive Feature Comparison Matrix */}
                    <section className="mt-24">
                        <div className="mx-auto mb-10 max-w-2xl text-center">
                            <p className="eyebrow">Detailed Plan Comparison</p>
                            <h2 className="section-title">Compare All Features & Facilities</h2>
                            <p className="muted mt-3 text-sm">
                                Complete side-by-side comparison across all tiers.
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[650px] text-left text-sm">
                                    <thead>
                                        <tr className="border-b bg-slate-50/90 dark:bg-slate-950/70">
                                            <th className="p-5 font-bold text-slate-900 dark:text-white w-2/5">
                                                Feature / Capability
                                            </th>
                                            <th className="p-5 font-bold text-slate-700 dark:text-slate-300 text-center w-1/5">
                                                Free Starter
                                            </th>
                                            <th className="p-5 font-bold text-sky-600 dark:text-sky-400 text-center w-1/5 bg-sky-50/50 dark:bg-sky-950/30">
                                                Pro Fabricator
                                            </th>
                                            <th className="p-5 font-bold text-slate-700 dark:text-slate-300 text-center w-1/5">
                                                Contractor Team
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonFeatures.map((cat, catIdx) => (
                                            <React.Fragment key={cat.category}>
                                                <tr className="border-t bg-slate-100/70 dark:bg-slate-800/60">
                                                    <td
                                                        colSpan={4}
                                                        className="px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300"
                                                    >
                                                        {cat.category}
                                                    </td>
                                                </tr>
                                                {cat.items.map((row, rowIdx) => (
                                                    <tr
                                                        key={row.name}
                                                        className="border-t border-slate-100 hover:bg-slate-50/50 dark:border-slate-800/60 dark:hover:bg-slate-800/30 transition-colors"
                                                    >
                                                        <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                                                            {row.name}
                                                        </td>
                                                        <td className="p-4 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                                                            {row.free === "Included" ? (
                                                                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold dark:text-emerald-400">
                                                                    <Check size={16} /> Yes
                                                                </span>
                                                            ) : row.free === "—" ? (
                                                                <span className="text-slate-300 dark:text-slate-700">—</span>
                                                            ) : (
                                                                row.free
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-center text-xs font-medium text-slate-800 dark:text-slate-200 bg-sky-50/30 dark:bg-sky-950/20">
                                                            {row.pro.includes("Included") ? (
                                                                <span className="inline-flex items-center gap-1 text-sky-600 font-bold dark:text-sky-400">
                                                                    <Check size={16} /> {row.pro}
                                                                </span>
                                                            ) : (
                                                                row.pro
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-center text-xs font-medium text-slate-800 dark:text-slate-200">
                                                            {row.contractor.includes("Included") ? (
                                                                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold dark:text-emerald-400">
                                                                    <Check size={16} /> {row.contractor}
                                                                </span>
                                                            ) : (
                                                                row.contractor
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* SECTION: Trust & Guarantee Bar */}
                    <div className="mt-14 grid gap-4 sm:grid-cols-3">
                        <div className="card !p-4 flex items-center gap-3 text-left">
                            <ShieldCheck className="text-sky-500 shrink-0" size={24} />
                            <div>
                                <p className="text-xs font-bold">100% Confidential Data</p>
                                <p className="muted text-[11px]">Your rates and client lists are strictly private.</p>
                            </div>
                        </div>
                        <div className="card !p-4 flex items-center gap-3 text-left">
                            <Zap className="text-emerald-500 shrink-0" size={24} />
                            <div>
                                <p className="text-xs font-bold">Instant Activation</p>
                                <p className="muted text-[11px]">Start optimizing cuts immediately in your browser.</p>
                            </div>
                        </div>
                        <div className="card !p-4 flex items-center gap-3 text-left">
                            <PhoneCall className="text-indigo-500 shrink-0" size={24} />
                            <div>
                                <p className="text-xs font-bold">Dedicated Fabricator Support</p>
                                <p className="muted text-[11px]">Direct WhatsApp assistance for estimation questions.</p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION: Pricing & Facilities FAQs */}
                    <section className="mt-24 max-w-4xl mx-auto" id="pricing-faq">
                        <div className="mb-10 text-center">
                            <p className="eyebrow">Common Questions</p>
                            <h2 className="section-title">Frequently Asked Questions</h2>
                            <p className="muted mt-2 text-sm">Everything you need to know about plans, billing, and facilities.</p>
                        </div>

                        <div className="space-y-3">
                            {faqs.map(([q, a], idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <motion.div
                                        key={q}
                                        initial={false}
                                        className="card !p-0 overflow-hidden border-slate-200 dark:border-slate-800"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="flex w-full items-center justify-between p-5 text-left font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                                        >
                                            <span className="text-sm sm:text-base">{q}</span>
                                            <ChevronDown
                                                size={18}
                                                className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                                                    isOpen ? "rotate-180 text-sky-500" : ""
                                                }`}
                                            />
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="muted border-t border-slate-100 px-5 pb-5 pt-3 text-xs sm:text-sm leading-relaxed dark:border-slate-800">
                                                        {a}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}

            {/* Simulated Checkout Modal */}
            <Modal
                title={"Confirm Plan: " + (plan?.name || "")}
                description="Interactive checkout demonstration. No credit card charge is made. This updates your workshop session subscription immediately."
                open={!!selected}
                onOpenChange={(open) => {
                    if (!busy && !open) setSelected(null);
                }}
            >
                <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-5 dark:border-sky-950 dark:bg-slate-950">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="badge text-[10px] font-bold">Selected Subscription</span>
                            <p className="mt-1 font-bold text-lg text-slate-900 dark:text-white">
                                {plan?.name} · {cycle === "yearly" ? "Annual Plan (20% Off)" : "Monthly Plan"}
                            </p>
                        </div>
                        <p className="text-2xl font-black text-sky-600 dark:text-sky-400">
                            {money((plan?.price || 0) * (cycle === "yearly" ? 12 * 0.8 : 1))}
                        </p>
                    </div>

                    <div className="mt-4 border-t border-sky-200/60 pt-3 text-xs text-slate-600 dark:text-slate-400 dark:border-slate-800">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">What happens next:</p>
                        <ul className="space-y-1 text-[11px]">
                            <li>✓ Instant access to cutting optimizer & PDF generation</li>
                            <li>✓ Unlimited project capacity unlocked on your profile</li>
                            <li>✓ Access active across all your workshop devices</li>
                        </ul>
                    </div>
                </div>

                <Button
                    className="w-full py-6 font-bold text-sm bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                    disabled={busy}
                    onClick={async () => {
                        if (!selected) return;
                        setBusy(true);
                        setError("");
                        try {
                            await subscriptionApi.checkout(selected, cycle);
                            setSelected(null);
                            router.push("/dashboard/subscription");
                        } catch (err) {
                            setError(err instanceof Error ? err.message : "Checkout failed.");
                        } finally {
                            setBusy(false);
                        }
                    }}
                >
                    {busy ? "Updating Subscription…" : "Activate Demo Plan"}
                </Button>

                {error && (
                    <p role="alert" className="mt-3 text-center text-xs font-semibold text-red-500">
                        {error}
                    </p>
                )}
            </Modal>
        </section>
    );
}
