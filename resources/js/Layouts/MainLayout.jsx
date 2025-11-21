import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import SearchBox from "@/Components/SearchBox";

export default function MainLayout({ children }) {
    const { flash, auth, site_name, layoutLinks, categories } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);

    useEffect(() => {
        if (flash.success) {
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [flash.success]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            <header className="sticky top-0 z-40 bg-sky-600/90 backdrop-blur-md shadow-md">
                <div className="flex items-center justify-between px-4 py-2 md:px-8 lg-px-16 text-white shadow-sm text-base md:text-lg">
                    <Link
                        href={route("main")}
                        className="text-xl md:text-2xl mr-4 font-bold header-link "
                    >
                        {site_name || "USHOP"}
                    </Link>
                    <div className="flex gap-4">
                        <Link href={route("aboutUs")} className="header-link">
                            About us
                        </Link>
                        <Link href={route("help")} className="header-link ">
                            Help
                        </Link>
                    </div>

                    <div className="flex-1 max-w-md mx-4">
                        <SearchBox />
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={route("cart.show")}>
                            <ShoppingCart className="w-7 h-7 header-link" />
                        </Link>
                    </div>

                    {auth.user ? (
                        <div className="relative flex items-center gap-4">
                            {Boolean(auth.user.is_admin) && (
                                <Link
                                    href={route("admin.dashboard")}
                                    className="header-link "
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <div className="relative">
                                <CircleUserRound
                                    className="w-8 h-8 header-link cursor-pointer transition-colors"
                                    onMouseEnter={() => setUserMenu(!userMenu)}
                                />
                                {userMenu && (
                                    <div className="absolute top-full right-0 w-30 z-50 bg-white text-sky-800 rounded shadow flex flex-col items-start p-2 mt-1">
                                        <Link
                                            href={route("profile.show")}
                                            onClick={() => setUserMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            {auth.user.name}
                                        </Link>

                                        <Link
                                            href={route("logout")}
                                            method="delete"
                                            as="button"
                                            onClick={() => setUserMenu(false)}
                                            className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link href={route("login")} className="header-link">
                                Login
                            </Link>
                            <span className="text-emerald-50">|</span>
                            <Link
                                href={route("register.create")}
                                className="header-link"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                <div className="relative flex justify-around px-4 md:px-8 lg:px-16 bg-sky-700 text-sky-50">
                    <div
                        className="relative"
                        onMouseEnter={() => setCatalogOpen(true)}
                        onMouseLeave={() => setCatalogOpen(false)}
                    >
                        <span className="cursor-pointer hover:underline">
                            Catalog
                        </span>

                        {catalogOpen && (
                            <div className="absolute top-full left-0 w-48 bg-white border font-semibold text-sky-800 rounded text-sm grid grid-cols-2 lg:grid-cols-3 gap-1 ">
                                <Link
                                    href={route("catalog.index")}
                                    className="col-span-2 lg:col-span-3 block p-2 hover:bg-sky-100 hover:text-sky-900 text-center"
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
                                        className="block p-1 hover:bg-sky-100 hover:text-sky-900 text-center"
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
