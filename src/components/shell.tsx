"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Logo() {
    return <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight" aria-label="AluMaster home">
        <img src="/assets/images/logo.png" alt="" className="w-20 h-20" />
        Alu<span className="-ml-2 text-sky-500">Master</span>
    </Link>;
}

export function Shell({ children }: { children: React.ReactNode }) {
    const [dark, setDark] = useState(false);
    const [menu, setMenu] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const enabled = localStorage.getItem("alumaster-theme") === "dark" ||
            (!localStorage.getItem("alumaster-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setDark(enabled);
        document.documentElement.classList.toggle("dark", enabled);
    }, []);

    useEffect(() => { setMenu(false); }, [pathname]);

    function toggleTheme() {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("alumaster-theme", next ? "dark" : "light");
    }

    return <MotionConfig reducedMotion="user">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:bg-white focus:p-4 focus:text-slate-950">Skip to content</a>
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
            <div className="container flex h-20 items-center justify-between gap-5">
                <Logo />
                <nav className="hidden items-center gap-7 text-sm font-medium lg:flex" aria-label="Main navigation">
                    <Link href="/#features">Features</Link>
                    <Link href="/#how-it-works">How it works</Link>
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/support">Resources</Link>
                </nav>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className="px-3">
                        {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>
                    <Link href="/login" className="hidden px-3 text-sm font-semibold sm:block">Log in</Link>
                    <Button asChild className="hidden sm:inline-flex"><Link href="/register">Start free <ArrowUpRight size={16} /></Link></Button>
                    <Button variant="ghost" className="px-3 lg:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-nav" aria-label="Toggle navigation">
                        {menu ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>
            {menu && <nav id="mobile-nav" className="container grid gap-4 pb-6 lg:hidden" aria-label="Mobile navigation">
                {[["Features", "/#features"], ["Pricing", "/pricing"], ["Support", "/support"], ["Log in", "/login"], ["Start free", "/register"]].map(([name, href]) => <Link key={name} href={href} onClick={() => setMenu(false)}>{name}</Link>)}
            </nav>}
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-slate-200 py-12 dark:border-slate-800">
            <div className="container grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
                <div><Logo /><p className="muted mt-4 max-w-xs text-sm">Less time calculating.<br />More time building your business.</p><p className="muted mt-5 text-xs">Interactive prototype · No live payments</p></div>
                {[
                    ["Product", ["Features", "/#features"], ["Pricing", "/pricing"], ["Dashboard", "/dashboard"]],
                    ["Company", ["About us", "/about"], ["Contact", "/contact"], ["Support", "/support"]],
                    ["Legal", ["Privacy policy", "/privacy-policy"], ["Terms", "/terms"]],
                ].map(([heading, ...links]) => <div key={String(heading)}>
                    <p className="mb-4 text-sm font-semibold">{heading as string}</p>
                    <div className="grid gap-3">{(links as string[][]).map(([label, href]) => <Link className="muted text-sm hover:text-sky-500" href={href} key={href}>{label}</Link>)}</div>
                </div>)}
            </div>
            <div className="container muted mt-10 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-6 text-xs dark:border-slate-800">
                <span>© {new Date().getFullYear()} AluMaster.</span><span>Built for India’s aluminium professionals.</span>
            </div>
        </footer>
    </MotionConfig>;
}
