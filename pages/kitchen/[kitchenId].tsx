import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DisplayMap from "../../components/map";
import { BsFillStarFill } from "react-icons/bs";
import { useEffect, useRef } from "react";
import Nav from "../../components/nav";
import { useState } from "react";
import axios from "axios";
import { start } from "repl";
import { useRouter } from "next/router";

export default function ViewKitchen(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { data } = props;

  const router = useRouter();

  let reserved = data?.reservations.filter(
    (reservation) => reservation.userId === session?.user.id
  );

  const [startDate, setStartDate] = useState<Date | undefined>(data?.start);
  const [endDate, setEndDate] = useState<Date | undefined>(data?.end);

  return (
    <>
      <Nav />
      <div className="py-6 px-44 ">
        <div className="">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900">
            {data?.location}
          </h1>
        </div>

        <div className="mb-8">
          {data?.appliances.map((appliance, i) => (
            <div className="inline py-1 my-1 text-lg text-white " key={i}>
              <div className="inline-block px-3 py-1 mb-1 mr-2 bg-green-500 rounded-lg ">
                <p className="inline">{appliance}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid flex-col items-center justify-center grid-cols-2 mb-10 shadow-lg rounded-xl">
          <div>
            <img
              className="border-r-2 border-green-400 rounded-l-xl"
              src={data?.photo}
            />
          </div>
          <DisplayMap />
        </div>
        <div className="grid grid-cols-5 gap-12">
          <div className="col-span-3 px-4">
            <div className="flex items-center pb-6 mb-10 border-b">
              <Image
                src={data?.owner.image as string}
                width={70}
                height={70}
                className="rounded-full"
                alt={data?.owner.image as string}
              />
              <div className="flex flex-col ml-4 ">
                <h1 className="text-2xl">Hosted by {data?.owner.name}</h1>
                <div className="flex items-center">
                  <h1 className="mr-2 text-md">
                    Average rating{" "}
                    {data?.owner.reviews?.length !== 0
                      ? (data?.owner.reviews.reduce(
                          (partialSum, a) => partialSum + a.rating,
                          0
                        ) as number) / (data?.owner.reviews?.length as number)
                      : 0}{" "}
                  </h1>
                  <BsFillStarFill className="text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="pb-6 mb-10 ">
              <h1 className="text-zinc-500">{data?.desc}</h1>
            </div>
          </div>
          <div className="col-span-2">
            <div className="px-8 py-5 border shadow-md rounded-xl">
              <div className="flex items-center mb-4">
                <h1 className="mr-2 text-3xl font-semibold">${data?.cost}</h1>
                <h1 className="text-lg text-gray-400">per hour</h1>
              </div>
              <div className="grid grid-cols-4 gap-6 px-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="start time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Start Date
                  </label>

                  <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs ">
                    <input
                      type="datetime-local"
                      name="start-date"
                      id="start-time"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      onChange={(e) => setStartDate(new Date(e.target!.value))}
                      readOnly={reserved!.length !== 0}
                      value={
                        reserved!.length !== 0
                          ? reserved
                              ?.at(0)
                              ?.start.toISOString()
                              .split(".")
                              .at(0)
                          : startDate?.toISOString().split(".").at(0)
                      }
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="start time"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    End Date
                  </label>

                  <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs ">
                    <input
                      type="datetime-local"
                      name="emd-date"
                      id="start-time"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Select date"
                      onChange={(e) => setEndDate(new Date(e.target!.value))}
                      readOnly={reserved!.length !== 0}
                      value={
                        reserved!.length !== 0
                          ? reserved
                              ?.at(0)
                              ?.end.toISOString()
                              .split(".")
                              .at(0)
                          : endDate?.toISOString().split(".").at(0)
                      }
                    />
                  </div>
                </div>
              </div>
              {reserved!.length !== 0 ? (
                <button
                  onClick={async () => {
                    await axios.delete(
                      `${process.env.NEXT_PUBLIC_DOMAIN}/api/reserve/${
                        data?.id as string
                      }`
                    );
                    await router.push("/dashboard");
                  }}
                  className="w-full px-6 py-3 mt-4 text-xl font-semibold text-white duration-150 bg-red-500 rounded-lg hover:bg-red-600 "
                >
                  Cancel Reservation
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await axios.post(
                      `${process.env.NEXT_PUBLIC_DOMAIN}/api/reserve/${
                        data?.id as string
                      }`,
                      {
                        start: startDate?.toISOString(),
                        end: endDate?.toISOString(),
                      }
                    );
                    await router.push("/dashboard");
                  }}
                  className="w-full px-6 py-3 mt-4 text-xl font-semibold text-white duration-150 bg-green-500 rounded-lg hover:bg-green-600 "
                >
                  Reserve
                </button>
              )}

              <h1 className="mt-6 mb-2 text-xs text-center text-gray-400">
                You won't be billed until after your reservation is approved.
              </h1>
              {/* <div className="flex items-center">
                <h1>${data?.cost} * {endDate?.getUTCMilliseconds()}</h1>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const kitchenId = context.query.kitchenId;

  const data = await prisma.kitchen.findUnique({
    where: {
      id: kitchenId as string,
    },
    include: {
      review: true,
      reservations: true,
      owner: {
        include: {
          reviews: true,
        },
      },
    },
  });

  return {
    props: {
      data: data,
    },
  };
}
