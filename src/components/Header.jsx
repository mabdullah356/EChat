import React from 'react';
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/react";
import BotTestIamge from "../assets/AiBotTestImg.jpg";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-50">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img src={BotTestIamge} alt="EChat Logo" className="w-10 h-10 object-cover rounded-full shadow-sm" />
                <h1 className="text-xl font-bold text-black tracking-tight">EChat</h1>
            </div>

            <div className="flex items-center gap-4">
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <button className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                            Login
                        </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="px-5 py-2 text-sm font-bold text-white bg-black rounded-sm hover:bg-zinc-800 transition-all active:scale-95 shadow-sm">
                            Sign up
                        </button>
                    </SignUpButton>
                </Show>
                <Show when="signed-in">
                    <UserButton afterSignOutUrl="/" />
                </Show>
            </div>
        </header>
    );
};

export default Header;