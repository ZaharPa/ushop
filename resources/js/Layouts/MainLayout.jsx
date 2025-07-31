import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Search, ShoppingCart } from "lucide-react";
import SearchBox from "@/Components/SearchBox";

export default function MainLayout({ children }) {
    const { flash, auth, layoutLinks, categories } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);
    const [catalogOpen, setCatalogOpen] = useState(false);

    useEffect(() => {
        if (flash.success) {
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-40">
                <div className="flex justify-center gap-2 md:gap-8 lg:gap-16 bg-sky-500 text-emerald-200 shadow-xs text-lg py-1">
                    <Link
                        href={route("main")}
                        className="text-xl font-bold hover:text-emerald-100 hover:underline"
                    >
                        USHOP
                    </Link>
                    <div className="flex gap-4">
                        <Link
                            href={route("aboutUs")}
                            className="hover:underline hover:text-emerald-100"
                        >
                            About us
                        </Link>
                        <Link
                            href={route("help")}
                            className="hover:underline hover:text-emerald-100"
                        >
                            Help
                        </Link>
                    </div>
                    <div>
                        <div className="relative w-full max-w-md mx-auto">
                            <SearchBox />
                        </div>
                    </div>
                    <Link
                        href={route("cart.show")}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full"
                    >
                        <ShoppingCart className="w-6 h-6 text-blue-600 hover:text-emerald-500" />
                    </Link>
                    {auth.user ? (
                        <Link
                            href={route("logout")}
                            method="delete"
                            as="button"
                            className="hover:underline hover:text-emerald-100"
                        >
                            Log Out
                        </Link>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                href={route("login")}
                                className="hover:underline hover:text-emerald-100"
                            >
                                Login
                            </Link>
                            <span>|</span>
                            <Link
                                href={route("register.create")}
                                className="hover:underline hover:text-emerald-100"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                <div className="relative flex justify-around px-4 md:px-8 lg:px-16 bg-sky-700 text-emerald-100">
                    <div
                        className="relative"
                        onMouseEnter={() => setCatalogOpen(true)}
                        onMouseLeave={() => setCatalogOpen(false)}
                    >
                        <span className="cursor-pointer hover:underline">
                            Catalog
                        </span>

                        {catalogOpen && (
                            <div className="absolute top-full left-0 w-48 bg-white text-sky-800 rounded text-sm grid grid-cols-2 gap-1 ">
                                <Link
                                    href={route("catalog.index")}
                                    className="col-span-2 block p-2 font-semibold  bg-teal-50 hover:bg-teal-100 hover:text-sky-900 text-center"
                                >
                                    All Products
                                </Link>
                                {(categories ?? []).map((category) => (
                                    <Link
                                        key={category.id}
                                        href={
                                            route("catalog.index") +
                                            `?category=${category.slug}`
                                        }
                                        className="block p-1 bg-teal-50 hover:bg-teal-100 hover:text-sky-900 text-center"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {layoutLinks.map((link) => (
                        <Link
                            key={link.url}
                            href={link.url}
                            className="hover:underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </header>
            <main className="flex-1">
                {flash.success && showFlash && (
                    <div className="fixed top-25 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 border border-dashed border-emerald-400 font-medium text-center p-6 m-3 bg-emerald-50 text-emerald-900 text-lg">
                        {flash.success}
                    </div>
                )}
                {children}
            </main>

            <Footer />
        </div>
    );
}
