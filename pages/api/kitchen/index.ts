import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { z } from 'zod';
import { KitchenType } from '@prisma/client';
import { geocode, OutputFormat, RequestType } from 'react-geocode';

export const kitchenSchema = z.object({
  desc: z.string(),
  appliances: z.array(z.string()).optional(),
  location: z.string(),
  photo: z.string().optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  type: z.nativeEnum(KitchenType),
  cost: z.number(),
  fanumTax: z.boolean()
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

  const latlng = geocode(RequestType.ADDRESS, body.location, {
    key: process.env.NEXT_PUBLIC_GOOGLE_MAP_SECRET,
    outputFormat: OutputFormat.JSON
  },
  ).then(async ({ results }) => {
    const pos = results[0].geometry.location
    const data = await prisma.kitchen.create({
      data: {
        desc: body.desc,
        appliances: body.appliances,
        location: body.location,
        photo: Math.random() * 2 === 0 ? "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : "https://st.hzcdn.com/simgs/pictures/kitchens/kitchens-michael-alan-kaskel-img~0d511d8e0e77ab3a_14-6521-1-7aacee2.jpg",
        start: body.start,
        end: body.end,
        type: body.type,
        cost: Number(body.cost),
        userId: session?.user.id as string,
        lat: pos.lat,
        lng: pos.lng,
        fanumTax: body.fanumTax
      }
    });

    res.status(200).json({ data: data });
  });


}
