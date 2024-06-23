import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import { KitchenType } from '@prisma/client';

export const kitchenSchema = z.object({
  desc: z.string(),
  appliances: z.array(z.string()).optional(),
  location: z.string(),
  photo: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  type: z.nativeEnum(KitchenType),
  cost: z.number(),
});

// for posts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const body = req.body;
  if (!kitchenSchema.safeParse(body)) res.status(500).json({
    msg: "Invalid Kitchen schema"
  });

  const data = await prisma.kitchen.create({
    data: {
      desc: body.desc,
      appliances: body.appliances,
      location: body.location,
      photo: body.photo,
      start: body.start,
      end: body.end,
      type: body.type,
      cost: body.cost,
      userId: session?.user.id as string,
    }
  });

  // res.status(200).json(data);
  res.status(200);
}
