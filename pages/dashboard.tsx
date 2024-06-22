import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Dashboard: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: session } = useSession();
  console.log(props?.data);

  return (
    <div className="h-screen px-10 py-6 ">
      <h1 className="mb-6 text-xl">
        Welcome, {session?.user?.name?.split(" ")[0]}
      </h1>
      <div className="grid grid-flow-col grid-rows-3 gap-6">
        <div className="w-full row-span-3 p-6 border-2 rounded-lg shadow-md">
          Loasdfsa Loasdfsa Loasdfsa{" "}
        </div>
        <div className="col-span-2 p-4 border-2 rounded-xl">02</div>
        <div className="col-span-2 row-span-2 p-4 border-2 rounded-xl">03</div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const data = await prisma.user.findUnique({ where: { id: session?.user.id } })

  return {
    props: {
      data: data,
    },
  };
};

export default Dashboard;
