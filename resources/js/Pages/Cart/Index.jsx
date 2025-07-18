import { Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Cart() {
    const { items } = usePage().props;
    const [errorMessage, setErrorMessage] = useState("");

    const updateQuantity = (id, quantity) => {
        axios
            .patch(route("cart.update", id), {
                quantity: quantity,
            })
            .then(() => {
                router.reload({ only: ["items"] });
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrorMessage(error.response.data.message);
                    setTimeout(() => setErrorMessage(""), 3000);
                }
            });
    };

    const remove = (id) => {
        axios.delete(route("cart.remove", id)).then(() => {
            router.reload({ only: ["items"] });
        });
    };

    return (
        <div>
            {errorMessage && (
                <div className="top-right-alert">{errorMessage}</div>
            )}

            <h2 className="text-2xl font-bold text-sky-800">Your Cart</h2>

            {items.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
            ) : (
                <>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b py-3 px-2 mb-3"
                        >
                            <div>
                                <div>{item.product.name}</div>
                                <div className="text-gray-500 text-sm">
                                    ${item.price}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) =>
                                        updateQuantity(
                                            item.id,
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="w-16 border rounded px-2 py-1"
                                />

                                <button
                                    onClick={() => remove(item.id)}
                                    className="btn-delete"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <Link href={route("checkout.index")} className="btn-admin">
                        Checkout
                    </Link>
                </>
            )}
        </div>
    );
}
