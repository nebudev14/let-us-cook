const Landing: React.FC<{
    username: string;
}> = ({username}) => {
    return (
        <>
          <h1>Hello {username}</h1>
          {/* <button onClick={() => signOut()} className="text-xl mt-4">
            Sign Out
          </button> */}
        </>
    )
}

export default Landing;