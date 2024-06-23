import { signIn, signOut, useSession } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  return (
    <>
      {/* <>
      <h1>Hello {session.user.name}</h1>
      <button onClick={() => signOut()} className="mt-4 text-xl">
        Sign Out
      </button>
      </> */}
  
    </>
  )
}

export default Landing;