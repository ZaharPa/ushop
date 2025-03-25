import { Link } from "@inertiajs/react";

export default function MainLayout({ children }) {
    return (
        <>
            <header>
                <div>
                    <Link href={route("/")}>Home</Link>
                    <Link href="#">About us</Link>
                    <Link href="#">Help</Link>
                    <span>
                        <span>Search</span>
                    </span>
                    <Link href="#">Cart</Link>
                    <Link href={route("login")}>Login</Link>
                    <Link href="#">Register</Link>
                </div>

                <div>
                    <Link href="#">Smartphones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Tablets</Link>
                    <Link href="#">Smartwatches</Link>
                    <Link href="#">Headphones</Link>
                </div>
            </header>
            <main>{children}</main>
        </>
    );
}
