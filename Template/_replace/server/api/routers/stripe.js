import { z } from "zod";

import {
  attachStripe,
  createTRPCRouter,
  isAuthenticated,
  publicProcedure,
} from "../trpc";

export const example = createTRPCRouter({
  getCheckoutSessionId: publicProcedure
    .use(attachStripe)
    .use(isAuthenticated)
    .mutation(async ({ ctx }) => {
      const { data, error } = await ctx.supamaster
        .from("billing")
        .select("*")
        .eq("auth_id", ctx.user.id)
        .maybeSingle();

      if (error || !data)
        throw new TRPCError({ error, code: "INTERNAL_SERVER_ERROR" });

      let { stripe_customer_id } = data;

      if (!stripe_customer_id) {
        let customer;
        try {
          customer = await ctx.stripe.customers.create({
            email: ctx.user.email,
          });
        } catch (e) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create stripe customer",
          });
        }

        await ctx.supamaster
          .from("billing")
          .update({ stripe_customer_id: customer.id })
          .eq("auth_id", ctx.user.id);

        stripe_customer_id = customer.id;
      }

      return {};

      //   const session = await ctx.stripe.checkout.sessions.create({
      //     customer: stripe_customer_id,
      //     line_items: [
      //       {
      //         price: ,
      //         quantity: ,
      //       },
      //     ],
      //     mode: "payment",
      //     payment_intent_data: { setup_future_usage: "on_session" },
      //     success_url: `${NEXT_PUBLIC_SITE_URL}/payment-success`,
      //     cancel_url: `${NEXT_PUBLIC_SITE_URL}/payment-failed`,
      //   });

      //   return {
      //     sessionId: session.id,
      //   };
    }),
  getBillingPortalLink: publicProcedure
    .use(attachStripe)
    .use(isAuthenticated)
    .mutation(async ({ ctx }) => {
      const { data } = await ctx.supamaster
        .from("billing")
        .select("stripe_customer_id")
        .eq("auth_id", ctx.user.id)
        .single();

      if (!data?.stripe_customer_id)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not retrieve customer ID",
        });

      const session = await ctx.stripe.billingPortal.sessions.create({
        customer: data?.stripe_customer_id,
        return_url: `${NEXT_PUBLIC_SITE_URL}/dashboard`,
      });

      return {
        url: session.url,
      };
    }),
});
