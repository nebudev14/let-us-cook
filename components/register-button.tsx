import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import RegisterKitchen from "./register-kitchen";

const RegisterButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
            onClick={() => setIsOpen(true)}
            className="fixed flex bottom-[30px] right-[30px] z-10 flex-row gap-5 items-center p-5 bg-white border-4 border-green-500 shadow-xl rounded-xl hover:bg-green-500 hover:border-green-400 transition-all"
            >
                <span className="text-2xl text-black">New Kitchen</span>
                <FaLeaf className="text-black text-3xl" />
            </button>

            {isOpen && <RegisterKitchen closeSelf={() => setIsOpen(false)} className="transition-all"/>}
        </>
    );
}

export default RegisterButton;