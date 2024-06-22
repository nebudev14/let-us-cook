import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import { KitchenType, PaymentType } from '@prisma/client';

export const kitchenSchema = z.object({
  name: z.string(),
  desc: z.string(),
  tags: z.array(z.string()).optional(),
  type: z.nativeEnum(KitchenType),
  payment: z.nativeEnum(PaymentType),
  location: z.string()
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
      name: body.name,
      desc: body.desc,
      tags: body.tags,
      type: body.type,
      payment: body.payment,
      userId: session?.user.id as string,
      location: body.location
    }
  })

  res.status(200).json(data);
}
