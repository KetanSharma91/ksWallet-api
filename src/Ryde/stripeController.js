import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function paytransaction(req, res) {

    try {
        const { payment_method_id, payment_intent_id, customer_id, client_secret } =
            req.body;

        if (!payment_method_id || !payment_intent_id || !customer_id) {
            return res.status(400).json({ message: "Missing fields are required" })
        }

        const paymentMethod = await stripe.paymentMethods.attach(
            payment_method_id,
            { customer: customer_id },
        );

        const result = await stripe.paymentIntents.confirm(payment_intent_id, {
            payment_method: paymentMethod.id,
        });

        return res.status(201).json({
            success: true,
            message: "Payment successful",
            result: result,
        });

    } catch (error) {
        console.log("payment failed", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTransaction(req, res) {

    try {
        const { name, email, amount } = req.body;

        if (!name || !email || !amount) {
            return res.status(400).json({ message: "Missing fields are required" })
        }

        let customer;
        const doesCustomerExist = await stripe.customers.list({
            email,
        });

        if (doesCustomerExist.data.length > 0) {
            customer = doesCustomerExist.data[0];
        } else {
            const newCustomer = await stripe.customers.create({
                name,
                email,
            });

            customer = newCustomer;
        }

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2024-06-20" },
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount) * 100,
            currency: "usd",
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
        });

        return res.status(201).json({
            paymentIntent: paymentIntent,
            ephemeralKey: ephemeralKey,
            customer: customer.id,
        });

    } catch (error) {
        console.log("creating transaction failed", error);
        res.status(500).json({ message: "Internal server error" });
    }
}