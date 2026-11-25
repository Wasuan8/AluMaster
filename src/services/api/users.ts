import type { Database } from "@/types";
import { mock, requireOwner, save } from "./mock";

export const usersApi = {
    profile: () => mock(() => requireOwner().profile),
    update: (profile: Database["profile"]) => mock(() => {
        const db = requireOwner();
        db.profile = profile;
        save(db);
        return profile;
    }),
};
