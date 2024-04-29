import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get("Stripe-Signature");
	if (!signature) {
		return new Response("No signature", { status: 400 });
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		throw new Error("Missing env STRIPE_WEBHOOK_SECRET");
	}

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return new NextResponse(`Webhook error: ${error.message}`, {
				status: 400,
			});
		}
		throw error;
	}

	const session = event.data.object as Stripe.Checkout.Session;

	switch (event.type) {
		case "checkout.session.completed": {
			const subscription = await stripe.subscriptions.retrieve(
				session.subscription as string,
			);

			if (!session?.metadata?.userId) {
				return new NextResponse("User Id is required", { status: 400 });
			}

			await db.insert(userSubscription).values({
				userId: session.metadata.userId,
				stripeSubscriptionId: subscription.id,
				stripCustomerId: subscription.customer as string,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000,
				),
			});
			break;
		}
		case "invoice.payment_succeeded": {
			const subscription = await stripe.subscriptions.retrieve(
				session.subscription as string,
			);

			await db
				.update(userSubscription)
				.set({
					stripePriceId: subscription.items.data[0].price.id,
					stripeCurrentPeriodEnd: new Date(
						subscription.current_period_end * 1000,
					),
				})
				.where(eq(userSubscription.stripeSubscriptionId, subscription.id));
			break;
		}
		default:
			console.log("Unhandled event type", event.type);
			break;
	}

	return new NextResponse(null, { status: 200 });
}
