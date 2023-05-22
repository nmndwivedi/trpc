
// Get type of a TRPC router
type ThreadData = inferRouterOutputs<AppRouter>["threads"]["joinThreadWithLinkCode"];

// Infer gSSP and use satisfies
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

// Get typed params in gSSP
const code = query.code as string; // Assume `code` is a string parameter

if (!code || code.trim().length === 0) {
    return {
        notFound: true,
        props: {},
    };
}

// Get user from cookie in gSSP
let tokens = req.cookies["supabase-auth-token"];
let user = tokens ? await getUserFromToken(tokens) : null;

// Call TRPC router from server
const caller = appRouter.createCaller({ supamaster, user });

let res: ThreadData | null = null;

try {
    res = await caller.threads.joinThreadWithLinkCode({ linkCode: code });
} catch (e) {}

// Edge deployment config of gSSP component
export const config = {
    runtime: "experimental-edge",
};

