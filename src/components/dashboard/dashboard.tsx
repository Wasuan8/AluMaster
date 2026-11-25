"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { LayoutDashboard, FolderOpen, Users, CreditCard, Receipt, Settings, LogOut, Plus, Trash2, ArrowUpRight } from "lucide-react";
import { useSession } from "@/store/session";
import { useResource } from "@/hooks/use-resource";
import { projectsApi } from "@/services/api/projects";
import { teamApi } from "@/services/api/team";
import { subscriptionApi } from "@/services/api/subscription";
import { invoicesApi } from "@/services/api/invoices";
import { usersApi } from "@/services/api/users";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SmartForm } from "@/components/ui/form";
import { money, date } from "@/lib/utils";
import type { Role, LegacyRole } from "@/types";

const nav = [
    ["Overview", "/dashboard", LayoutDashboard],
    ["Projects", "/dashboard/projects", FolderOpen],
    ["Team Members", "/dashboard/team", Users],
    ["Subscription", "/dashboard/subscription", CreditCard],
    ["Billing", "/dashboard/billing", Receipt],
    ["Settings", "/dashboard/settings", Settings],
] as const;

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, ready, refresh, logout } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => { void refresh(); }, [refresh]);
    useEffect(() => { if (ready && !user) router.replace("/login"); }, [ready, user, router]);

    if (!ready || !user) return <Loading />;
    const ownerOnly = ["/dashboard/team", "/dashboard/billing", "/dashboard/settings"];
    const isOwner = user.role === "owner_contractor" || user.role === "admin";
    const allowed = isOwner || !ownerOnly.includes(pathname);

    return <div className="container grid gap-7 py-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside><div className="card !p-4 lg:sticky lg:top-28"><p className="eyebrow mb-5 px-2">Your workspace</p><nav aria-label="Dashboard" className="flex gap-2 overflow-x-auto lg:grid">
            {nav.filter(([, href]) => isOwner || !ownerOnly.includes(href)).map(([label, href, Icon]) => <Link key={href} href={href} className={"flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm " + (pathname === href ? "bg-sky-50 font-semibold text-sky-600 dark:bg-sky-950" : "muted hover:bg-slate-100 dark:hover:bg-slate-800")}><Icon size={17} />{label}</Link>)}
        </nav><div className="mt-5 hidden border-t pt-4 lg:block"><p className="px-2 text-sm font-semibold">{user.name}</p><p className="muted px-2 text-xs">{user.role}</p></div><Button variant="ghost" className="mt-3" onClick={async () => { await logout(); router.push("/login"); }}><LogOut size={16} />Log out</Button></div></aside>
        <div className="min-w-0"><div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">Demo workspace. Records stay in this browser. Authentication, billing, and invitations are simulated.</div>{allowed ? children : <p role="alert" className="card">Owner access is required.</p>}</div>
    </div>;
}

export function Loading() {
    return <div className="container py-12" role="status" aria-label="Loading"><div className="grid gap-5 sm:grid-cols-3">{[1, 2, 3].map(n => <div key={n} className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />)}</div><span className="sr-only">Loading workspace</span></div>;
}

function ResourceError({ error, retry }: { error: string; retry: () => Promise<void> }) {
    return <div className="card"><p role="alert" className="mb-4 text-red-500">{error}</p><Button variant="outline" onClick={() => void retry()}>Try again</Button></div>;
}

function Heading({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
    return <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight">{title}</h1><p className="muted mt-2 text-sm">{description}</p></div>{action}</div>;
}

const loadOverview = async () => ({
    projects: await projectsApi.list(),
    subscription: await subscriptionApi.get(),
});

export function Overview() {
    const { data, loading, error, reload } = useResource(loadOverview);
    if (loading) return <Loading />;
    if (error || !data) return <ResourceError error={error || "No data available."} retry={reload} />;
    const active = data.projects.filter(p => p.status !== "Completed").length;
    return <>
        <Heading title="Let’s build something great." description="Here’s what’s happening in your workspace." action={<Button asChild><Link href="/dashboard/projects"><Plus size={16} />New project</Link></Button>} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[
            ["Active projects", String(active)], ["Team members", "1 owner*"], ["Subscription", data.subscription.plan], ["Project usage", data.projects.length + (data.subscription.plan === "free" ? " / 5" : " / unlimited")],
        ].map(([label, value]) => <div className="card" key={label}><p className="muted text-xs">{label}</p><p className="mt-3 text-2xl font-bold capitalize">{value}</p></div>)}</div>
        <p className="muted mt-2 text-xs">*Invited members are pending and do not represent active accounts.</p>
        <div className="mt-6 grid gap-5 xl:grid-cols-2">{[["Projects created", [3, 6, 4, 8, 5, 9]], ["PDFs generated", [6, 10, 7, 15, 12, 20]]].map(([title, values]) => <div key={String(title)} className="card"><div className="mb-6 flex items-center justify-between"><h2 className="font-semibold">{String(title)}</h2><span className="muted text-xs">Sample data</span></div><div role="img" aria-label={String(title) + " sample values January through June: " + (values as number[]).join(", ")} className="flex h-44 items-end justify-around gap-3 border-b">{(values as number[]).map((value, i) => <div key={i} className="flex h-full flex-1 flex-col justify-end text-center"><span className="muted mb-1 text-[10px]">{value}</span><div className="mx-auto w-full max-w-10 rounded-t-md bg-gradient-to-t from-sky-600 to-sky-300" style={{ height: (value / Math.max(...values as number[]) * 75) + "%" }} /><span className="muted mt-2 text-[10px]">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span></div>)}</div></div>)}</div>
        <div className="card mt-6 !bg-slate-900 !text-white"><p className="text-xs font-semibold text-sky-400">ROOM TO GROW</p><h2 className="mt-3 text-xl font-bold">Give your next project a little more power.</h2><p className="mt-2 text-sm text-slate-400">Explore Pro for unlimited projects, or Contractor for team management.</p><Button asChild className="mt-5"><Link href="/pricing">Explore plans <ArrowUpRight size={16} /></Link></Button></div>
    </>;
}

export function Projects() {
    const resource = useResource(projectsApi.list);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [removing, setRemoving] = useState < string | null > (null);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    return <>
        <Heading title="Projects" description="Every measurement starts with an organized project." action={<Button onClick={() => setOpen(true)}><Plus size={16} />New project</Button>} />
        <label htmlFor="search" className="sr-only">Search projects</label><input id="search" className="input mb-5 max-w-sm" placeholder="Search projects or clients…" value={query} onChange={e => setQuery(e.target.value)} />
        {resource.loading ? <Loading /> : resource.error ? <ResourceError error={resource.error} retry={resource.reload} /> : <div className="grid gap-4 md:grid-cols-2">{resource.data?.filter(p => (p.name + " " + p.client).toLowerCase().includes(query.toLowerCase())).map(p => <article key={p.id} className="card"><div className="flex items-start justify-between gap-3"><span className="rounded-xl bg-sky-50 p-3 text-sky-500 dark:bg-sky-950"><FolderOpen size={22} /></span><span className="badge">{p.status}</span></div><h2 className="mt-5 font-bold">{p.name}</h2><p className="muted mt-1 text-sm">{p.client} · {p.windows} windows</p><Button variant="ghost" className="mt-4 px-0 text-red-500" onClick={() => { setError(""); setRemoving(p.id); }}><Trash2 size={14} />Delete project</Button></article>)}{resource.data?.filter(p => (p.name + " " + p.client).toLowerCase().includes(query.toLowerCase())).length === 0 && <p className="card muted">No matching projects. Create a project to get started.</p>}</div>}
        <Modal title="Create project" description="Add a project to your local demo workspace." open={open} onOpenChange={setOpen}><SmartForm submitLabel="Create project" fields={[
            { name: "name", label: "Project name", rule: z.string().trim().min(2, "Enter a project name.") },
            { name: "client", label: "Client name", rule: z.string().trim().min(2, "Enter a client name.") },
            { name: "windows", label: "Number of windows", type: "number", rule: z.string().refine(v => Number.isInteger(Number(v)) && Number(v) > 0 && Number(v) <= 10000, "Enter a whole number from 1 to 10,000.") },
        ]} onSubmit={async values => { await projectsApi.create({ name: values.name, client: values.client, windows: Number(values.windows) }); setOpen(false); await resource.reload(); }} /></Modal>
        <Modal title="Delete this project?" description="This removes the project from this browser’s demo records." open={!!removing} onOpenChange={v => { if (!busy && !v) setRemoving(null); }}><Button disabled={busy} onClick={async () => { if (!removing) return; setBusy(true); try { await projectsApi.remove(removing); setRemoving(null); await resource.reload(); } catch (e) { setError(e instanceof Error ? e.message : "Unable to delete."); } finally { setBusy(false); } }}>Delete project</Button>{error && <p className="mt-3 text-red-500" role="alert">{error}</p>}</Modal>
    </>;
}

export function Team() {
    const resource = useResource(teamApi.list);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [busy, setBusy] = useState < string | null > (null);
    return <>
        <Heading title="Your team, together." description="Manage the people behind every project." action={<Button onClick={() => setOpen(true)}><Plus size={16} />Invite member</Button>} />
        <p className="card muted mb-5 text-sm">Team invitations require Contractor. <Link href="/pricing" className="font-semibold text-sky-500">Explore plans →</Link></p>
        {resource.loading ? <Loading /> : resource.error ? <ResourceError error={resource.error} retry={resource.reload} /> : <div className="overflow-x-auto rounded-2xl border"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-100 dark:bg-slate-900"><tr>{["Member", "Role", "Status", "Action"].map(x => <th key={x} className="p-4">{x}</th>)}</tr></thead><tbody>{resource.data?.map(m => <tr className="border-t" key={m.id}><td className="p-4"><strong>{m.name}</strong><span className="muted block text-xs">{m.email}</span></td><td className="p-4">{m.role}</td><td className="p-4">{m.status}</td><td className="p-4">{m.role !== "Owner" && <Button variant="ghost" disabled={!!busy} onClick={async () => { setBusy(m.id); setError(""); try { await teamApi.remove(m.id); await resource.reload(); } catch (e) { setError(e instanceof Error ? e.message : "Unable to remove."); } finally { setBusy(null); } }}>{busy === m.id ? "Removing…" : "Cancel invite"}</Button>}</td></tr>)}</tbody></table></div>}
        {error && <p role="alert" className="mt-3 text-red-500">{error}</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-3">{[["Owner", "Everything: projects, subscriptions, billing, settings, and team management."], ["Contractor", "Project management and reports."], ["Mistri", "View assigned projects only. Assignment flows are not connected in this demo."]].map(([role, description]) => <div key={role} className="card"><h2 className="font-bold">{role}</h2><p className="muted mt-3 text-sm leading-7">{description}</p></div>)}</div>
        <Modal title="Invite a team member" description="Creates a pending demo record. No email or SMS is sent." open={open} onOpenChange={setOpen}><SmartForm submitLabel="Create demo invitation" defaults={{ role: "Mistri" }} fields={[
            { name: "name", label: "Name", rule: z.string().trim().min(2) },
            { name: "email", label: "Email", type: "email", rule: z.string().trim().email() },
            { name: "phone", label: "Phone", type: "tel", rule: z.string().regex(/^\+?[\d\s-]{7,18}$/, "Enter a phone number.") },
            { name: "role", label: "Role", options: ["Mistri", "Contractor"], rule: z.enum(["Mistri", "Contractor"]) },
        ]} onSubmit={async v => { await teamApi.invite({ name: v.name, email: v.email, phone: v.phone, role: v.role as LegacyRole }); setOpen(false); await resource.reload(); }} /></Modal>
    </>;
}

export function Billing() {
    const resource = useResource(invoicesApi.list);
    if (resource.loading) return <Loading />;
    if (resource.error) return <ResourceError error={resource.error} retry={resource.reload} />;
    return <><Heading title="Billing history" description="A record of your simulated plan purchases." /><div className="overflow-x-auto rounded-2xl border"><table className="w-full min-w-[500px] text-left text-sm"><thead className="bg-slate-100 dark:bg-slate-900"><tr>{["Date", "Description", "Amount", "Status"].map(x => <th key={x} className="p-4">{x}</th>)}</tr></thead><tbody>{resource.data?.map(invoice => <tr key={invoice.id} className="border-t"><td className="p-4">{date(invoice.created)}</td><td className="p-4">{invoice.description}</td><td className="p-4">{money(invoice.amount)}</td><td className="p-4">{invoice.status}</td></tr>)}{!resource.data?.length && <tr><td colSpan={4} className="muted p-8 text-center">No demo invoices yet.</td></tr>}</tbody></table></div></>;
}

export function Subscription() {
    const resource = useResource(loadOverview);
    if (resource.loading) return <Loading />;
    if (resource.error || !resource.data) return <ResourceError error={resource.error || "Unavailable"} retry={resource.reload} />;
    const { subscription, projects } = resource.data;
    return <><Heading title="Your subscription" description="Choose a plan that grows with your work." /><div className="card"><span className="badge">Current plan</span><h2 className="mt-4 text-3xl font-bold capitalize">{subscription.plan}</h2><dl className="mt-6 grid gap-5 sm:grid-cols-3"><div><dt className="muted text-xs">Billing cycle</dt><dd className="mt-1 capitalize">{subscription.cycle}</dd></div><div><dt className="muted text-xs">Demo renewal date</dt><dd className="mt-1">{subscription.renewal ? date(subscription.renewal) : "No renewal"}</dd></div><div><dt className="muted text-xs">Project usage</dt><dd className="mt-1">{projects.length} / {subscription.plan === "free" ? "5" : "Unlimited"}</dd></div></dl><Button asChild className="mt-7"><Link href="/pricing">Change or upgrade plan</Link></Button><p className="muted mt-4 text-xs">Demo plans never renew automatically or charge money.</p></div><div className="mt-10"><Billing /></div></>;
}

export function SettingsPage() {
    const resource = useResource(usersApi.profile);
    if (resource.loading) return <Loading />;
    if (resource.error || !resource.data) return <ResourceError error={resource.error || "Unavailable"} retry={resource.reload} />;
    return <><Heading title="Business settings" description="Make your workspace feel like your business." /><div className="card max-w-xl"><SmartForm defaults={resource.data} submitLabel="Save business profile" fields={[
        { name: "company", label: "Company name", rule: z.string().trim().min(2) },
        { name: "gst", label: "GSTIN (optional)", rule: z.string().trim().refine(v => !v || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(v), "Enter a GSTIN in the expected format.") },
        { name: "email", label: "Business email (optional)", type: "email", rule: z.union([z.literal(""), z.string().email()]) },
    ]} onSubmit={async v => { await usersApi.update({ company: v.company, gst: v.gst, email: v.email }); return "Business profile saved in this browser."; }} /></div></>;
}
