import { KitchenType } from "@prisma/client";
import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import DisplayMap from "../components/map";
import RegisterKitchen from "../components/register-kitchen";
import KitchenCard from "../components/kitchen-card";
import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import RegisterButton from "../components/register-button";
import Nav from "../components/nav";

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { reservations, kitchens } = props;

  return (
    <>
      <Nav page="find-kitchen"/>
      <RegisterButton />
      <div className="h-screen px-10 py-6 max-w-screen-2xl mx-auto text-zinc-700">
        <h1 className="mb-6 text-xl font-bold text-green-500">My Events</h1>

        <div className="flex flex-row w-full gap-10 pb-10">
          {props.reservations.map((reservation, i) => (
            <div key={i}>
              <div className="flex flex-col gap-1">
                <img
                  className="rounded-md max-w-60 drop-shadow-md"
                  src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <h3 className="text-xl">{reservation.kitchen.location}</h3>
                <div className="flex flex-row items-center gap-2">
                  <MapPinIcon />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CalendarDaysIcon />
                  <p>6:00pm - 9:00pm</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-1">
            <img
              className="rounded-md max-w-60 drop-shadow-md"
              src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <h3 className="text-xl">Jonny's Kitchen</h3>
            <div className="flex flex-row items-center gap-2">
              <MapPinIcon className="text-green-500 size-5" />
              <p>130-50 Mulberry Avenue</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <CalendarDaysIcon className="text-green-500 size-5" />
              <p>6:00pm - 9:00pm</p>
            </div>
          </div>
        </div>

      <h1 className="mb-6 text-xl font-bold text-green-500">Find Kitchens</h1>

      <div className="grid grid-flow-col grid-cols-12 gap-5 min-h-[75vh] max-h-screen">
        <div className="flex flex-col col-span-2 row-span-3 pr-6 border-r border-zinc-300">
          <div className="flex flex-col mb-5">
            <h3 className="pb-1 mb-2 text-xl border-b border-zinc-400">
              Features
            </h3>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="refrigerator"
                value="Refrigerator"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="refrigerator">Refrigerator</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="microwave"
                value="Microwave"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="microwave">Microwave</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="stove"
                value="Stove"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="stove">Stove</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="oven"
                value="Oven"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="oven">Oven</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="rice-cooker"
                value="Rice Cooker"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="rice-cooker">Rice Cooker</label>
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <h3 className="pb-1 mb-2 text-xl border-b border-zinc-400">
              Location
            </h3>
            <div className="flex flex-row items-center gap-2">
              <MapPinIcon className="text-green-500 size-5" />
              <input
                type="number"
                className="w-12 p-px text-base text-green-500 border-0 border-b"
              />
              <p className="text-green-500">miles away</p>
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <h3 className="pb-1 mb-2 text-xl border-b border-zinc-400">
              Payment Type
            </h3>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="money"
                value="Money"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="money">Money</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="food"
                value="Food"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <h3 className="pb-1 mb-2 text-xl border-b border-zinc-400 ">
              Event Type
            </h3>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="money"
                value="Money"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="money">Public Event</label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="food"
                value="Food"
                className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500"
              />
              <label htmlFor="food">Private Kitchen</label>
            </div>
          </div>
        </div>

          <div className="grid grid-cols-3 max-h-[85vh] overflow-y-scroll col-span-8  styled-scrollbar">
            {kitchens.map((kitchen, i) => (
              <KitchenCard key={i} kitchen={kitchen} />
            ))}

            {/* <KitchenCard /> */}
            {/* <KitchenCard />
            <KitchenCard />
            <KitchenCard />
            <KitchenCard />
            <KitchenCard />
            <KitchenCard />
            <KitchenCard /> */}

            {/* {data.map((kitchen, i) => ( */}
            {/* <div key={i} className="py-2"> */}
            {/* <img className="rounded-md max-w-60 drop-shadow-md" src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
            {/* <h3 className="text-xl">{kitchen.kitchen.name}</h3> */}
            {/* <p>location</p> */}
            {/* <div className="flex flex-col"> */}
            {/* for each feature */}
            {/* <p>features</p> */}
            {/* </div> */}
            {/* </div> */}
            {/* ))} */}
          </div>

          <div className="row-span-3 col-span-3 flex flex-col border-2 border-green-300 rounded-lg">
            <DisplayMap />
          </div>
        </div>

        <button
          onClick={async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kitchen`, {
              desc: "IT'S A BIG KITCHEN. BIG GUY. REALLY COOL",
              appliances: ["Microwave", "Rice Cooker", "Oven", "Yes"],
              type: KitchenType.PRIVATE,
              payment: PaymentType.FOOD,
              location: "155 Bay St Road, Boston MA",
              photo:
                "https://st.hzcdn.com/simgs/pictures/kitchens/kitchens-michael-alan-kaskel-img~0d511d8e0e77ab3a_14-6521-1-7aacee2.jpg",
              start: new Date(),
              end: new Date(),
              cost: 2,
            });
          }}
        >
          bruh
        </button>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: session?.user.id as string,
    },
    include: {
      kitchen: true,
    },
  });

  const kitchens = await prisma.kitchen.findMany();

  return {
    props: {
      reservations: reservations,
      kitchens: kitchens,
    },
  };
}
