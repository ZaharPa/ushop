import { Link } from "@inertiajs/react";

export default function Success() {
    return (
        <div className="max-w-2xl mx-auto mt-24 p-10 bg-sky-100 rounded-2xl shadow text-center space-y-4">
            <h2 className="text-2xl font-semibold text-sky-800">
                Thanks for your shopping
            </h2>
            <div className="text-lg text-sky-700">
                We will keep you updated on the status of your order.
            </div>
            <Link href={route("main")} className="btn-primary">
                Back to home
            </Link>
        </div>
    );
}
