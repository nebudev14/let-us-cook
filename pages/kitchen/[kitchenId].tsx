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
            src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
