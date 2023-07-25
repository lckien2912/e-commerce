import Stripe from "stripe";

const stripeApi = process.env.STRIPE_API_KEY;

export const stripe = new Stripe(stripeApi!, {
  apiVersion: "2022-11-15",
  typescript: true,
});
