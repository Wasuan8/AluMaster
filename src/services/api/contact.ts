import { mock } from "./mock";

export const contactApi = {
    send: (_input: { name: string; email: string; phone: string; message: string }) =>
        mock(() => ({ message: "Demo submitted successfully. No message was sent." })),
};
