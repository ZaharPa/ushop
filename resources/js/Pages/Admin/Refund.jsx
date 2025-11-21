import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Refund() {
    const { refunds } = usePage().props;
    const [activeRefund, setActiveRefund] = useState(null);
    const [message, setMessage] = useState("");

    const changeStatus = (id, status) => {
        router.put(route("admin.refund.update", id), { status });
    };

    const sendNotification = (id) => {
        router.post(route("admin.refund.notify", id), { message });
        setActiveRefund(null);
        setMessage("");
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">List of Refund's request</h2>
            <ul className="">
                {refunds.data.map((refund) => (
                    <li key={refund.id}>
                        <div>
                            <span className="font-bold">{refund.order_id}</span>
                            - {refund.reason} - {refund.details}
                        </div>
                        <div className="text-sm text-gray-600">
                            {refund.amount} - {refund.status}
                        </div>
                        <div className="flex gap-2">
                            {refund.status == "pending" ? (
                                <>
                                    <button
                                        onClick={() =>
                                            changeStatus(refund.id, "approved")
                                        }
                                        className="btn-primary"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            changeStatus(refund.id, "rejected")
                                        }
                                        className="btn-danger"
                                    >
                                        Reject
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() =>
                                        changeStatus(refund.id, "pending")
                                    }
                                    className="btn-secondary"
                                >
                                    Reset
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    setActiveRefund(
                                        activeRefund === refund.id
                                            ? null
                                            : refund.id
                                    )
                                }
                                className="btn-primary ml-2"
                            >
                                Send Email
                            </button>
                        </div>

                        {activeRefund === refund.id && (
                            <div className="dotted-form mt-2">
                                <textarea
                                    className="w-full"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Enter your message here"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        onClick={() =>
                                            sendNotification(refund.id)
                                        }
                                        className="btn-primary"
                                    >
                                        Send
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveRefund(null);
                                            setMessage("");
                                        }}
                                        className="btn-reset"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                <Pagination links={refunds.links} />
            </div>
        </AdminLayout>
    );
}
