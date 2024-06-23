import { FaLeaf } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/router";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Nav: React.FC<{
  page?: string;
}> = ({ page }) => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-8 py-4 mt-4 text-zinc-700 ">
        <div
          className="flex flex-row align-middle basis-28 grow hover:cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <FaLeaf size={30} className="mr-4 text-green-500 " />
          <h1 className="mr-10 text-xl logo-font">Lettuce Cook</h1>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 basis-28 grow">
          <h2
            onClick={() => router.push("/dashboard")}
            className={`${
              page === "find-kitchen" ? "green-underlined" : "hoverable"
            } hover:cursor-pointer`}
          >
            Find a Kitchen
          </h2>
          <div className="h-10 border-r-2 border-green-500"></div>
          <h2
            onClick={() => router.push("/kitchens-dashboard")}
            className={`${
              page === "host-kitchen" ? "green-underlined" : "hoverable"
            } hover:cursor-pointer`}
          >
            My Kitchens
          </h2>
        </div>
        <div className="flex flex-row justify-end basis-28 grow">
          <Image
            src={session?.user.image as string}
            width={40}
            height={40}
            className="rounded-full"
            alt={session?.user.name as string}
          />
        </div>
      </div>
      <hr className="mx-8" />
    </>
  );
};

export default Nav;
