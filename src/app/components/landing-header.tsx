import Image from "next/image";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src="/vedalogo.svg"
                        alt="Veda Logo"
                        width={48}
                        height={48}
                        className="w-auto h-12"
                    />
                </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-12">
                <Link href="#" className="text-sm font-bold text-gray-600 hover:text-black tracking-wide">HOME</Link>
                <Link href="#" className="text-sm font-bold text-gray-600 hover:text-black tracking-wide">FEATURES</Link>
                <Link href="#" className="text-sm font-bold text-gray-600 hover:text-black tracking-wide">ABOUT</Link>
                <Link href="#" className="text-sm font-bold text-gray-600 hover:text-black tracking-wide">CONTACT</Link>
            </nav>
            <div>
                <Link href="/login">
                    <button className="bg-[#1e1b3a] text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-[#2d2952] transition-colors">
                        LOGIN
                    </button>
                </Link>
            </div>
        </header>
    );
}
