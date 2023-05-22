type ThreadData =
  inferRouterOutputs<AppRouter>["threads"]["joinThreadWithLinkCode"];

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export const config = {
  runtime: "experimental-edge",
  region: "iad1",
};

// export const runtime = "edge"

export const getServerSideProps = (async (context) => {
  const { query, req } = context;
  const code = query.code as string; // Assume `code` is a string parameter

  // Check if `code` is a non-null, non-empty string
  if (!code || code.trim().length === 0) {
    return {
      notFound: true,
      props: {},
    };
  }

  let tokens = req.cookies["supabase-auth-token"];
  let user = tokens ? await getUserFromToken(tokens) : null;

  // Find the thread id and type of code
  const caller = appRouter.createCaller({ supamaster, user });

  let res: ThreadData | null = null;

  try {
    res = await caller.threads.joinThreadWithLinkCode({
      linkCode: code,
    });
  } catch (e) {
  }

  if (!res) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    redirect: { destination: `${NEXT_PUBLIC_SITE_URL}/chat/${res.threadId}` },
    props: {},
  };
}) satisfies GetServerSideProps;