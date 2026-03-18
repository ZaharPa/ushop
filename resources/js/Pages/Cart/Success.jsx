import { Link } from "@inertiajs/react";
import { CheckCircle, Home } from "lucide-react";

export default function Success() {
    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-2xl p-8 text-center">
                <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={48} className="text-white" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Order Placed Sucessfullly!
                </h1>

                <p className="text-xl text-gray-700 mb-8">
                    Thank you for you purchase. We will keep you updated on the
                    status of your order.
                </p>

                <Link
                    href={route("main")}
                    className="btn-primary flex items-center justify-center gap-2"
                >
                    <Home size={20} />
                    <span>Back to home</span>
                </Link>
            </div>
        </div>
    );
}
