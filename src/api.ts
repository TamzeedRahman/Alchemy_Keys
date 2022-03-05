import express, { Request, Response } from 'express';
export const app = express();

import { createStripeCheckoutSession } from './checkout';

// Allows cross origin requests
import cors from 'cors';

app.use(cors({ origin: true }));


app.use(express.json());
// post request issue with insomnia




  
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
      callback(req, res, next).catch(next);
    };
  }