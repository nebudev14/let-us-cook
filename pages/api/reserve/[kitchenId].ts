import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import { KitchenType, PaymentType } from '@prisma/client';

const reservationSchema = z.object({
  start: z.date(),
  end: z.date()
})

const approveSchema = z.object({ approved: z.boolean() });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const body = req.body;
  const kitchenId = req.query?.kitchenId as string;

  switch (req.method) {
    case "GET":
      if (!reservationSchema.safeParse(body)) res.status(500).json({ msg: "Invalid dates" })

      const reservationData = await prisma.reservation.create({
        data: {
          start: new Date(),
          end: new Date(),
          userId: session?.user.id as string,
          kitchenId: kitchenId,
          approved: false
        }
      })

      res.status(200).json({ data: reservationData })
      break;
    case "PUT":
      if (!approveSchema.safeParse(req.body)) res.status(500).json({ msg: "Invalid approval update" })
      const approveData = await prisma.reservation.update({
        where: {
          userId_kitchenId: {
            userId: session?.user.id as string,
            kitchenId: kitchenId
          }
        }, data: {
          approved: body.approved
        }
      })
      break;
  }
}
