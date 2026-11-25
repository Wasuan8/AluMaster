import { mock, requireOwner } from "./mock";

export const invoicesApi = {
    list: () => mock(() => requireOwner().invoices),
};
