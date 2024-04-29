"use server";

import { getUserSubscription } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";

const returnUrl = absoluteUrl("/shop");

export const createStripUrl = async () => {
	const { userId } = auth();
	const user = await currentUser();

	if (!userId || !user) {
		throw new Error("User not found");
	}

	const userSubscription = await getUserSubscription();

	if (userSubscription?.stripCustomerId) {
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: userSubscription.stripCustomerId,
			return_url: returnUrl,
		});
		return { data: stripeSession.url };
	}

	const stripeSession = await stripe.checkout.sessions.create({
		mode: "subscription",
		payment_method_types: ["card"],
		customer_email: user.emailAddresses[0].emailAddress,
		line_items: [
			{
				quantity: 1,
				price_data: {
					currency: "USD",
					product_data: {
						name: "Lingo Pro",
						description: "Unlimited Hearts",
					},
					unit_amount: 2000, // $20.00 USD
					recurring: {
						interval: "month",
					},
				},
			},
		],
		metadata: {
			userId,
		},
		success_url: returnUrl,
		cancel_url: returnUrl,
	});

	return { data: stripeSession.url };
};
