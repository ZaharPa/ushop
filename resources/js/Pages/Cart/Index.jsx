import { Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Minus, Plus, ShoppingCart } from "lucide-react";
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

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = item.discount
                ? item.price - item.price * (item.discount.percentage / 100)
                : item.price;
            return total + price * item.quantity;
        }, 0);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
            {errorMessage && (
                <div className="top-right-alert">{errorMessage}</div>
            )}

            <div className="flex items-center gap-3 mb-8">
                <ShoppingCart size={32} className="text-sky-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                    Shopping Cart
                </h1>
                {items.length > 0 && (
                    <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-bold">
                        {items.length} {items.length === 1 ? "item" : "items"}
                    </span>
                )}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <h2 className="h2-center">Your cart is empty</h2>
                    <Link href={route("catalog.index")} className="btn-primary">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => {
                            const price = item.discount
                                ? item.price -
                                  item.price * (item.discount.percentage / 100)
                                : item.price;

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white border border-gray-200 rounded-xl p-4 hover: shadow-md transition-shadow"
                                >
                                    <div className="flex gap-4">
                                        {item.product.photo_url && (
                                            <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                                                <img
                                                    src={item.product.photo_url}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <Link
                                                href={route("product.show", [
                                                    item.product.id,
                                                    item.id,
                                                ])}
                                                className="font-semibold text-lg text-gray-900 hover:text-sky-600 transition-colors"
                                            >
                                                {item.product.name}
                                            </Link>

                                            <div className="mt-2">
                                                {item.discount ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl font-bold text-red-600">
                                                            ${price.toFixed(2)}
                                                        </span>
                                                        <span className="text-sm line-through text-gray-400">
                                                            ${item.price}
                                                        </span>
                                                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                            {
                                                                item.discount
                                                                    .percentage
                                                            }
                                                            %
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-bold text-gray-900">
                                                        ${item.price}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center border border-gray-300 transition-colors">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        className="px-3 py-2 hover:bg-gray-100"
                                                        disabled={
                                                            item.quantity <= 1
                                                        }
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        min="1"
                                                        onChange={(e) =>
                                                            updateQuantity(
                                                                item.id,
                                                                parseInt(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className="w-16 text-center border border-gray-300 font-semibold rounded px-2 py-1"
                                                    />

                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        className="px-3 py-2 hover:bg-gray-100"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() =>
                                                        remove(item.id)
                                                    }
                                                    className="btn-danger"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">
                                                SubTotal
                                            </p>
                                            <p className="text-xl font-bold text-gray-900">
                                                $
                                                {(
                                                    price * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div>
                        <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-6 sticky top-24">
                            <h2 className="h2-center">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>SubTottal</span>
                                    <span className="font-semibold">
                                        ${calculateTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={route("checkout.index")}
                                className="btn-primary mb-2"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                href={route("catalog.index")}
                                className="btn-secondary"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
