import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-3xl">
      {session?.user ? (
        <>
          <h1>Hello {session.user.name}</h1>
          <button onClick={() => signOut()} className="mt-4 text-xl">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="mb-8 text-6xl text-green-600 text-bold">
            Let Us Cook
          </h1>
          <button
            className="px-6 py-4 text-white bg-pink-500 rounded-lg"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
