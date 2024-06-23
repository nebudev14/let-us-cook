import { FaLeaf } from "react-icons/fa";
import KitchenDashCard from "./kitchen-dash-card";
import RegisterButton from "./register-button";
import Nav from "../components/nav";

export default function KitchensDashboard() {
    return (
        <>
            <Nav page="host-kitchen"/>
            <div className="h-screen px-10 py-6 max-w-screen-2xl mx-auto text-zinc-700">
                <div className="flex flex-col gap-8">
                    <KitchenDashCard />
                    <hr className="border-zinc-700"/>
                    <KitchenDashCard />
                </div>

                <RegisterButton/>
            </div>
        </>
    )
}
