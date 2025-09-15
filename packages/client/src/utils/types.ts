import type { Message } from "server";

export type OptimisticMessage = Message & { pending?: boolean };
