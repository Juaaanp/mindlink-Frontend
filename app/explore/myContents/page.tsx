'use client';

import NavBarAuth from "@/components/NavBarAuth";

export default function MyContents() {

    return (
        <div>
            <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] shadow-md">
                <NavBarAuth />
            </header>
            <div className="pt-24">
                <h1>My Contents</h1>
            </div>
        </div>
    );
}