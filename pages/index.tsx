import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="h-screen flex items-center justify-center flex-col text-3xl">
      {session?.user ? (
        <>
          <h1>Hello {session.user.name}</h1>
          <button onClick={() => signOut()} className="text-3xl mt-4">
            Sign Out
          </button>
        </>
      ) : (
        <button className="text-red-500" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default Home;
