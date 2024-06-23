import { FaLeaf } from "react-icons/fa";
import KitchenDashCard from "../components/kitchen-dash-card";
import RegisterButton from "../components/register-button";
import Nav from "../components/nav";

export default function KitchensDashboard() {
  return (
    <>
      <Nav page="host-kitchen" />

      <div className="h-screen px-10 py-6 mx-auto max-w-screen-2xl text-zinc-700">
        <h1 className="mb-6 text-xl font-bold text-green-500">My Kitchens</h1>
        <div className="flex flex-col gap-8">
          <KitchenDashCard />
          <hr className="border-zinc-700" />
          <KitchenDashCard />
        </div>

        <RegisterButton />
      </div>
    </>
  );
}
