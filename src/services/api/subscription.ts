import type { Cycle, PlanId } from "@/types";
import { plans } from "@/constants/content";
import { mock, requireOwner, requireUser, save } from "./mock";

export const subscriptionApi = {
    get: () => mock(() => requireUser().subscription),

    checkout: (plan: PlanId, cycle: Cycle) => mock(() => {
        const db = requireOwner();
        const selected = plans.find(item => item.id === plan);
        if (!selected) throw new Error("Invalid plan.");
        if (plan === "free" && db.projects.length > 5) {
            throw new Error("Reduce your project count to five before switching to Free.");
        }

        const now = new Date();
        const renewal = new Date(now);
        if (cycle === "yearly") renewal.setFullYear(renewal.getFullYear() + 1);
        else renewal.setMonth(renewal.getMonth() + 1);

        db.subscription = {
            plan,
            cycle,
            renewal: plan === "free" ? null : renewal.toISOString(),
        };

        if (selected.price > 0) {
            db.invoices.unshift({
                id: crypto.randomUUID(),
                created: now.toISOString(),
                description: selected.name + " · " + cycle,
                amount: cycle === "yearly"
                    ? Math.round(selected.price * 12 * 0.8 * 100) / 100
                    : selected.price,
                status: "Demo",
            });
        }
        save(db);
        return db.subscription;
    }),
};
