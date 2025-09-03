import { useForm, usePage } from "@inertiajs/react";

export default function Refund() {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        order_id: "",
        details: "",
        reason: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("refund.store"));
    };
    return (
        <div>
            <h2 className="h2-center">Form of Refund Products</h2>
            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-4">
                <div className="mb-4">
                    <span>Order ID - </span>
                    <input
                        type="text"
                        value={data.order_id}
                        onChange={(e) => setData("order_id", e.target.value)}
                        className="input-admin"
                    />

                    {errors.order_id && (
                        <div className="text-red-500 my-1">
                            {errors.order_id}
                        </div>
                    )}
                </div>

                <div className="mt-2">
                    <span>Leave your order details</span>
                    <textarea
                        value={data.details}
                        onChange={(e) => setData("details", e.target.value)}
                        className="input-admin h-32 w-full"
                    ></textarea>

                    {errors.details && (
                        <div className="text-red-500 my-1">
                            {errors.details}
                        </div>
                    )}
                </div>

                <div className="mt-2">
                    <span>Leave your reason</span>
                    <textarea
                        value={data.reason}
                        onChange={(e) => setData("reason", e.target.value)}
                        className="input-admin h-32 w-full"
                    ></textarea>

                    {errors.reason && (
                        <div className="text-red-500 my-1">{errors.reason}</div>
                    )}
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-primary"
                    >
                        {processing ? "Sending..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
}
