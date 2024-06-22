// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/db'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession();
  // const data = await prisma.user.findUnique({ where: { id: session?.user.id } })
  // console.log(data)

  res.status(200).json({
    data: "hllo"
  })
}
