import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DisplayMap from "../../components/map";
import { BsFillStarFill } from "react-icons/bs";

export default function ViewKitchen(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { data } = props;

  return (
    <div className=" py-6 px-24 ">
      <div>
        <h1 className="text-gray-900 text-3xl font-semibold mb-6">
          {data?.location}
        </h1>
        <div className="flex items-center mb-10">
          <Image
            src={data?.owner.image as string}
            width={70}
            height={70}
            className="rounded-full"
            alt={data?.owner.image as string}
          />
          <div className="ml-4 flex flex-col">
            <h1 className="text-2xl">Hosted by {data?.owner.name}</h1>
            <div className="flex items-center">
              <h1 className="text-md mr-2">
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
      </div>

      <div className="grid grid-cols-2 shadow-lg rounded-xl flex-col items-center justify-center">
        <div>
          <img
            className="rounded-l-xl border-r-2 border-green-400"
            src={data?.photo}
          />
        </div>
        <DisplayMap />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const kitchenId = context.query.kitchenId;

  const data = await prisma.kitchen.findUnique({
    where: {
      id: kitchenId as string,
    },
    include: {
      Review: true,
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
