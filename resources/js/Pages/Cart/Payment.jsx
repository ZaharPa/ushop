import { router, usePage } from "@inertiajs/react";
import axios from "axios";
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
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-2/3">
                <h3 className="text-lg font-semibold mb-2">
                    Select Payment Method
                </h3>
                <div className="flex gap-4 items-center">
                    <label>
                        <input
                            type="radio"
                            value="cash"
                            checked={method === "cash"}
                            onChange={() => setMethod("cash")}
                        />
                        <span className="p-1">Cash on Delivary</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="card"
                            checked={method === "card"}
                            onChange={() => setMethod("card")}
                        />
                        <span className="p-1">Credit/Debit Cart</span>
                    </label>
                </div>
            </div>
            <div className="md:w-1/3 rounded shadow p-4 h-fit">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div>{order.name}</div>
                <div>{order.address}</div>
                <div>{order.total_price}</div>

                <button
                    onClick={() => handlePayment()}
                    className="mt-4 btn-primary"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}
