import type { Member } from "@/types";
import { mock, requireOwner, save } from "./mock";

export const teamApi = {
    list: () => mock(() => requireOwner().members),

    invite: (input: Omit<Member, "id" | "status">) => mock(() => {
        const db = requireOwner();
        if (db.subscription.plan !== "contractor") {
            throw new Error("Upgrade to Contractor to manage invitations.");
        }
        if (input.role === "Owner") throw new Error("Ownership transfer is not available in this demo.");
        if (db.members.some(member => member.email.toLowerCase() === input.email.toLowerCase())) {
            throw new Error("This email is already on your team.");
        }
        const member: Member = { ...input, id: crypto.randomUUID(), status: "Invited" };
        db.members.push(member);
        save(db);
        return member;
    }),

    remove: (id: string) => mock(() => {
        const db = requireOwner();
        if (db.subscription.plan !== "contractor") throw new Error("Contractor plan required.");
        if (db.members.find(member => member.id === id)?.role === "Owner") {
            throw new Error("The owner cannot be removed.");
        }
        db.members = db.members.filter(member => member.id !== id);
        save(db);
    }),
};
