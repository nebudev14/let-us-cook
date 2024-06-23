import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import { KitchenType, PaymentType } from '@prisma/client';

export const kitchenSchema = z.object({
  desc: z.string(),
  appliances: z.array(z.string()).optional(),
  type: z.nativeEnum(KitchenType),
  payment: z.nativeEnum(PaymentType),
  location: z.string(),
  photo: z.string(),
  start: z.date(),
  end: z.date(),
  cost: z.number()
})

// for posts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  const body = req.body;
  if (!kitchenSchema.safeParse(body)) res.status(500).json({
    msg: "Invalid Kitchen schema"
  })

  const data = await prisma.kitchen.create({
    data: {
      desc: body.desc,
      appliances: body.appliances,
      type: body.type,
      payment: body.payment,
      location: body.location,
      photo: body.photo,
      userId: session?.user.id as string,
      start: body.start,
      end: body.end,
      cost: body.cost
    }
  })

  res.status(200).json(data);
}
