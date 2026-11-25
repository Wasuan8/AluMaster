import type { Project } from "@/types";
import { mock, requireUser, save } from "./mock";

/** Returns true if the user has mistry/restricted role in legacy mock or real system */
function isMistry(role: string | undefined): boolean {
    return role === "Mistri" || role === "mistry" || role === "client";
}

export const projectsApi = {
    list: () => mock(() => {
        const db = requireUser();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return isMistry((db.user as any)?.role) ? [] : db.projects;
    }),

    create: (input: Pick<Project, "name" | "client" | "windows">) => mock(() => {
        const db = requireUser();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (isMistry((db.user as any)?.role)) throw new Error("Project management access required.");
        if (db.subscription.plan === "free" && db.projects.length >= 5) {
            throw new Error("Your Free plan includes 5 projects. Upgrade to add more.");
        }
        const project: Project = { ...input, id: crypto.randomUUID(), status: "Draft" };
        db.projects.unshift(project);
        save(db);
        return project;
    }),

    remove: (id: string) => mock(() => {
        const db = requireUser();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (isMistry((db.user as any)?.role)) throw new Error("Project management access required.");
        db.projects = db.projects.filter(project => project.id !== id);
        save(db);
    }),
};
