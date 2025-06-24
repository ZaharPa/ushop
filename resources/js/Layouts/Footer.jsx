import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-sky-900 text-white mt-8 py-2">
            <div className="max-w-full mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <p>&copy; {new Date().getFullYear()} ZP. All right reserved.</p>

                <div className="flex gap-4">
                    <Link href="#">Privacy</Link>
                    <Link href="#">Terms</Link>
                </div>

                <div className="flex gap-4">
                    <div>Email: ushop@mail.com</div>
                    <div>Phone: +1 234 56 78</div>
                    <div>Instagram: @ushop</div>
                </div>
            </div>
        </footer>
    );
}
