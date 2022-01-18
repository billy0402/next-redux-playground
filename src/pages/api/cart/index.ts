// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { cart } from '@fixtures/cart';
import { Cart } from '@models/cart';

const handler = (req: NextApiRequest, res: NextApiResponse<Cart>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(cart);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
