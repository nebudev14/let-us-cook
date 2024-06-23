import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import DisplayMap from "../../components/map";

export default function ViewKitchen(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { data } = props;

  return (
    <div className=" py-6 px-24 ">
      <div>
        <h1 className="text-gray-900 text-3xl font-semibold mb-12">
          {data?.location}
        </h1>
        <div className="">

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
    },
  });

  return {
    props: {
      data: data,
    },
  };
}
