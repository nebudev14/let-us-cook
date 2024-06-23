import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import RegisterKitchen from "./register-kitchen";

const RegisterButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed flex bottom-[30px] right-[30px] z-10 flex-row gap-5 items-center p-5 bg-white border-4 border-green-500 shadow-xl rounded-xl text-green-500 hover:bg-green-500 hover:text-white transition-all"
            >
                <span className="text-2xl text-inherit">New Kitchen</span>
                <FaLeaf className="text-3xl text-inherit" />
            </button>

            {isOpen &&
                <>
                    <div
                    onClick={() => setIsOpen(false)}
                    className="fixed top-0 z-10 w-screen h-screen backdrop-blur-2xl"></div>
                    <RegisterKitchen closeSelf={() => setIsOpen(false)} />
                </>}
        </>
    );
}

export default RegisterButton;