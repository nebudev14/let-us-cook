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
  const [currRating, setCurrRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const review = data?.review.filter(
    (review) => review.userId === (session?.user.id as string)
  );

  const reviewed = review?.length !== 0;

  const avgRating =
    data?.review.length !== 0
      ? (data?.review.reduce(
          (partialSum, a) => partialSum + a.rating,
          0
        ) as number) / (data?.review?.length as number)
      : 0;

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
          <DisplayMap
            center={{
              lat: data?.lat as number,
              lng: data?.lng as number,
            }}
          />
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
                      ? (data?.review.reduce(
                          (partialSum, a) => partialSum + a.rating,
                          0
                        ) as number) / (data?.review?.length as number)
                      : 0}{" "}
                  </h1>
                  <BsFillStarFill className="text-yellow-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center pb-6 mb-6 border-b">
              {/* {Array.from(Array(5-currRating)).map((i) => (
                <BsFillStarFill key={i} className="text-yellow-400" />
              ))} */}
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
                          ? reserved?.at(0)?.end.toISOString().split(".").at(0)
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
            <div className="px-8 py-5 mt-6 border shadow-md rounded-xl">
              <>
                {reviewed ? (
                  <h1 className="mb-1 text-lg font-semibold ">
                    Thanks for leaving your feedback.
                  </h1>
                ) : (
                  <div>
                    <h1 className="mb-1 text-3xl font-semibold ">
                      Share your feedback!
                    </h1>
                    <h1 className="mb-4 text-lg text-gray-600">
                      We'd love to hear your thoughts.
                    </h1>
                  </div>
                )}
              </>
              <textarea
                id="about"
                name="about"
                rows={6}
                readOnly={reviewed}
                onChange={(e) => setFeedback(e.target.value as string)}
                value={reviewed ? review?.at(0)?.comment : feedback}
                className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              />

              <div className="flex items-center mt-4">
                <div className="flex items-center mr-auto">
                  {reviewed
                    ? Array.from(Array(review?.at(0)?.rating)).map((x, i) => (
                        <BsFillStarFill
                          size={20}
                          key={i}
                          className={`mr-1 ${
                            i < (review?.at(0)?.rating as number)
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))
                    : Array.from(Array(5)).map((x, i) => (
                        <BsFillStarFill
                          onClick={() => setCurrRating(i + 1)}
                          size={20}
                          key={i}
                          className={`mr-1 hover:cursor-pointer ${
                            i < currRating ? "text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                </div>
                {reviewed ? null : (
                  <button
                    className="px-3 py-1 text-lg font-semibold text-white bg-green-500 rounded-lg"
                    onClick={async () => {
                      await axios.post(
                        `${process.env.NEXT_PUBLIC_DOMAIN}/api/kitchen/${data?.id}/review`,
                        {
                          rating: currRating,
                          comment: feedback,
                        }
                      );
                      setFeedback("");
                      setCurrRating(0);
                      await router.reload();
                    }}
                  >
                    Send
                  </button>
                )}
              </div>
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
