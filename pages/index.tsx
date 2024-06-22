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
    <div className="h-screen flex items-center justify-center flex-col text-3xl">
      {session?.user ? (
        <>
          <h1>Hello {session.user.name}</h1>
          <button onClick={() => signOut()} className="text-xl mt-4">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1 className="text-bold text-6xl text-green-600 mb-8">
            Let Us Cook
          </h1>
          <button
            className="text-white py-4 px-6 rounded-lg bg-pink-500"
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
