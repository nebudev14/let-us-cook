import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/db'
import { getSession } from 'next-auth/react';
import { kitchenSchema } from '..';
import { Kitchen } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401);
        return;
    }

    const id = req.query.kitchenId as string;

    switch (req.method) {
        case 'GET': {
            const kitchen = await prisma.kitchen.findUnique({
                where: {
                    id: id
                }
            });

            res.status(200).json({
                data: kitchen
            });
        }
        case 'PUT': {
            const { name, desc } = await req.body;

            const toUpdate: { name?: string, desc?: string } = {};
            if (name !== undefined) toUpdate.name = name;
            if (desc !== undefined) toUpdate.desc = desc;

            const update = await prisma.kitchen.update({
                where: { id: id },
                data: toUpdate,
            })

            res.json(update);
        }
        case 'DELETE': {
            const post = await prisma.kitchen.delete({
                where: { id: id }
            });
            res.json(post);
        }
        default: {
            res.status(400);
        }
    }

}
