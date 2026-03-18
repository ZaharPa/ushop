import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { CircleUserRound, Menu, ShoppingCart, X } from "lucide-react";
import SearchBox from "@/Components/SearchBox";

export default function MainLayout({ children }) {
    const { flash, auth, site_name, layoutLinks, categories } = usePage().props;
    const [showFlash, setShowFlash] = useState(true);
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <header className="sticky top-0 z-40 bg-sky-600 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between px-4 py-2 md:px-8 lg-px-16 text-white shadow-sm md:text-lg">
                        <Link
                            href={route("main")}
                            className="text-2xl md:text-3xl font-bold header-link whitespace-nowrap"
                        >
                            {site_name || "USHOP"}
                        </Link>

                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <SearchBox />
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <Link
                                href={route("aboutUs")}
                                className="header-link"
                            >
                                About us
                            </Link>
                            <Link href={route("help")} className="header-link">
                                Help
                            </Link>

                            <Link href={route("cart.show")}>
                                <ShoppingCart className="w-7 h-7 header-link cursor-pointer" />
                            </Link>

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
                                            onMouseEnter={() =>
                                                setUserMenu(!userMenu)
                                            }
                                        />
                                        {userMenu && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() =>
                                                        setUserMenu(false)
                                                    }
                                                />
                                                <div className="absolute top-full right-0 mt-2 w-48 z-50 bg-white text-sky-800 rounded-lg shadow-xl border border-sky-200 py-2">
                                                    <div className="px-4 py-2 border-b border-gray-200">
                                                        <p className="font-semibold text-sm text-gray-900 truncate">
                                                            {auth.user.name}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={route(
                                                            "profile.show",
                                                        )}
                                                        onClick={() =>
                                                            setUserMenu(false)
                                                        }
                                                        className="block px-4 py-2 text-sm hover:bg-sky-50 transition-colors"
                                                    >
                                                        Profile
                                                    </Link>

                                                    <Link
                                                        href={route("logout")}
                                                        method="delete"
                                                        as="button"
                                                        onClick={() =>
                                                            setUserMenu(false)
                                                        }
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        Log Out
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route("login")}
                                        className="header-link"
                                    >
                                        Login
                                    </Link>
                                    <span className="text-sky-200">|</span>
                                    <Link
                                        href={route("register.create")}
                                        className="header-link"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="md:hidden flex items-center gap-3">
                            <Link href={route("cart.show")}>
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </Link>
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="text-white p-2 hover:bg-sky-700 rounded transition-colors"
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:hidden px-4 pb-3">
                    <SearchBox />
                </div>

                <div className="flex justify-center items-center gap-8 px-4 md:px-8 lg:px-16 bg-sky-700 text-sky-50">
                    <div
                        className="relative"
                        onMouseEnter={() => setCatalogOpen(true)}
                        onMouseLeave={() => setCatalogOpen(false)}
                    >
                        <span className="cursor-pointer font-medium hover:underline">
                            Catalog
                        </span>

                        {catalogOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[200px] md:min-w-[500px] bg-white  font-semibold text-sky-800 rounded-lg text-sm shadow-xl border-2 border-sky-200 p-4 z-50">
                                <Link
                                    href={route("catalog.index")}
                                    className="block p-3 text-sky-800 font-bold hover:bg-sky-50 rounded-lg transition-colors mb-2"
                                >
                                    All Products
                                </Link>
                                <div className="hidden md:grid grid-cols-3 gap-2">
                                    {(categories ?? []).map((category) => (
                                        <Link
                                            key={category.id}
                                            href={
                                                route("catalog.index") +
                                                `?category=${category.slug}`
                                            }
                                            className="block p-2 text-sm text-sky-800 hover:bg-sky-50 hover:text-sky-900 rounded transition-colors text-center"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {layoutLinks.map((link) => (
                        <Link
                            key={link.url}
                            href={link.url}
                            className="font-medium header-link py-2 hover:underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </header>

            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed top-0 right-0 bottom-0 w-64 z-50 overflow-y-auto bg-sky-700 border-t border-sky-500">
                        <div className="flex items-center justify-between p-4 border-b border-sky-600">
                            <span className="text-white font-bold text-lg">
                                Menu
                            </span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white p-2 hover:bg-sky-600 rounded transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="px-4 py-3 space-y-2">
                            <Link
                                href={route("aboutUs")}
                                className="block py-2 header-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link
                                href={route("help")}
                                className="block py-2 header-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Help
                            </Link>
                            <Link
                                href={route("cart.show")}
                                className="block py-2 header-link"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Shopping Cart
                            </Link>
                            {auth.user ? (
                                <>
                                    {Boolean(auth.user.is_admin) && (
                                        <Link
                                            href={route("admin.dashboard")}
                                            className="block py-2 header-link"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link
                                        href={route("profile.show")}
                                        className="block py-2 header-link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Profile ({auth.user.name})
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="delete"
                                        as="button"
                                        className="block py-2 header-link text-red-200 hover:text-red-300 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="block py-2 header-link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register.create")}
                                        className="block py-2 header-link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}

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
