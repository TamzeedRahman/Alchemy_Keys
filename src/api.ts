import express, { Request, Response } from 'express';
export const app = express();
import { createPaymentIntent } from './payments';
import { createStripeCheckoutSession } from './checkout';

// Allows cross origin requests
import cors from 'cors';

app.use(cors({ origin: true }));


app.use(express.json());



//body buffer middleware
app.use(
  express.json({
    verify: (req, res, buffer) => (req['rawBody'] = buffer),
  })
);

/**
 * Payment Intents
 */

 app.post(
    '/payments',
    runAsync(async ({ body }: Request, res: Response) => {
      res.send(
        await createPaymentIntent(body.amount)
      );
    })
  );

  
  /**
   * Checkouts
   */
  app.post(
    '/checkouts/',
    runAsync(async ({ body }: Request, res: Response) => {
      res.send(await createStripeCheckoutSession(body.line_items));
    })
  );

  /**
 * Catch async errors when awaiting promises 
 */
 function runAsync(callback: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      callback(req, res, next).catch(next);// reusuable endpoint
    };
  }