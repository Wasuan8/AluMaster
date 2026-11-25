import { plans } from "@/constants/content";
import { mock } from "./mock";

export const plansApi = {
    list: () => mock(() => plans),
};
