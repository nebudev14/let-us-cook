import {
  KitchenType,
  KitchenUser,
  PaymentType,
  UserStatus,
} from "@prisma/client";
import axios from "axios";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import RegisterKitchen from "../components/register-kitchen";

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { data } = props;
  console.log(data);

  return (
    <div className="h-screen px-10 py-6 ">
      <h1 className="mb-6 text-xl"></h1>
      <div className="grid grid-flow-col grid-rows-3 gap-6 min-h-[75vh]">
        <div className="w-full row-span-3 p-6 border-2 rounded-lg shadow-md">
          {data.map((kitchen, i) => (
            <div key={i} className="py-2">
              {kitchen.kitchen.name}
            </div>
          ))}
        </div>
        <div className="flex items-center col-span-2 px-6 py-4 border-2 rounded-xl"></div>
        <div className="col-span-2 row-span-2 p-4 border-2 rounded-xl">03</div>
      </div>
      <button
        onClick={async () => {
          await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kitchen`, {
            name: "Boston Kitchen",
            desc: "IT'S A BIG KITCHEN. BIG GUY. REALLY COOL",
            tags: ["Microwave", "Rice Cooker", "Oven", "Yes"],
            type: KitchenType.PRIVATE,
            payment: PaymentType.FOOD,
          });
        }}
      >
        bruh
      </button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const data = await prisma.kitchenUser.findMany({
    where: {
      userId: session?.user.id as string,
    },
    include: {
      kitchen: true,
    },
  });

  return {
    props: {
      data: data,
    },
  };
}
