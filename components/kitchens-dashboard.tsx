import { FaLeaf } from "react-icons/fa";
import KitchenDashCard from "./kitchen-dash-card";

export default function KitchensDashboard() {
    return (
        <div className="h-screen px-10 py-6 max-w-screen-2xl mx-auto text-zinc-700">
            <div className="flex flex-col gap-8">
                <KitchenDashCard />
                <hr className="border-zinc-700"/>
                <KitchenDashCard />
            </div>

            <button className="sticky bottom-[10vh] left-[50vw] -translate-x-1/2 last:flex flex-row gap-5 items-center px-7 py-3 bg-green-500  drop-shadow-[0_2px_3px_rgba(72,72,72,0.5)] rounded-xl">
                <h2 className="text-2xl text-white">New Kitchen</h2>
                <FaLeaf className="text-white text-3xl"/>
            </button>
        </div>

    )
}