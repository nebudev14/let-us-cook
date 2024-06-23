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
import Link from "next/link";
import { useState } from "react";

export const constAppliances = [
  "refrigerator",
  "microwave",
  "stove",
  "oven",
  "rice cooker",
  "waffle maker",
];

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { reservations, kitchens } = props;

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  navigator.geolocation?.getCurrentPosition(
    ({ coords: { latitude: lat, longitude: lng } }) => {
      const pos = { lat, lng };
      setLocation(pos);
    }
  );

  return (
    <>
      <Nav page="find-kitchen" />
      <RegisterButton />
      <div className="h-screen px-10 py-6 mx-auto max-w-screen-2xl text-zinc-700">
        <h1 className="mb-6 text-xl font-bold text-green-500">My Events</h1>

        <div className="flex flex-row w-full gap-10 pb-10">
          {reservations.length === 0 ? (
            <h1>You haven't reserved any kitchens yet. Let's change that!</h1>
          ) : null}
          {reservations.map((reservation, i) => (
            <Link href={`/kitchen/${reservation.kitchenId}`} passHref key={i}>
              <div className="flex flex-col gap-1">
                <img
                  className="rounded-md max-w-60 drop-shadow-md"
                  src={reservation.kitchen.photo}
                />

                <div className="flex flex-row items-center gap-2 mt-2">
                  <MapPinIcon className="text-green-500 size-5" />
                  <h3 className="text-base">
                    {reservation.kitchen.location.length < 23
                      ? reservation.kitchen.location
                      : reservation.kitchen.location.slice(0, 23) + "..."}
                  </h3>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CalendarDaysIcon className="text-green-500 size-5" />
                  <p>
                    {" "}
                    {reservation.kitchen.start.toLocaleDateString()} -{" "}
                    {reservation.kitchen.end.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h1 className="mb-6 text-xl font-bold text-green-500">Find Kitchens</h1>

        <div className="grid grid-flow-col grid-cols-12 gap-5 min-h-[75vh] max-h-screen">
          <div className="flex flex-col col-span-2 row-span-3 pr-6 border-r border-zinc-300">
            <div className="flex flex-col mb-5">
              <h3 className="pb-1 mb-2 text-xl border-b border-zinc-400">
                Features
              </h3>
              {constAppliances.map((item, i) => (
                <div key={i} className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    id={item}
                    value={item.charAt(0).toUpperCase() + item.slice(1)}
                    className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="refrigerator">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                </div>
              ))}
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
                  className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500 focus:ring-green-500"
                />
                <label htmlFor="money">Money</label>
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="food"
                  value="Food"
                  className="rounded-sm checked:bg-green-500 active:checked:bg-green-500 focus:checked:bg-green-500 hover:checked:bg-green-500 focus:ring-green-500"
                />
                <label htmlFor="food">Food</label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 max-h-[85vh] overflow-y-scroll col-span-8  styled-scrollbar">
            {kitchens.map((kitchen, i) => (
              <KitchenCard key={i} kitchen={kitchen} />
            ))}
          </div>

          <div className="flex flex-col col-span-3 row-span-3 border-2 border-green-300 rounded-lg">
            <DisplayMap center={location} />
          </div>
        </div>

        {/* <button
          onClick={async () => {
            await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kitchen`, {
              desc: "IT'S A BIG KITCHEN. BIG GUY. REALLY COOL",
              appliances: ["Microwave", "Rice Cooker", "Oven", "Yes"],
              type: KitchenType.PRIVATE,
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
        </button> */}
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
