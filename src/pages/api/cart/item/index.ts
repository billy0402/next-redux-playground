// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { cart } from '@fixtures/cart';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      cart.items.push(body);
      res.status(200).json(body);
      break;
    case 'DELETE':
      cart.items = [];
      res.status(200).json(null);
      break;
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
