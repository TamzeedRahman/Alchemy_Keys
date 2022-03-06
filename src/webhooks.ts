import { stripe } from './';
import Stripe from 'stripe';


/**
 * Business logic for specific webhook event types
 */
const webhookHandlers = {
    'checkout.session.completed': async (data: Stripe.Event.Data) => {
     
    },
    'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
    
    },
    'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
   
    },
    },
    'invoice.payment_succeeded': async (data: Stripe.Invoice) => {
      
    },
    'invoice.payment_failed': async (data: Stripe.Invoice) => {
      
    }
}

/**
 * Validate the stripe webhook secret
 */
export const handleStripeWebhook = async(req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req['rawBody'], sig, process.env.STRIPE_WEBHOOK_SECRET);
  
  try {
    await webhookHandlers[event.type](event.data.object);
    res.send({received: true});
  } catch (err) {
    console.error(err)
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}