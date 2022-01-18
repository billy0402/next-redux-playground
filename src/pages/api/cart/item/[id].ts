// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { cart } from '@fixtures/cart';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'DELETE':
      cart.items.filter((item) => item.id !== id);
      res.status(200).json(null);
      break;
    default:
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
