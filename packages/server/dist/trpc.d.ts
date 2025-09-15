export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
}, import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    hello: import("@trpc/server").TRPCQueryProcedure<{
        input: {
            name: string;
        };
        output: {
            message: string;
        };
        meta: object;
    }>;
}>>;
export type AppRouter = typeof appRouter;
