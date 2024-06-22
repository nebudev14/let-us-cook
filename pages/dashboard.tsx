import {
  KitchenType,
  PaymentType,
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
import DisplayMap from "../components/map";
import RegisterKitchen from "../components/register-kitchen";

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { data } = props;
  console.log(data);

  return (
    <div className="h-screen px-10 py-6 ">

      <h1 className="mb-6 text-xl text-green-500 font-bold">My Events</h1>

      <div className="w-full flex flex-row gap-10 pb-10">
        <div className="flex flex-col gap-1">
          <img className="max-w-60 drop-shadow-md rounded-md" src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h3 className="text-xl">Jonny's Kitchen</h3>
          <div className="flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-green-500">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            <p>130-50 Mulberry Avenue</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-green-500">
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
            </svg>
            <p>6:00pm - 9:00pm</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <img className="max-w-60 drop-shadow-md rounded-md" src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <h3 className="text-xl">Jonny's Kitchen</h3>
          <div className="flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-green-500">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            <p>130-50 Mulberry Avenue</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-green-500">
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
            </svg>
            <p>6:00pm - 9:00pm</p>
          </div>
        </div>
      </div>


      <h1 className="mb-6 text-xl text-green-500 font-bold">Find Events</h1>


      <div className="grid grid-flow-col grid-cols-5 gap-6 min-h-[75vh]">
        <div className="row-span-3 flex flex-col border-r-2 border-zinc-700 pr-5">
          <h3 className="text-xl border-b border-zinc-700 mb-5">Features</h3>
          <h3 className="text-xl border-b border-zinc-700 mb-5">Location</h3>
          <h3 className="text-xl border-b border-zinc-700 mb-5">Reviews</h3>
        </div>
        <div className="flex items-center col-span-2 px-6 py-4 border-2 rounded-xl">
          {/* {data.map((kitchen, i) => ( */}
            {/* <div key={i} className="py-2"> */}
              {/* <img className="max-w-60 drop-shadow-md rounded-md" src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
              {/* <h3 className="text-xl">{kitchen.kitchen.name}</h3> */}
              {/* <p>location</p> */}
              {/* <div className="flex flex-col"> */}
                {/* for each feature */}
                {/* <p>features</p> */}
              {/* </div> */}
            {/* </div> */}
          {/* ))} */}
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

  // const data = await prisma.reservation.findMany({
  //   where: {
  //     userId: session?.user.id as string,
  //   },
  //   include: {
  //     kitchen: true,
  //   },
  // });

  return {
    props: {
      // data: data,
    },
  };
}
