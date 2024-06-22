import { FaFire } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Nav: React.FC = () => {
  return (
    <div className="flex items-center px-8 py-4 mt-4 border-2 rounded-full border-zinc-100">
      <FaFire size={30} className="mr-4 text-green-500" />
      <h1 className="mr-10 font-semibold">Lettuce Cook</h1>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                ⌘E
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Duplicate
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>
          <div className="h-px my-1 bg-white/5" />
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                ⌘A
              </kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Nav;
