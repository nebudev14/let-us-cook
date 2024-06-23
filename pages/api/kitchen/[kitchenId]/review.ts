import { z } from 'zod';
import { kitchenSchema } from '..';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { authOptions } from '../../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401);
    return;
  }

  const kitchenId = req.query.kitchenId as string;
  const userId = session.user.id;
  const body = req.body;

  switch (req.method) {
    case 'POST': {
      if (!kitchenSchema.safeParse(body)) res.status(500).json({
        msg: "Invalid Kitchen Schema"
      });

      const data = await prisma.review.create({
        data: {
          rating: body.rating,
          comment: body.comment,
          userId: userId,
          kitchenId: kitchenId,
        }
      });

      res.status(200).json(data);
      break;
    }
    case 'GET': {
      const data = await prisma.review.findUnique({
        where: {
          userId_kitchenId: {
            userId: userId,
            kitchenId: kitchenId,
          },
        }
      });

      res.status(200).json(data);
      break;
    }
    case 'DELETE': {
      const data = await prisma.review.delete({
        where: {
          userId_kitchenId: {
            userId: userId,
            kitchenId: kitchenId,
          },
        }
      });

      res.status(200).json(data);
      break;
    }
    default: {
      res.status(400);
    }
  }
}