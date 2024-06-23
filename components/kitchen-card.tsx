import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Kitchen } from "@prisma/client";
import Link from "next/link";

const KitchenCard: React.FC<{
  kitchen: Kitchen;
}> = ({ kitchen }) => {
  const appliances =
    kitchen.appliances.length > 3
      ? [
          ...kitchen.appliances.slice(0, 2),
          "+" + (kitchen.appliances.length - 2).toString(),
        ]
      : kitchen.appliances;
  return (
    <Link href={`/kitchen/${kitchen.id}`} passHref>
      <div className="inline-flex hover:cursor-pointer flex-col gap-1 m-2 max-w-72 ">
        <img className="drop-shadow-md rounded-md hover:scale-105 transition-all" src={kitchen.photo} />
        <div className="flex mt-2 text-md flex-row items-center ">
          <MapPinIcon className="size-5 text-green-500" />
          <h1>{kitchen.location}</h1>
        </div>
        <div className="flex flex-row items-center gap-2">
          <CalendarDaysIcon className="size-5 text-green-500" />
          <p className="text-sm">6:00pm - 9:00pm</p>
        </div>
        <div className="">
          {appliances.map((appliance, i) => (
            <div className="inline text-white py-1  my-1 text-sm " key={i}>
              <div className="inline-block py-1 px-2 mb-1 mr-2 rounded-lg bg-green-500 ">
                <p className="inline">{appliance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default KitchenCard;
