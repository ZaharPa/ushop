import { Link, usePage } from "@inertiajs/react";

export default function MainLayout({ children }) {
    const { flash, auth } = usePage().props;

    return (
        <>
            <header>
                <div className="flex justify-center gap-2 md:gap-8 lg:gap-16 bg-sky-500 text-emerald-200 shadow-xs text-lg py-1">
                    <Link
                        href={route("main")}
                        className="text-xl font-bold hover:text-emerald-100 hover:underline"
                    >
                        USHOP
                    </Link>
                    <div className="flex gap-4">
                        <Link
                            href="#"
                            className="hover:underline hover:text-emerald-100"
                        >
                            About us
                        </Link>
                        <Link
                            href="#"
                            className="hover:underline hover:text-emerald-100"
                        >
                            Help
                        </Link>
                    </div>
                    <div>
                        <div className="relative w-full max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Seacrh ..."
                                className="w-full text-sky-600 pl-2  bg-white rounded-2xl border border-gray-500 shadow-sm focus:border-emerald-200 transition"
                            />
                            <img
                                src="https://img.icons8.com/?size=25&id=KPmthqkeTgDN&format=png&color=000000"
                                className="absolute right-3 top-1 "
                            />
                        </div>
                    </div>
                    <Link href="#">
                        <img
                            src="https://img.icons8.com/?size=23&id=53721&format=png&color=000000"
                            className="bg-white p-1 rounded-full"
                            alt="Cart"
                        />
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
                                to={route("login")}
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

                <div className="flex justify-between px-4 md:px-8 lg:px-16 bg-sky-700 text-emerald-100">
                    <Link href="#" className="hover:underline">
                        Smartphones
                    </Link>
                    <Link href="#" className="hover:underline">
                        Laptops
                    </Link>
                    <Link href="#" className="hover:underline">
                        Tablets
                    </Link>
                    <Link href="#" className="hover:underline">
                        Smartwatches
                    </Link>
                    <Link href="#" className="hover:underline">
                        Headphones
                    </Link>
                </div>
            </header>
            <main>
                {flash.success && (
                    <div className=" w-fit mx-auto border border-dashed border-emerald-400 font-medium text-center p-6 m-3 bg-emerald-50 text-emerald-900 text-lg">
                        {flash.success}
                    </div>
                )}
                {children}
            </main>
        </>
    );
}
