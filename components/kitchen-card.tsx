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
    <>
      <Link href={`/kitchen/${kitchen.id}`} passHref>
        <div className="inline-flex flex-col gap-1 m-2 mb-4 hover:cursor-pointer max-w-72 ">
          <img
            className="transition-all rounded-md drop-shadow-md hover:scale-105"
            src={kitchen.photo}
          />
          <div className="flex flex-row items-center mt-2 text-md ">
            <MapPinIcon className="text-green-500 size-5" />
            <h1>
              {kitchen.location.length < 31
                ? kitchen.location
                : kitchen.location.slice(0, 31) + "..."}
            </h1>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CalendarDaysIcon className="text-green-500 size-5" />
            <p className="text-sm">
              {kitchen.start.toLocaleDateString()} -{" "}
              {kitchen.end.toLocaleDateString()}
            </p>
          </div>
          <div className="">
            {appliances.map((appliance, i) => (
              <div className="inline py-1 my-1 text-sm text-white " key={i}>
                <div className="inline-block px-2 py-1 mb-1 mr-2 bg-green-500 rounded-lg ">
                  <p className="inline">{appliance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};

export default KitchenCard;
