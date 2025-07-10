import InputField from "@/Components/InputField";
import { useForm, usePage } from "@inertiajs/react";

export default function Checkout() {
    const { items, errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        name: "",
        phone: "",
        address: "",
        address2: "",
        email: "",
    });

    return (
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row md:items-start gap-6">
            <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Shipping Information
                </h2>

                <div className="text-sm text-gray-500 italic mb-4">
                    * - required field
                </div>
                <form className="flex flex-col space-y-4 text-sky-800">
                    <InputField
                        label="Your Name*"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <div className="text-center">
                        {errors.name && (
                            <span className="text-red-500">{errors.name}</span>
                        )}
                    </div>

                    <InputField
                        label="Your Phone*"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                    <div className="text-center">
                        {errors.phone && (
                            <span className="text-red-500">{errors.phone}</span>
                        )}
                    </div>

                    <InputField
                        label="Your Email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <div className="text-center">
                        {errors.email && (
                            <span className="text-red-500">{errors.email}</span>
                        )}
                    </div>

                    <InputField
                        label="Your Address*"
                        name="address"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
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
                        onChange={(e) => setData("address2", e.target.value)}
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
                        {processing ? "Processing ..." : "Place Order"}
                    </button>
                </form>
            </div>

            <div className="md:w-1/3 bg-white rounded shadow p-4 h-fit">
                <h3 className="font-semibold text-lg mb-2">Cart Summary</h3>
                {items.map((item) => (
                    <div key={item.id} className="text-sm px-2 py-1">
                        <div>{item.product.name}</div>
                        <div className="text-gray-600">
                            ${item.price} - {item.quantity}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
