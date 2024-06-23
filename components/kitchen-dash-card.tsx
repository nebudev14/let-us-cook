import { StarIcon } from "@heroicons/react/24/solid";

const KitchenDashCard = () => {
    return (
        <div className="flex flex-row gap-10 text-zinc-700">
            <img className="object-cover w-1/4 rounded-md" src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <h3 className="text-3xl font-bold">The Waffle House</h3>
                    <div className="flex flex-row">
                        <StarIcon className="w-5 text-green-500"/>
                        <StarIcon className="w-5 text-green-500"/>
                        <StarIcon className="w-5 text-green-500"/>
                        <StarIcon className="w-5 text-green-500"/>
                        <StarIcon className="w-5 text-green-500"/>
                    </div>
                </div>
                
                <div className="flex flex-row flex-wrap gap-10">
                    <div className="flex flex-col w-72">
                        <p className="font-medium text-green-500 underline">Current bookings</p>
                        <p className="underline underline-offset-4 decoration-green-500">USER | 6/12/24 from 6:00pm - 8:00pm</p>
                        <p>USER | 6/12/24 from 6:00pm - 8:00pm</p>
                        <p>USER | 6/12/24 from 6:00pm - 8:00pm</p>
                    </div>
                    <div className="flex flex-col w-48">
                        <p className="font-medium text-green-500 underline">Features</p>
                        <p>Fridge | Microwave | Rice Cooker | Stove | Waffle Maker</p>
                    </div>
                    <div className="flex flex-col w-24">
                        <p className="font-medium text-green-500 underline">Cost</p>
                        <p>Food</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KitchenDashCard;