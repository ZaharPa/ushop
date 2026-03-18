import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Banknote, CheckCircle, CreditCard } from "lucide-react";
import { useState } from "react";

export default function Payment() {
    const { order } = usePage().props;

    const [method, setMethod] = useState("card");

    const handlePayment = () => {
        if (method === "cash") {
            axios
                .post(route("payment.cash"), { order_id: order.id })
                .then(() => router.visit(route("payment.success")));
        } else if (method === "card") {
            axios
                .post(route("payment.card"), {
                    order_id: order.id,
                    amount: order.total_price,
                })
                .then((res) => (window.location.href = res.data.redirect_url));
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 mb-8">
                <div className="md:col-span-2">
                    <div className="bg-white border border-sky-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Select Payment Method
                        </h3>

                        <div className="space-y-3">
                            <label
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                                    method === "card"
                                        ? "border-sky-500 bg-sky-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                <input
                                    type="radio"
                                    value="card"
                                    checked={method === "card"}
                                    onChange={() => setMethod("card")}
                                    className="w-5 h-5"
                                />
                                <CreditCard
                                    size={24}
                                    className="text-sky-600"
                                />
                                <span className="flex-1 font-semibold">
                                    Credit/Debit Card
                                </span>
                                {method === "card" && (
                                    <CheckCircle
                                        size={20}
                                        className="text-sky-600"
                                    />
                                )}
                            </label>

                            <label
                                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                                    method === "cash"
                                        ? "border-sky-500 bg-sky-50"
                                        : "border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                <input
                                    type="radio"
                                    value="cash"
                                    checked={method === "cash"}
                                    onChange={() => setMethod("cash")}
                                    className="w-5 h-5"
                                />
                                <Banknote size={24} className="text-sky-600" />
                                <span className="flex-1 font-semibold">
                                    Cash on Delivary
                                </span>
                                {method === "cash" && (
                                    <CheckCircle
                                        size={20}
                                        className="text-sky-600"
                                    />
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-6 shadow-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Order Summary
                        </h3>
                        <div className="space-y-3 text-sm mb-6">
                            <div>
                                <span className="text-gray-600">Name:</span>
                                <p className="font-semibold">{order.name}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Address:</span>
                                <p className="font-semibold">{order.address}</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Total:</span>
                                <p className="font-semibold">
                                    ${Number(order.total_price).toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => handlePayment()}
                            className="mt-4 btn-primary"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
