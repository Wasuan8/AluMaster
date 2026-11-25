/**
 * services/api/mock.ts
 *
 * Local mock database for demo/non-auth features (projects, team, invoices, etc.).
 * Auth is now handled by the real AluMaster Server — this mock is only for
 * the demo data seeding on fresh load.
 *
 * NOTE: db.user is intentionally typed as `unknown` here because:
 * - Real auth sets a real `User` (from server) in Zustand session store
 * - The mock DB still seeds member/project demo data in localStorage
 * - We cast via `as any` only for legacy mock role checks
 */

import type { Database } from "@/types";

const KEY = "alumaster-demo-v1";

function initial(): Database {
    return {
        user: null,
        projects: [
            { id: "p1", name: "Sunrise Residency", client: "A. Sharma", windows: 24, status: "In progress" },
            { id: "p2", name: "Greenwood Villa", client: "R. Patel", windows: 12, status: "Draft" },
            { id: "p3", name: "Studio Office", client: "Studio Design", windows: 8, status: "Completed" },
        ],
        members: [
            { id: "owner", name: "Demo Owner", email: "owner@example.com", phone: "", role: "Owner", status: "Active" },
        ],
        subscription: { plan: "free", cycle: "monthly", renewal: null },
        invoices: [],
        profile: { company: "Your Aluminium Business", gst: "", email: "" },
    };
}

export function read(): Database {
    if (typeof window === "undefined") return initial();
    try {
        const saved = localStorage.getItem(KEY);
        return saved ? JSON.parse(saved) as Database : initial();
    } catch {
        return initial();
    }
}

export function save(db: Database) {
    localStorage.setItem(KEY, JSON.stringify(db));
}

export async function mock<T>(operation: () => T): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return operation();
}

export function requireUser() {
    const db = read();
    if (!db.user) throw new Error("Please sign in.");
    return db;
}

/** Legacy mock owner check — used only by non-auth mock services */
export function requireOwner() {
    const db = requireUser();
    // Legacy mock stores "Owner" string; real users use "owner_contractor"
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const role = (db.user as any)?.role as string | undefined;
    if (role !== "Owner" && role !== "owner_contractor") {
        throw new Error("Owner access required.");
    }
    return db;
}
