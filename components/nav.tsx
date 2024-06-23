import { FaLeaf } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/router";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Nav: React.FC<{
  page: string;
}> = ({ page }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row items-center justify-between px-8 py-4 mt-4 w-full text-zinc-700 ">
        <div className="flex flex-row basis-28 grow align-middle">
          <FaLeaf size={30} onClick={() => router.push("/dashboard")} className="mr-4 text-green-500 hover:cursor-pointer"  />
          <h1 className="mr-10 text-xl logo-font">Lettuce Cook</h1>
        </div>
        <div className="flex flex-row basis-28 justify-center items-center gap-5 grow">
          <h2 onClick={() => router.push("/dashboard")} className={page === "find-kitchen" ? "green-underlined" : "hoverable"}>Find a Kitchen</h2>
          <div className="h-10 border-r-2 border-green-500"></div>
          <h2 onClick={() => router.push("/kitchens-dashboard")} className={page === "host-kitchen" ? "green-underlined" : "hoverable"}>Host a Kitchen</h2>
        </div>
        <div className="flex flex-row basis-28 justify-end grow">
          <UserCircleIcon className="text-green-500 w-10"/>
        </div>
      </div>  
      <hr className="mx-8"/>  
    </>

  );
};

export default Nav;
