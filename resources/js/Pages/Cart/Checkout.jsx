import InputField from "@/Components/InputField";
import { useForm, usePage } from "@inertiajs/react";
import { CreditCard, MapPin, ShoppingBag } from "lucide-react";

export default function Checkout() {
    const { items, errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        name: "",
        phone: "",
        address: "",
        address2: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("checkout.store"));
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
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-8">
                <CreditCard size={32} className="text-sky-600" />
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white border border-sky-200 rounded-xl p-6 md:p-8 shadow-md">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin size={24} className="text-sky-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Shipping Information
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500 italic mb-4">
                            <span className="text-red-500">*</span> - required
                            fields
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4 text-sky-800"
                        >
                            <InputField
                                label="Your Name*"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <div className="text-center">
                                {errors.name && (
                                    <span className="text-red-500">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            <InputField
                                label="Your Phone*"
                                name="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            <div className="text-center">
                                {errors.phone && (
                                    <span className="text-red-500">
                                        {errors.phone}
                                    </span>
                                )}
                            </div>

                            <InputField
                                label="Your Email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <div className="text-center">
                                {errors.email && (
                                    <span className="text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            <InputField
                                label="Your Address*"
                                name="address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                            <div className="text-center">
                                {errors.address && (
                                    <span className="text-red-500">
                                        {errors.address}
                                    </span>
                                )}
                            </div>

                            <InputField
                                label="Additional Address row"
                                name="address2"
                                value={data.address2}
                                onChange={(e) =>
                                    setData("address2", e.target.value)
                                }
                            />
                            <div className="text-center">
                                {errors.address2 && (
                                    <span className="text-red-500">
                                        {errors.address2}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary"
                            >
                                {processing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b border-white"></div>
                                        Processing ...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={20} />
                                        Place Order
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div>
                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 roundex-xl p-6 sticky top-24">
                        <div className="flex items-center gap-2 mb-6">
                            <ShoppingBag size={24} className="text-sky-600" />
                            <h3 className="font-bold text-lg text-gray-900">
                                Order Summary
                            </h3>
                        </div>

                        <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                            {items.map((item) => {
                                const price = item.discount
                                    ? item.price -
                                      item.price *
                                          (item.discount.percentage / 100)
                                    : item.price;

                                return (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-lg p-3 border border-sky-200"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium text-gray-900 text-sm flex-1">
                                                {item.product.name}
                                            </span>
                                            <span className="font-bold text-gray-900 ml-2">
                                                $
                                                {(
                                                    price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center textxs text-gray-600">
                                            <span>
                                                ${Number(price).toFixed(2)} x
                                                {item.quantity}
                                            </span>
                                            {item.discount && (
                                                <span className="text-green-600 font-semibold">
                                                    -{item.discount.percentage}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-sky-300 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-700">
                                <span>SubTotal</span>
                                <span className="font-semibold">
                                    ${calculateTotal().toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
