import { MapPinIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

const KitchenCard = () => {
    return (
        <div className="flex flex-col gap-1 max-w-56">
            <img className="drop-shadow-md rounded-md" src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <h3 className="text-xl">Jonny's Kitchen</h3>
            <div className="flex flex-row items-center gap-2">
                <MapPinIcon className="size-5 text-green-500"/>
                <p className="text-sm">130-50 Mulberry Avenue</p>
            </div>
            <div className="flex flex-row items-center gap-2">
                <CalendarDaysIcon className="size-5 text-green-500" />
                <p className="text-sm">6:00pm - 9:00pm</p>
            </div>
        </div>
    )
}

export default KitchenCard;