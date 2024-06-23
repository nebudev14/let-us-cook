import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaLeaf } from "react-icons/fa";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen text-3xl text-white">
      
        {session?.user ? (
          <div>
            {/* {router.push("/dashboard")} */}
            <button onClick={() => signOut()} className="mt-4 text-xl text-zinc-700">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <div className="fixed h-screen w-screen bg-cover bg-center blur-sm bg-[url('https://images.unsplash.com/photo-1652918320926-3ea79953c717?q=80&w=2514&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>
            <div className="fixed h-screen w-screen bg-white/[0.5]"></div>
            <div className="fixed h-screen w-screen bg-cover lettuce-clipped bg-[url('https://images.unsplash.com/photo-1652918320926-3ea79953c717?q=80&w=2514&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"></div>

            <div className="flex flex-col items-center justify-center h-screen w-screen">

              <div className="blur-none ml-auto mr-56 flex flex-col gap-12">
                <div className="flex flex-row align-middle justify-middle m-auto" >
                  <FaLeaf size={30} className="mr-4 text-green-500 " />
                  <h1 className="mr-10 text-xl logo-font text-zinc-700">Lettuce Cook</h1>
                </div>
                <h1 className="text-zinc-700">Welcome to Lettuce Cook!</h1>
                <button onClick={() => signIn()} className="mt-4 text-xl bg-green-500 px-5 py-3 rounded-xl">
                  Sign In
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Home;
